import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    motion as Motion,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
} from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Navbar } from '../../components/Navbar';
import { colors, typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import heroBanner from '../../assets/works/qiaopi/hero-banner.png';
import materialsFrame from '../../assets/works/qiaopi/frame-materials.png';
import landingUiFrame from '../../assets/works/qiaopi/frame-landing-ui.png';
import sharePromptFrame from '../../assets/works/qiaopi/frame-share-prompt.png';

const NextProjectProgress = ({ isMobile, shouldReduceMotion }) => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const navigationTimerRef = useRef(null);
    const hasNavigatedRef = useRef(false);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end end'],
    });

    const goToNextProject = () => {
        if (hasNavigatedRef.current) return;
        hasNavigatedRef.current = true;
        navigate('/works/colean');
    };

    useMotionValueEvent(scrollYProgress, 'change', (progress) => {
        if (shouldReduceMotion || hasNavigatedRef.current) return;

        if (progress >= 0.999 && !navigationTimerRef.current) {
            navigationTimerRef.current = window.setTimeout(goToNextProject, 300);
        } else if (progress < 0.95 && navigationTimerRef.current) {
            window.clearTimeout(navigationTimerRef.current);
            navigationTimerRef.current = null;
        }
    });

    useEffect(() => () => {
        if (navigationTimerRef.current) {
            window.clearTimeout(navigationTimerRef.current);
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            aria-label="Next project"
            style={{
                height: isMobile ? '364px' : '416px',
                position: 'relative',
                marginLeft: isMobile ? '-20px' : '-40px',
                marginRight: isMobile ? '-20px' : '-40px',
                paddingLeft: isMobile ? '20px' : '40px',
                paddingRight: isMobile ? '20px' : '40px',
                boxSizing: 'border-box',
                background: colors.grey[98],
            }}
        >
            <button
                type="button"
                onClick={goToNextProject}
                aria-label="View next project: Colean"
                style={{
                    position: 'sticky',
                    top: 'calc(100svh - 96px)',
                    width: '100%',
                    height: '96px',
                    padding: 0,
                    border: 0,
                    background: colors.grey[98],
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr auto' : 'auto auto minmax(120px, 1fr)',
                    gridTemplateRows: isMobile ? 'auto auto' : '1fr',
                    alignItems: 'center',
                    columnGap: isMobile ? '16px' : '28px',
                    rowGap: '12px',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <span style={{
                    fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                    fontSize: isMobile ? '18px' : '24px',
                    fontWeight: 400,
                    color: colors.grey[56],
                    whiteSpace: 'nowrap',
                }}>
                    Next Project
                </span>
                <span style={{
                    fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                    fontSize: isMobile ? '18px' : '24px',
                    fontWeight: 400,
                    color: colors.black.solid,
                    whiteSpace: 'nowrap',
                }}>
                    Colean
                </span>
                <span style={{
                    gridColumn: isMobile ? '1 / -1' : undefined,
                    position: 'relative',
                    width: '100%',
                    height: '1px',
                    overflow: 'hidden',
                    background: colors.grey[92],
                }}>
                    <Motion.span
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: colors.black.solid,
                            scaleX: shouldReduceMotion ? 0 : scrollYProgress,
                            transformOrigin: '0 50%',
                        }}
                    />
                </span>
            </button>
        </section>
    );
};

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

    return (
        <div style={{ background: colors.white.solid, minHeight: '100vh', paddingBottom: 0 }}>
            <Navbar theme="light" />

            <div style={{
                paddingLeft: isMobile ? '20px' : '40px',
                paddingRight: isMobile ? '20px' : '40px',
                boxSizing: 'border-box',
            }}>

            {/* Project introduction */}
            <div style={{
                width: '100%',
                height: isMobile ? '180px' : '200px',
                background: colors.white.solid,
                display: 'flex',
                alignItems: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                padding: isMobile ? '20px 0' : '20px 0 32px',
                boxSizing: 'border-box',
            }}>
                <Motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={revealTransition}
                    style={{
                    maxWidth: isMobile ? '100%' : '1080px',
                    width: '100%',
                }}>
                    <h1 style={{
                        fontFamily: '"Noto Serif SC", "Songti SC", serif',
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

            </div>

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
                    paddingBottom: isMobile ? '32px' : '40px',
                    fontFamily: typography.body.fontFamily,
                }}
            >
                {[
                    { label: 'Context', lines: ['Campaign Design', 'July 2026'] },
                    { label: 'My Role', lines: ['Design Engineer', 'Prompt Designer'] },
                    { label: 'Team', lines: ['Tencent CDG'] },
                ].map((item) => (
                    <Motion.div
                        key={item.label}
                        variants={{
                            hidden: { opacity: 0, y: 16 },
                            visible: { opacity: 1, y: 0, transition: revealTransition },
                        }}
                    >
                        <div style={{
                            fontFamily: 'Lora, "Times New Roman", Georgia, serif',
                            fontSize: isMobile ? '16px' : '18px',
                            fontWeight: 400,
                            color: colors.grey[16],
                            marginBottom: '14px',
                        }}>
                            {item.label}
                        </div>
                        <div style={{
                            fontSize: isMobile ? '17px' : '18px',
                            lineHeight: 1.35,
                            color: colors.grey[56],
                            display: 'flex',
                            flexDirection: 'column',
                            gap: item.lines.length > 1 ? '8px' : 0,
                        }}>
                            {item.lines.map((line) => <span key={line}>{line}</span>)}
                        </div>
                    </Motion.div>
                ))}
            </Motion.div>

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

            <NextProjectProgress
                isMobile={isMobile}
                shouldReduceMotion={shouldReduceMotion}
            />
            </div>
        </div>
    );
};
