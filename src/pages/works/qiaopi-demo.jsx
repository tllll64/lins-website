import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { colors, layoutSpacing, typography, width } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';

export const QiaopiDemo = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [message, setMessage] = useState('');
    const [letter, setLetter] = useState('');

    const handleGenerate = () => {
        const content = message.trim() || '最近过得好吗？我一直惦记着你。';
        setLetter(`亲爱的阿嬷：\n\n${content}\n\n愿你安好，等我回家。`);
    };

    return (
        <div style={{ minHeight: '100vh', background: colors.background }}>
            <Navbar theme="light" />
            <main style={{
                maxWidth: width.container.md,
                margin: '0 auto',
                padding: `${isMobile ? '72px' : '120px'} ${isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop} 100px`,
            }}>
                <p style={{
                    margin: '0 0 16px',
                    color: colors.grey[50],
                    fontFamily: typography.body.fontFamily,
                    fontSize: '14px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                }}>
                    AI 侨批 Demo
                </p>
                <h1 style={{
                    margin: '0 0 16px',
                    color: colors.grey[9],
                    fontFamily: typography.body.fontFamily,
                    fontSize: isMobile ? '36px' : '56px',
                    lineHeight: 1.15,
                }}>
                    给阿嬷的情书
                </h1>
                <p style={{
                    maxWidth: '620px',
                    margin: '0 0 40px',
                    color: colors.grey[40],
                    fontFamily: typography.body.fontFamily,
                    fontSize: '18px',
                    lineHeight: 1.6,
                }}>
                    写下你想对阿嬷说的话，生成一封带着思念的侨批。
                </p>

                <textarea
                    value={message}
                    onChange={event => setMessage(event.target.value)}
                    placeholder="输入你想对阿嬷说的话"
                    style={{
                        width: '100%',
                        minHeight: '180px',
                        padding: '18px',
                        border: `1px solid ${colors.grey[88]}`,
                        borderRadius: '12px',
                        background: colors.white.solid,
                        color: colors.grey[9],
                        fontFamily: typography.body.fontFamily,
                        fontSize: '17px',
                        lineHeight: 1.6,
                        resize: 'vertical',
                        boxSizing: 'border-box',
                    }}
                />
                <button
                    type="button"
                    onClick={handleGenerate}
                    style={{
                        marginTop: '16px',
                        padding: '13px 22px',
                        border: 'none',
                        borderRadius: '8px',
                        background: colors.grey[9],
                        color: colors.white.solid,
                        fontFamily: typography.body.fontFamily,
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    生成侨批
                </button>

                {letter && (
                    <div style={{
                        marginTop: '32px',
                        padding: isMobile ? '24px' : '36px',
                        border: `1px solid ${colors.grey[88]}`,
                        borderRadius: '12px',
                        background: '#fffdf8',
                        color: colors.grey[16],
                        fontFamily: typography.body.fontFamily,
                        fontSize: '18px',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                    }}>
                        {letter}
                    </div>
                )}

                <Link
                    to="/works/qiaopi"
                    style={{
                        display: 'inline-block',
                        marginTop: '32px',
                        color: colors.grey[40],
                        fontFamily: typography.body.fontFamily,
                        fontSize: '15px',
                    }}
                >
                    查看项目介绍 →
                </Link>
            </main>
        </div>
    );
};
