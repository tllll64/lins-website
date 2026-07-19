import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { colors, layoutSpacing, width, typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import heroBanner from '../../assets/works/qiaopi/hero-banner.png';

const SectionLabel = ({ children }) => (
    <div style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '18px',
        color: 'rgba(0, 0, 0, 0.4)',
        marginBottom: '20px',
        textTransform: 'uppercase',
        letterSpacing: '3.6px',
        lineHeight: '21.6px'
    }}>
        {children}
    </div>
);

const SectionTitle = ({ children, style = {} }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <h2 style={{
            fontFamily: typography.body.fontFamily,
            fontWeight: 600,
            fontSize: isMobile ? '28px' : '40px',
            lineHeight: isMobile ? '33.6px' : '48px',
            color: colors.black,
            marginBottom: '40px',
            ...style
        }}>
            {children}
        </h2>
    );
};

const BodyText = ({ children, style = {} }) => (
    <p style={{
        fontFamily: typography.body.fontFamily,
        fontWeight: 400,
        fontSize: '20px',
        lineHeight: '28px',
        color: 'rgba(0, 0, 0, 0.7)',
        marginBottom: '20px',
        ...style
    }}>
        {children}
    </p>
);

// Placeholder media block until real assets land
const MediaPlaceholder = ({ label = '内容整理中', aspectRatio = '16 / 9' }) => (
    <div style={{
        width: '100%',
        aspectRatio,
        borderRadius: '20px',
        background: `radial-gradient(rgba(0,0,0,0.08) 1.3px, transparent 1.3px) 0 0 / 16px 16px, ${colors.white.solid}`,
        border: '1px dashed rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <span style={{
            fontFamily: typography.body.fontFamily,
            fontSize: '16px',
            color: 'rgba(0,0,0,0.35)',
        }}>
            {label}
        </span>
    </div>
);

export const Qiaopi = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const containerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingBottom: layoutSpacing.section.xl
    };

    const sectionStyle = {
        marginTop: isMobile ? '60px' : '80px',
        marginBottom: isMobile ? '60px' : '80px'
    };

    return (
        <div style={{ background: colors.background, minHeight: '100vh', paddingBottom: '100px' }}>
            <Navbar theme="light" />

            {/* Hero */}
            <div style={{
                width: '100%',
                minHeight: isMobile ? '70svh' : '50svh',
                background: colors.white.solid,
                display: 'grid',
                gridTemplateRows: '1fr auto',
                position: 'relative',
                overflow: 'hidden',
                padding: isMobile ? '24px 20px 28px' : '24px 48px 32px',
                boxSizing: 'border-box',
            }}>
                <div style={{
                    alignSelf: 'center',
                    maxWidth: isMobile ? '100%' : '1080px',
                    paddingTop: isMobile ? '48px' : '36px',
                    paddingBottom: isMobile ? '40px' : '36px',
                }}>
                    <h1 style={{
                        fontFamily: typography.body.fontFamily,
                        fontWeight: 400,
                        fontSize: isMobile ? '36px' : '52px',
                        lineHeight: 1.18,
                        color: colors.black,
                        margin: 0,
                        letterSpacing: 0,
                    }}>
                        用 AI 重新演绎侨批——一封跨越山海，
                        <br />
                        写给 <strong style={{ fontWeight: 700 }}>阿嬷</strong> 的情书
                    </h1>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(180px, 260px))',
                    gap: isMobile ? '28px' : '64px',
                    fontFamily: typography.body.fontFamily,
                }}>
                    <div>
                        <div style={{ fontSize: '15px', color: colors.grey[16], marginBottom: '14px' }}>
                            Context
                        </div>
                        <div style={{ fontSize: isMobile ? '17px' : '18px', lineHeight: 1.35, color: colors.grey[56] }}>
                            Independent Project<br />July 2026
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '15px', color: colors.grey[16], marginBottom: '14px' }}>
                            My Role
                        </div>
                        <div style={{ fontSize: isMobile ? '17px' : '18px', lineHeight: 1.35, color: colors.grey[56] }}>
                            Product Designer<br />AI Prototyper
                        </div>
                    </div>
                </div>
            </div>

            <img
                src={heroBanner}
                alt="侨批活动视觉"
                style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                }}
            />

            <div style={containerStyle}>

                {/* Background */}
                <div style={sectionStyle}>
                    <SectionLabel>Background</SectionLabel>
                    <SectionTitle>侨批：跨越山海的家书</SectionTitle>
                    <BodyText>
                        侨批是海外华侨寄回家乡的书信与汇款凭证，承载着一代代游子对家人的牵挂。本次活动尝试用 AI 技术让参与者重新书写、聆听这些跨越时空的情感。
                    </BodyText>
                    <MediaPlaceholder label="活动背景图 · 整理中" />
                </div>

                {/* Concept */}
                <div style={sectionStyle}>
                    <SectionLabel>Concept</SectionLabel>
                    <SectionTitle>用 AI 写一封给阿嬷的情书</SectionTitle>
                    <BodyText>
                        参与者输入想对阿嬷说的话，AI 将其转化为一封侨批风格的家书，并生成可分享的视觉呈现。
                    </BodyText>
                    <MediaPlaceholder label="创意概念图 · 整理中" />
                </div>

                {/* Demo */}
                <div style={sectionStyle}>
                    <SectionLabel>Demo</SectionLabel>
                    <SectionTitle>体验演示</SectionTitle>
                    <MediaPlaceholder label="Demo 视频 / 交互演示 · 敬请期待" aspectRatio="16 / 9" />
                </div>

                {/* Gallery */}
                <div style={sectionStyle}>
                    <SectionLabel>Gallery</SectionLabel>
                    <SectionTitle>活动现场</SectionTitle>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                        gap: '20px',
                    }}>
                        <MediaPlaceholder label="现场照片 · 整理中" aspectRatio="4 / 3" />
                        <MediaPlaceholder label="现场照片 · 整理中" aspectRatio="4 / 3" />
                    </div>
                </div>

                {/* Back link */}
                <div style={{ ...sectionStyle, textAlign: 'center' }}>
                    <Link
                        to="/sandbox"
                        style={{
                            display: 'inline-block',
                            padding: '12px 32px',
                            background: colors.grey[95],
                            borderRadius: '100px',
                            fontFamily: typography.body.fontFamily,
                            fontSize: '16px',
                            fontWeight: 500,
                            color: colors.grey[16],
                            textDecoration: 'none',
                        }}
                    >
                        ← Back to Craft
                    </Link>
                </div>

            </div>
        </div>
    );
};
