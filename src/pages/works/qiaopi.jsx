import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { colors, layoutSpacing, typography } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';

const FIGMA_EMBED_URL = 'https://www.figma.com/embed?embed_host=share&hide-ui=1&footer=false&viewport-controls=false&hotspot-hints=false&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FKpiPoaz3QdG4yTow1xbP4F%2F%25E7%25A7%258B%25E6%258B%259B%25E4%25BD%259C%25E5%2593%2581%25E9%259B%2586%3Fnode-id%3D1538-42212%26viewport%3D-2847%252C-217%252C0.7%26t%3DW6WPqlC6NPahApgT-1%26scaling%3Dscale-down-width%26content-scaling%3Dfixed%26page-id%3D452%253A21846%26hide-ui%3D1';

const projectFacts = [
    { label: 'Context', value: 'TenPay Global' },
    { label: 'Project', value: 'AI 侨批生成活动' },
    { label: 'My Role', value: 'AI 设计工程' },
    { label: 'Year', value: '2026' },
];

const SectionKicker = ({ children }) => (
    <div style={{
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '2.4px',
        textTransform: 'uppercase',
        color: 'rgba(24, 26, 28, 0.42)',
        marginBottom: '18px'
    }}>
        {children}
    </div>
);

const BodyText = ({ children, style = {} }) => (
    <p style={{
        fontFamily: typography.body.fontFamily,
        fontSize: '18px',
        lineHeight: '30px',
        color: 'rgba(24, 26, 28, 0.68)',
        margin: 0,
        ...style
    }}>
        {children}
    </p>
);

const HeroCover = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div style={{
            position: 'relative',
            minHeight: isMobile ? '460px' : '640px',
            overflow: 'hidden',
            background: 'oklch(0.965 0.006 92)',
            border: '1px solid oklch(0.88 0.006 92)',
        }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(oklch(0.55 0.01 92 / 0.22) 1px, transparent 1px)',
                backgroundSize: isMobile ? '18px 18px' : '24px 24px'
            }} />
            <div style={{
                position: 'absolute',
                inset: isMobile ? '32px 24px' : '64px 76px',
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '0.92fr 1.08fr',
                gap: isMobile ? '18px' : '28px',
                alignItems: 'stretch'
            }}>
                <div style={{
                    position: 'relative',
                    background: 'oklch(0.992 0.003 92)',
                    border: '1px solid oklch(0.88 0.006 92)',
                    boxShadow: '0 18px 60px oklch(0.4 0.02 92 / 0.08)',
                    minHeight: isMobile ? '160px' : '100%',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        left: '16%',
                        top: '14%',
                        width: '58%',
                        height: '64%',
                        background: 'oklch(0.94 0.007 92)',
                        transform: 'rotate(-4deg)',
                        border: '1px solid oklch(0.84 0.006 92)'
                    }} />
                    <div style={{
                        position: 'absolute',
                        right: '10%',
                        bottom: '12%',
                        width: '52%',
                        height: '48%',
                        background: 'oklch(0.985 0.004 92)',
                        transform: 'rotate(3deg)',
                        border: '1px solid oklch(0.84 0.006 92)'
                    }} />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateRows: isMobile ? '1fr' : '1fr 0.74fr',
                    gap: isMobile ? '18px' : '28px'
                }}>
                    <div style={{
                        position: 'relative',
                        background: 'oklch(0.99 0.004 92)',
                        border: '1px solid oklch(0.88 0.006 92)',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            inset: '14%',
                            border: '1px solid oklch(0.82 0.006 92)',
                            background: 'linear-gradient(135deg, oklch(0.955 0.006 92), oklch(0.995 0.003 92))'
                        }} />
                        <div style={{
                            position: 'absolute',
                            left: '28%',
                            top: '30%',
                            width: '22%',
                            height: '34%',
                            background: 'oklch(0.28 0.006 92)',
                            transform: 'skewX(-9deg) rotate(8deg)'
                        }} />
                        <div style={{
                            position: 'absolute',
                            right: '26%',
                            top: '26%',
                            width: '18%',
                            height: '18%',
                            background: 'oklch(0.28 0.006 92)',
                            transform: 'rotate(45deg)'
                        }} />
                    </div>

                    {!isMobile && (
                        <div style={{
                            position: 'relative',
                            background: 'oklch(0.975 0.005 92)',
                            border: '1px solid oklch(0.88 0.006 92)',
                            overflow: 'hidden'
                        }}>
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        left: `${10 + index * 9}%`,
                                        top: `${18 + (index % 3) * 18}%`,
                                        width: '34%',
                                        height: '1px',
                                        background: 'oklch(0.62 0.006 92 / 0.42)'
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div style={{
                position: 'absolute',
                left: isMobile ? '24px' : '76px',
                bottom: isMobile ? '32px' : '64px',
                width: isMobile ? '120px' : '168px',
                height: isMobile ? '12px' : '16px',
                background: 'oklch(0.99 0.004 92)',
                border: '1px solid oklch(0.86 0.006 92)'
            }} />
        </div>
    );
};

