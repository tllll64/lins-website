import React, { useState, useEffect } from 'react';
import { FIGMA_EMBEDS } from '../constants/figmaEmbeds';

/**
 * 首页预加载器：进入首页时就开始加载三个项目页的 Figma prototype，
 * 让用户点进项目详情页时嵌入已经就绪（连接预热 + 资源缓存）。
 * 用不可见的 iframe 实现真正的"开始加载"，并错开启动时间避免抢占首屏带宽。
 */
const FigmaPreloader = () => {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        const embeds = Object.values(FIGMA_EMBEDS);
        const timers = embeds.map((_, index) =>
            setTimeout(() => setVisibleCount(index + 1), index * 600)
        );
        return () => timers.forEach(clearTimeout);
    }, []);

    const embeds = Object.values(FIGMA_EMBEDS);

    return (
        <div
            aria-hidden="true"
            style={{
                position: 'absolute',
                width: 0,
                height: 0,
                overflow: 'hidden',
                opacity: 0,
                pointerEvents: 'none',
                zIndex: -1,
            }}
        >
            {embeds.slice(0, visibleCount).map((src, index) => (
                <iframe
                    key={src}
                    src={src}
                    title={`Figma preload ${index + 1}`}
                    tabIndex={-1}
                    loading="eager"
                    style={{ width: '1px', height: '1px', border: 0 }}
                />
            ))}
        </div>
    );
};

export default FigmaPreloader;
