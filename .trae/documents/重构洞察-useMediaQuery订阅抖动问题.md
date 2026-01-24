# 1. 问题

`src/design-system/hooks/useMediaQuery.js` 的自定义 Hook 将 `matches` 放入 `useEffect` 的依赖数组，导致每次媒体匹配变化都会触发副作用重新清理并注册监听器，形成不必要的重复订阅与渲染抖动。

## 1.1. **不必要的重复订阅与清理**
- 位置：`src/design-system/hooks/useMediaQuery.js` 第 7-23 行。
- 现状：副作用依赖为 `[matches, query]`，当监听器通过 `setMatches` 更新状态时，`matches` 变化会再次触发 `useEffect`，从而先 `removeEventListener` 再 `addEventListener` 同一个查询的监听器。
- 影响：增加副作用执行次数和订阅抖动；在快速切换视口或频繁触发媒体事件时，会造成多次无效的清理与重建。

```js
// 现有实现（节选）
useEffect(() => {
  const media = window.matchMedia(query);

  // Set initial value
  if (media.matches !== matches) {
    setMatches(media.matches);
  }

  // Create listener
  const listener = () => setMatches(media.matches);

  // Add listener
  media.addEventListener('change', listener);

  // Cleanup
  return () => media.removeEventListener('change', listener);
}, [matches, query]);
```

## 1.2. **初始渲染触发双次订阅**
- 现象：首次渲染时，副作用执行并可能调用 `setMatches(media.matches)`。该状态更新会导致 `matches` 变化，副作用再次执行，从而在挂载初期出现“订阅两次”的冗余行为。
- 影响：增加一次无意义的订阅重建，放大初始化阶段的渲染与副作用成本。

## 1.3. **健壮性与兼容性（可改进项）**
- 现象：直接使用 `window.matchMedia`，在 SSR 环境可能不存在 `window`；部分旧版浏览器仅支持 `addListener/removeListener`，不支持 `addEventListener/removeEventListener`。
- 影响：在非浏览器或兼容性边界下可能报错或订阅失败。可通过守卫与降级处理提升健壮性。

# 2. 收益

核心收益：将订阅生命周期与 `query` 对齐，仅在查询字符串变化时重建监听，使媒体状态变化只触发状态更新而不重建订阅，从而降低副作用噪声并稳定渲染。

## 2.1. **降低副作用执行频率**
- 订阅重建不再随每次媒体变化触发，仅在 `query` 变化时发生。典型场景下副作用执行次数可从随事件次数线性增长，降为每次挂载与查询切换各 **1** 次。

## 2.2. **减少渲染抖动与提升稳定性**
- 避免频繁地“清理→重建→触发渲染”的链式抖动，视口快速变化时组件表现更稳定，UI 交互更连贯。

## 2.3. **更易调试与维护**
- 副作用与订阅边界更清晰，问题定位聚焦于状态更新本身，而非订阅生命周期噪声；在复杂组件树中更易观察与复现。

## 2.4. **增强健壮性（可选）**
- 增加 SSR 守卫与事件 API 降级处理后，可避免在非浏览器环境或旧版浏览器上的异常。

# 3. 方案

总体思路：将 `useEffect` 的依赖缩小为 `query`，使订阅仅在查询字符串变化时重建；同时完善初始状态赋值与事件 API 降级，以提升健壮性。

## 3.1. **收敛依赖与兼容性降级：解决“重复订阅与初始双次订阅”**

- 方案概述：
  - 订阅生命周期仅依赖 `query`，移除对 `matches` 的依赖；
  - 初始渲染直接赋值当前 `media.matches`，避免初始阶段二次订阅；
  - 对旧版浏览器提供 `addListener/removeListener` 降级；对 SSR 环境增加守卫。

- 实施步骤：
  - 将 `useEffect` 依赖数组由 `[matches, query]` 改为 `[query]`；
  - 在副作用中设置初始 `matches`，并绑定一次稳定的监听函数；
  - 在清理阶段移除相同监听函数；
  - 增加 SSR 守卫与 API 兼容处理。

