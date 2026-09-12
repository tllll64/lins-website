import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { typography } from '../design-system/tokens';

/* ------------------------------------------------------------------ */
/*  ZoomContext — 全局放大镜开关（状态 + Shift+F4 快捷键 + 右下角开关） */
/*  仅作品详情页（/works/*）展示右下角开关                             */
/* ------------------------------------------------------------------ */
const ZoomContext = createContext({ zoomEnabled: true, toggleZoom: () => {} });

export const ZoomProvider = ({ children }) => {
    const [zoomEnabled, setZoomEnabled] = useState(true);
    const location = useLocation();
    const isWorksPage = location.pathname.startsWith('/works/');

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

            {/* 右下角：放大镜开关（Shift+F4 也可切换）—— 仅作品详情页显示 */}
            {isWorksPage && (
            <button
                onClick={toggleZoom}
                aria-label={zoomEnabled ? '关闭放大镜' : '开启放大镜'}
                style={{
                    position: 'fixed',
                    right: '28px',
                    bottom: '28px',
                    zIndex: 60,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    border: `1px solid ${zoomEnabled ? '#000' : '#E8E8E8'}`,
                    borderRadius: '100px',
                    background: zoomEnabled ? '#000' : '#FFFFFF',
                    cursor: 'pointer',
                    fontFamily: typography.body.fontFamily,
                    fontSize: '13px',
                    fontWeight: 500,
                    color: zoomEnabled ? '#FFFFFF' : '#6B6B6B',
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                }}
            >
                <span>放大镜</span>
                {/* 开关状态点 */}
                <span style={{
                    width: '20px',
                    height: '12px',
                    borderRadius: '6px',
                    background: zoomEnabled ? 'rgba(255,255,255,0.3)' : '#F5F5F5',
                    position: 'relative',
                    transition: 'background 0.2s ease',
                }}>
                    <span style={{
                        position: 'absolute',
                        top: '2px',
                        left: zoomEnabled ? '10px' : '2px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: zoomEnabled ? '#FFFFFF' : '#6B6B6B',
                        transition: 'left 0.2s ease',
                    }} />
                </span>
            </button>
            )}
        </ZoomContext.Provider>
    );
};

export const useZoom = () => useContext(ZoomContext);
