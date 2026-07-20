import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, useReducedMotion } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Navbar } from '../../components/Navbar';
import { colors, layoutSpacing, width, typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import heroBanner from '../../assets/works/qiaopi/hero-banner.png';
import materialsFrame from '../../assets/works/qiaopi/frame-materials.png';
import landingUiFrame from '../../assets/works/qiaopi/frame-landing-ui.png';
import sharePromptFrame from '../../assets/works/qiaopi/frame-share-prompt.png';

export const Qiaopi = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) return undefined;

        const lenis = new Lenis({
            autoRaf: true,
            duration: 1.05,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            smoothWheel: true,
            wheelMultiplier: 0.9,
        });

        return () => lenis.destroy();
    }, [shouldReduceMotion]);

    const ease = [0.28, 0.88, 0, 1];
    const revealTransition = shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.72, ease };
    const revealInitial = shouldReduceMotion ? false : { opacity: 0, y: 24 };
    const mediaViewport = { once: true, amount: 0.08, margin: '0px 0px -6% 0px' };

    const containerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingBottom: layoutSpacing.section.xl
    };

    const sectionStyle = {
        marginTop: isMobile ? '60px' : '80px',
        marginBottom: isMobile ? '60px' : '80px'
    };

    return (
        <div style={{ background: colors.white.solid, minHeight: '100vh', paddingBottom: '100px' }}>
            <Navbar theme="light" />

            <div style={{
                paddingLeft: isMobile ? '20px' : '40px',
                paddingRight: isMobile ? '20px' : '40px',
                boxSizing: 'border-box',
            }}>

            {/* Project introduction */}
            <div style={{
                width: '100%',
                minHeight: isMobile ? '70svh' : '50svh',
                background: colors.white.solid,
                display: 'grid',
                gridTemplateRows: '1fr auto',
                position: 'relative',
                overflow: 'hidden',
                padding: isMobile ? '24px 0 28px' : '24px 0 32px',
                boxSizing: 'border-box',
            }}>
                <Motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={revealTransition}
                    style={{
                    alignSelf: 'center',
                    maxWidth: isMobile ? '100%' : '1080px',
                    paddingTop: isMobile ? '48px' : '36px',
                    paddingBottom: isMobile ? '40px' : '36px',
                }}>
                    <h1 style={{
                        fontFamily: 'PingFang SC, sans-serif',
                        fontWeight: 400,
                        fontSize: isMobile ? '36px' : '52px',
                        lineHeight: 1.18,
                        color: colors.black,
                        margin: 0,
                        letterSpacing: 0,
                    }}>
                        AI代写侨批
                    </h1>
                </Motion.div>

                <Motion.div
                    initial={shouldReduceMotion ? false : 'hidden'}
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: shouldReduceMotion
                                ? { staggerChildren: 0 }
                                : { delayChildren: 0.16, staggerChildren: 0.08 },
                        },
                    }}
                    style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(180px, 260px))',
                    gap: isMobile ? '28px' : '64px',
                    fontFamily: typography.body.fontFamily,
                }}>
                    <Motion.div
                        variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: { opacity: 1, y: 0, transition: revealTransition },
                        }}
                    >
                        <div style={{ fontSize: '15px', color: colors.grey[16], marginBottom: '14px' }}>
                            Context
                        </div>
                        <div style={{ fontSize: isMobile ? '17px' : '18px', lineHeight: 1.35, color: colors.grey[56] }}>
                            Campaign Design<br />July 2026
                        </div>
                    </Motion.div>
                    <Motion.div
                        variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: { opacity: 1, y: 0, transition: revealTransition },
                        }}
                    >
                        <div style={{ fontSize: '15px', color: colors.grey[16], marginBottom: '14px' }}>
                            My Role
                        </div>
                        <div style={{ fontSize: isMobile ? '17px' : '18px', lineHeight: 1.35, color: colors.grey[56] }}>
                            Design Engineer<br />Prompt Designer
                        </div>
                    </Motion.div>
                    <Motion.div
                        variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: { opacity: 1, y: 0, transition: revealTransition },
                        }}
                    >
                        <div style={{ fontSize: '15px', color: colors.grey[16], marginBottom: '14px' }}>
                            Team
                        </div>
                        <div style={{ fontSize: isMobile ? '17px' : '18px', lineHeight: 1.35, color: colors.grey[56] }}>
                            Tencent CDG
                        </div>
                    </Motion.div>
                </Motion.div>
            </div>

            <Motion.img
                src={heroBanner}
                alt="侨批活动视觉"
                initial={revealInitial}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={mediaViewport}
                transition={revealTransition}
                decoding="async"
                style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    marginBottom: '40px',
                }}
            />

            {[materialsFrame, landingUiFrame, sharePromptFrame].map((src, index) => (
                <Motion.img
                    key={src}
                    src={src}
                    alt={[
                        '侨批现场二维码立牌与冰箱贴设计',
                        '侨批落地页界面设计',
                        '侨批分享链路与提示词设计',
                    ][index]}
                    initial={revealInitial}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={mediaViewport}
                    transition={revealTransition}
                    loading="lazy"
                    decoding="async"
                    style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                        marginBottom: index < 2 ? '40px' : 0,
                    }}
                />
            ))}

            <div style={containerStyle}>
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
        </div>
    );
};
