import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { colors, layoutSpacing, width, typography, stackSpacing, fontSize } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import headerBg from '../../assets/works/zhi-xiao-bao/header-bg.png';
import background1 from '../../assets/works/zhi-xiao-bao/background-1.png';
import background2 from '../../assets/works/zhi-xiao-bao/background-2.png';
import analysis1 from '../../assets/works/zhi-xiao-bao/analysis-1.png';

const SectionLabel = ({ children }) => (
    <div style={{
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 600,
        fontSize: '14px',
        color: 'rgba(0, 0, 0, 0.4)',
        marginBottom: '16px',
        textTransform: 'uppercase'
    }}>
        {children}
    </div>
);

const SectionTitle = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: isMobile ? '24px' : '32px',
            color: colors.black,
            marginBottom: '40px'
        }}>
            {children}
        </h2>
    );
};

const ImageContainer = ({ src, alt, borderRadius = '20px' }) => (
    <div style={{
        width: '100%',
        borderRadius: borderRadius,
        overflow: 'hidden',
        background: '#f5f5f5'
    }}>
        <img 
            src={src} 
            alt={alt} 
            style={{
                width: '100%',
                height: 'auto',
                display: 'block'
            }} 
        />
    </div>
);

const InsightTab = ({ active, onClick, children }) => (
    <button 
        onClick={onClick}
        style={{
            padding: '12px 24px',
            background: active ? '#000' : 'transparent',
            color: active ? '#fff' : 'rgba(0, 0, 0, 0.4)',
            borderRadius: '100px',
            border: 'none',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}
    >
        {children}
    </button>
);

export const ZhiXiaoBao = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [activeInsight, setActiveInsight] = useState(0);

    const containerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingBottom: layoutSpacing.section.xl
    };

    const sectionStyle = {
        marginTop: layoutSpacing.section.xl,
        marginBottom: layoutSpacing.section.xl
    };

    return (
        <div style={{ background: colors.background, minHeight: '100vh', paddingBottom: '100px' }}>
            <Navbar theme="light" />
            
            {/* Header Image */}
            <div style={{ width: '100%', marginTop: '60px' }}>
                <img 
                    src={headerBg} 
                    alt="Header" 
                    style={{ width: '100%', height: 'auto', display: 'block' }} 
                />
            </div>

            <div style={containerStyle}>
                
                {/* Section 1: Background */}
                <div style={sectionStyle}>
                    <SectionLabel>BACKGROUND</SectionLabel>
                    <SectionTitle>拓展生活服务新场景</SectionTitle>
                    <ImageContainer src={background1} alt="拓展生活服务新场景" />
                </div>

                {/* Section 2: Background */}
                <div style={sectionStyle}>
                    <SectionLabel>BACKGROUND</SectionLabel>
                    <SectionTitle>AI+出行+惊喜=新的可能_</SectionTitle>
                    <ImageContainer src={background2} alt="AI+出行+惊喜=新的可能" />
                </div>

                {/* Section 3: Analysis 01 */}
                <div style={sectionStyle}>
                    <SectionLabel>ANALYSIS 01</SectionLabel>
                    <SectionTitle>什么是惊喜？从文献中理解惊喜</SectionTitle>
                    <ImageContainer src={analysis1} alt="什么是惊喜" borderRadius="0" />
                </div>

                {/* Section 4: Analysis Interaction */}
                <div style={sectionStyle}>
                    <SectionLabel>ANALYSIS</SectionLabel>
                    <SectionTitle>怎样提供惊喜？基于场景拆解惊喜</SectionTitle>
                    
                    <div style={{
                        background: colors.white.solid,
                        borderRadius: '24px',
                        padding: isMobile ? '20px' : '40px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ 
                            marginBottom: '32px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '16px'
                        }}>
                            <div style={{ 
                                fontFamily: 'PingFang SC, sans-serif', 
                                color: 'rgba(0,0,0,0.4)' 
                            }}>
                                切换Insights查看对应分析
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <InsightTab active={activeInsight === 0} onClick={() => setActiveInsight(0)}>Insight 01</InsightTab>
                                <InsightTab active={activeInsight === 1} onClick={() => setActiveInsight(1)}>Insight 02</InsightTab>
                                <InsightTab active={activeInsight === 2} onClick={() => setActiveInsight(2)}>Insight 03</InsightTab>
                            </div>
                        </div>

                        {/* Content Area for Insights */}
                        <div style={{
                            background: '#000',
                            borderRadius: '24px',
                            padding: isMobile ? '24px' : '48px',
                            color: '#fff',
                            minHeight: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            {activeInsight === 0 && (
                                <div>
                                    <div style={{ 
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '14px',
                                        marginBottom: '16px',
                                        opacity: 0.6
                                    }}>Insight 01</div>
                                    <h3 style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: isMobile ? '24px' : '32px',
                                        fontWeight: 500,
                                        marginBottom: '24px'
                                    }}>初始预期管理</h3>
                                    <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                                        用户在出行前的预期管理是创造惊喜的关键起点。通过合理设置预期锚点，可以在后续体验中更容易创造超预期的感受。
                                    </p>
                                </div>
                            )}
                            {activeInsight === 1 && (
                                <div>
                                    <div style={{ 
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '14px',
                                        marginBottom: '16px',
                                        opacity: 0.6
                                    }}>Insight 02</div>
                                    <h3 style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: isMobile ? '24px' : '32px',
                                        fontWeight: 500,
                                        marginBottom: '24px'
                                    }}>过程中的峰值体验</h3>
                                    <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                                        在行程中设计特定的"峰值时刻"，利用多模态交互（视觉、听觉、触觉）强化感知，形成深刻的记忆点。
                                    </p>
                                </div>
                            )}
                            {activeInsight === 2 && (
                                <div>
                                    <div style={{ 
                                        fontFamily: 'Montserrat, sans-serif',
                                        fontSize: '14px',
                                        marginBottom: '16px',
                                        opacity: 0.6
                                    }}>Insight 03</div>
                                    <h3 style={{
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: isMobile ? '24px' : '32px',
                                        fontWeight: 500,
                                        marginBottom: '24px'
                                    }}>结尾的余韵设计</h3>
                                    <p style={{ opacity: 0.8, lineHeight: 1.6 }}>
                                        行程结束不代表体验结束。通过生成式内容回顾或个性化纪念，延续惊喜感，促进二次传播与复购。
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