- 修改前代码（关键节选）：
```js
useEffect(() => {
  const media = window.matchMedia(query);
  if (media.matches !== matches) {
    setMatches(media.matches);
  }
  const listener = () => setMatches(media.matches);
  media.addEventListener('change', listener);
  return () => media.removeEventListener('change', listener);
}, [matches, query]);
```

- 修改后代码（建议实现）：
```js
import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // SSR 守卫：在非浏览器环境直接返回初始值
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setMatches(false);
      return; // 无订阅，无清理必要
    }

    const media = window.matchMedia(query);

    // 初始赋值，避免初次渲染的二次订阅触发
    setMatches(media.matches);

    const listener = (e) => {
      // 事件对象 e 在新标准中包含 matches；旧浏览器可读 media.matches
      setMatches(typeof e.matches === 'boolean' ? e.matches : media.matches);
    };

    // 兼容不同事件 API
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else if (typeof media.addListener === 'function') {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }

    // 极端降级：无法订阅时仅设置一次初值
    return undefined;
  }, [query]);

  return matches;
};
```

- 说明：
  - 仅在 `query` 变更时重建订阅；媒体状态变化只触发 `setMatches`，不会导致副作用再次执行；
  - 初始赋值使用一次 `setMatches(media.matches)`，移除冗余的条件判断；
  - 加入 SSR 守卫与 API 降级，提升在不同运行环境中的稳定性。

## 3.2. **可选：使用 useSyncExternalStore 提升订阅语义**

- 概述：
  - React 18 推荐将外部可订阅源通过 `useSyncExternalStore` 表达，获得更稳定的并发语义与一致的快照读取行为。
- 示例（可作为后续演进方向）：
```js
import { useSyncExternalStore } from 'react';

function subscribeFactory(query) {
  return (onStoreChange) => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return () => {};
    }
    const media = window.matchMedia(query);
    const listener = () => onStoreChange();
    if (media.addEventListener) media.addEventListener('change', listener);
    else if (media.addListener) media.addListener(listener);
    return () => {
      if (media.removeEventListener) media.removeEventListener('change', listener);
      else if (media.removeListener) media.removeListener(listener);
    };
  };
}

export const useMediaQuery = (query) => {
  const getSnapshot = () => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia(query).matches;
  };
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribeFactory(query), getSnapshot, getServerSnapshot);
};
```
- 说明：
  - 获得一致的“当前快照”读取语义，避免在并发更新中出现竞态；
  - 更适合未来的并发模式和数据源订阅抽象，但短期非必需。

# 4. 回归范围

本次改动影响使用 `useMediaQuery` 的组件在媒体状态变化时的订阅与渲染行为。需从端到端场景验证订阅稳定性、初始赋值正确性以及兼容性处理。

## 4.1. 主链路
- 场景 1：组件首次挂载（不同 `query`）
  - 前置：在桌面与移动视口分别挂载依赖 `useMediaQuery` 的组件。
  - 步骤：观察初始 `matches` 是否与当前媒体状态一致；检查是否仅发生一次订阅创建。
  - 预期：初始值正确；无重复订阅。
- 场景 2：视口在阈值附近来回变化（快速触发 change）
  - 前置：`query` 固定，如 `(max-width: 768px)`。
  - 步骤：连续调整窗口宽度跨越临界点，多次触发媒体变化。
  - 预期：仅状态更新，无重复清理与重建；组件渲染平滑，无明显抖动。
- 场景 3：切换不同的 `query`
  - 步骤：从 `(max-width: 768px)` 切至 `(prefers-color-scheme: dark)`。
  - 预期：旧订阅被清理，新订阅建立；状态与新查询一致。

## 4.2. 边界情况
- SSR 环境：
  - 触发条件：在服务器端渲染过程中调用 Hook。
  - 预期：返回默认 `false`，无对 `window` 的访问错误；客户端接管后按实际媒体状态更新。
- 旧版浏览器兼容：
  - 触发条件：仅支持 `addListener/removeListener` 的环境。
  - 预期：能够正常订阅与清理，行为与现代浏览器一致。
- 极端情况下的事件风暴：
  - 触发条件：极高频媒体变化（自动化测试或模拟）。
  - 预期：订阅稳定且仅触发状态更新；无订阅重建风暴。
