import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { colors, layoutSpacing, typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';

/* 线上活动页（本地 weremit dev server，仅本地预览有效） */
const PROTO_URL = 'http://127.0.0.1:5173/dearyou_letter/?skipLogin=1';

export const QiaopiDemo = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    // Prototype iframe 自适应高度：监听 weremit 活动页（dev 模式）postMessage 的高度同步
    const [protoHeight, setProtoHeight] = useState(isMobile ? 1040 : 1090);
    useEffect(() => {
        const onMessage = (e) => {
            if (e.data && e.data.source === 'dearyou-letter' && typeof e.data.height === 'number') {
                setProtoHeight(Math.max(420, e.data.height));
            }
        };
        window.addEventListener('message', onMessage);
        return () => window.removeEventListener('message', onMessage);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: '#fff',
            color: '#000',
            paddingBottom: layoutSpacing.section.xl,
        }}>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
                <Navbar theme="light" />
            </div>

            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                paddingTop: '112px',
                paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
                paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
            }}>
                <Link
                    to="/creative"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontFamily: typography.body.fontFamily,
                        fontSize: '15px',
                        fontWeight: 500,
                        color: colors.grey[56],
                        textDecoration: 'none',
                        borderBottom: `1px solid ${colors.grey[92]}`,
                        paddingBottom: '4px',
                        transition: 'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = colors.grey[16]; e.currentTarget.style.color = colors.grey[16]; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = colors.grey[92]; e.currentTarget.style.color = colors.grey[56]; }}
                >
                    ← Back to Creative
                </Link>

                {/* Prototype — 与侨批详情页一致的展示方式 */}
                <div style={{
                    width: '100%',
                    background: '#000',
                    border: `1px solid ${colors.grey[92]}`,
                    borderRadius: '8px',
                    height: protoHeight + 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    transition: 'height 0.2s ease',
                }}>
                    <iframe
                        title="AI 侨批生成 活动页 Prototype"
                        src={PROTO_URL}
                        style={{
                            width: '100%',
                            height: protoHeight,
                            border: 0,
                            borderRadius: '12px',
                            display: 'block',
                            flexShrink: 0,
                            transition: 'height 0.2s ease',
                        }}
                    />
                </div>
            </main>
        </div>
    );
};