export const Qiaopi = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const pagePadding = isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop;

    return (
        <div style={{
            minHeight: '100vh',
            background: 'oklch(0.982 0.004 92)',
            color: colors.grey[9],
            paddingBottom: isMobile ? '72px' : '120px'
        }}>
            <Navbar theme="light" />

            <main>
                <section style={{
                    padding: isMobile ? `104px ${pagePadding} 52px` : `132px ${pagePadding} 76px`,
                    maxWidth: '1320px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.15fr) minmax(280px, 0.85fr)',
                        gap: isMobile ? '44px' : '88px',
                        alignItems: 'end'
                    }}>
                        <div>
                            <div style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '13px',
                                fontWeight: 600,
                                letterSpacing: '2.6px',
                                textTransform: 'uppercase',
                                color: 'rgba(24, 26, 28, 0.45)',
                                marginBottom: '28px'
                            }}>
                                TenPay Global · Campaign Experience
                            </div>
                            <h1 style={{
                                fontFamily: typography.body.fontFamily,
                                fontSize: isMobile ? '52px' : '104px',
                                lineHeight: isMobile ? '56px' : '104px',
                                fontWeight: 600,
                                letterSpacing: 0,
                                color: 'oklch(0.17 0.008 92)',
                                margin: 0,
                                maxWidth: '920px'
                            }}>
                                跨境汇款 AI 侨批生成活动
                            </h1>
                        </div>

                    </div>
                </section>

                <section style={{
                    maxWidth: '1320px',
                    margin: '0 auto',
                    padding: `0 ${pagePadding}`
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
                        borderTop: '1px solid oklch(0.84 0.006 92)',
                        borderBottom: '1px solid oklch(0.84 0.006 92)'
                    }}>
                        {projectFacts.map((item, index) => (
                            <div
                                key={item.label}
                                style={{
                                    minHeight: isMobile ? '100px' : '132px',
                                    padding: isMobile ? '20px 14px' : '28px 26px',
                                    borderRight: index === projectFacts.length - 1 || (isMobile && index % 2 === 1) ? 'none' : '1px solid oklch(0.84 0.006 92)',
                                    borderBottom: isMobile && index < 2 ? '1px solid oklch(0.84 0.006 92)' : 'none'
                                }}
                            >
                                <div style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontSize: '12px',
                                    lineHeight: '16px',
                                    letterSpacing: '2px',
                                    textTransform: 'uppercase',
                                    color: 'rgba(24, 26, 28, 0.4)',
                                    marginBottom: '14px',
                                    fontWeight: 600
                                }}>
                                    {item.label}
                                </div>
                                <div style={{
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: isMobile ? '16px' : '19px',
                                    lineHeight: isMobile ? '24px' : '28px',
                                    color: 'oklch(0.18 0.008 92)',
                                    fontWeight: 500
                                }}>
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{
                    maxWidth: '1320px',
                    margin: '0 auto',
                    padding: isMobile ? `36px ${pagePadding} 0` : `56px ${pagePadding} 0`
                }}>
                    <HeroCover />
                </section>

                <section style={{
                    maxWidth: '1320px',
                    margin: '0 auto',
                    padding: isMobile ? `72px ${pagePadding} 0` : `112px ${pagePadding} 0`,
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '0.72fr 1.28fr',
                    gap: isMobile ? '28px' : '96px'
                }}>
                    <SectionKicker>Project Overview</SectionKicker>
                    <div>
                        <h2 style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: isMobile ? '32px' : '56px',
                            lineHeight: isMobile ? '39px' : '64px',
                            fontWeight: 600,
                            letterSpacing: 0,
                            color: 'oklch(0.17 0.008 92)',
                            margin: '0 0 32px'
                        }}>
                            把一笔跨境汇款，延展成一封能被看见、被保存、被分享的家书。
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
                            gap: isMobile ? '20px' : '36px'
                        }}>
                            <BodyText>
                                侨批既是汇款凭证，也是一种家书。这个项目把跨境汇款场景中的“寄钱回家”重新理解为情感表达，让用户通过 AI 生成一封具有侨批语感的祝福内容。
                            </BodyText>
                        </div>
                    </div>
                </section>

                <section style={{
                    maxWidth: '1320px',
                    margin: '0 auto',
                    padding: isMobile ? `80px ${pagePadding} 0` : `128px ${pagePadding} 0`
                }}>
                    <div style={{
                        width: '100%',
                        height: isMobile ? '5200px' : '7600px',
                        minHeight: isMobile ? '2400px' : '5200px',
                        background: 'oklch(0.99 0.004 92)',
                        border: '1px solid oklch(0.84 0.006 92)',
                        overflow: 'hidden'
                    }}>
                        {FIGMA_EMBED_URL ? (
                            <iframe
                                title="跨境汇款 AI 侨批生成活动 Figma prototype"
                                src={FIGMA_EMBED_URL}
                                allowFullScreen
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 0,
                                    display: 'block'
                                }}
                            />
                        ) : (
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundImage: 'radial-gradient(oklch(0.54 0.01 92 / 0.18) 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                                padding: '32px'
                            }}>
                                <span style={{
                                    fontFamily: typography.body.fontFamily,
                                    fontSize: '18px',
                                    lineHeight: '28px',
                                    color: 'rgba(24, 26, 28, 0.48)',
                                    textAlign: 'center'
                                }}>
                                    Figma link ready to embed here
                                </span>
                            </div>
                        )}
                    </div>
                </section>

                <section style={{
                    maxWidth: '1320px',
                    margin: '0 auto',
                    padding: isMobile ? `64px ${pagePadding} 0` : `88px ${pagePadding} 0`
                }}>
                    <Link
                        to="/#works"
                        style={{
                            fontFamily: typography.body.fontFamily,
                            fontSize: '16px',
                            lineHeight: '24px',
                            color: 'oklch(0.17 0.008 92)',
                            textDecoration: 'none',
                            borderBottom: '1px solid currentColor',
                            paddingBottom: '4px'
                        }}
                    >
                        Back to Design
                    </Link>
                </section>
            </main>
        </div>
    );
};
