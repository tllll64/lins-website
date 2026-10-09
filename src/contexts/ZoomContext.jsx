import React, { createContext, useContext, useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  ZoomContext — 全局放大镜状态（Shift+F4 快捷键切换）                  */
/*  放大镜交互由各页面的 ZoomableImage 组件呈现                          */
/* ------------------------------------------------------------------ */
const ZoomContext = createContext({ zoomEnabled: true, toggleZoom: () => {} });

export const ZoomProvider = ({ children }) => {
    const [zoomEnabled, setZoomEnabled] = useState(true);

    const toggleZoom = () => setZoomEnabled(prev => !prev);

    // 全局快捷键：Shift + F4 切换
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.shiftKey && e.key === 'F4') {
                e.preventDefault();
                setZoomEnabled(prev => !prev);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <ZoomContext.Provider value={{ zoomEnabled, toggleZoom }}>
            {children}
        </ZoomContext.Provider>
    );
};

export const useZoom = () => useContext(ZoomContext);
