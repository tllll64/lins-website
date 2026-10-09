import { AppShell } from './app-shell'

/**
 * 页面入口。
 *
 * 外壳在 `src/app-shell.tsx`——它是 CloudAI 页面模板 `app-shell` 的副本，属于**抄改物料**：
 * 把里面 `SLOT:` 注释下的占位块换成真实内容，删掉 `SlotBox`，改完就是你自己的代码。
 * 不可变量（顶栏高度、侧栏宽度与开合、限宽、滚动挂哪一层）照抄，不要重算。
 *
 * 要整页模板（对话首页、概览页等）或组件选型，读 `.agents/skills/CloudAI-UI/SKILL.md`。
 */
export default function App() {
  return <AppShell />
}
