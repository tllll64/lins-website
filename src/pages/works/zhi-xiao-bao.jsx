import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { colors, layoutSpacing, width } from '../../design-system/tokens';
import { useMediaQuery } from '../../design-system/hooks/useMediaQuery';
import headerBg from '../../assets/works/zhi-xiao-bao/header-bg.png';
import background1 from '../../assets/works/zhi-xiao-bao/background-1.png';
import background2 from '../../assets/works/zhi-xiao-bao/background-2.png';
import analysis1 from '../../assets/works/zhi-xiao-bao/analysis-1.png';
import analysisInsights from '../../assets/works/zhi-xiao-bao/analysis-insights.png';
import goalsSolutions from '../../assets/works/zhi-xiao-bao/goals-solutions.png';
import ideationPlanning from '../../assets/works/zhi-xiao-bao/ideation-planning.png';
import featureCoCreation from '../../assets/works/zhi-xiao-bao/feature-co-creation.png';
import featureExpectation from '../../assets/works/zhi-xiao-bao/feature-expectation.png';
import featureRecommendations from '../../assets/works/zhi-xiao-bao/feature-recommendations.png';
import featureMap from '../../assets/works/zhi-xiao-bao/feature-map.png';
import featureAdjustment from '../../assets/works/zhi-xiao-bao/feature-adjustment.png';
import featureChat from '../../assets/works/zhi-xiao-bao/feature-chat.png';
import featureLockscreen from '../../assets/works/zhi-xiao-bao/feature-lockscreen.png';
import userTesting1 from '../../assets/works/zhi-xiao-bao/user-testing-1.png';
import iteration from '../../assets/works/zhi-xiao-bao/iteration.png';
import takeawayTrust from '../../assets/works/zhi-xiao-bao/takeaway-trust.png';
import takeawayAiForm from '../../assets/works/zhi-xiao-bao/takeaway-ai-form.png';
import takeawayFuture from '../../assets/works/zhi-xiao-bao/takeaway-future.png';
import projectPhotos from '../../assets/works/zhi-xiao-bao/project-photos.png';

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
            fontFamily: 'Inter, sans-serif',
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

const SectionSubtitle = ({ children }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: isMobile ? '20px' : '24px',
            lineHeight: '28.8px',
            color: colors.black,
            marginBottom: '24px'
        }}>
            {children}
        </h3>
    );
};

const BodyText = ({ children, style = {} }) => (
    <p style={{
        fontFamily: 'Inter, sans-serif',
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
            fontWeight: active ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
        }}
    >
        {children}
    </button>
);

const FeatureCard = ({ label, title, children, image }) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <div style={{
            background: colors.white.solid,
            borderRadius: '24px',
            padding: isMobile ? '24px' : '40px',
            marginBottom: '28px'
        }}>
            <SectionLabel>{label}</SectionLabel>
            <SectionSubtitle>{title}</SectionSubtitle>
            {children}
            {image && <ImageContainer src={image} alt={title} borderRadius="20px" />}
        </div>
    );
};

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
        marginTop: isMobile ? '60px' : '80px',
        marginBottom: isMobile ? '60px' : '80px'
    };

    const insights = [
        {
            label: 'Insight 01',
            title: '初始预期管理',
            content: '用户在出行前的预期管理是创造惊喜的关键起点。通过合理设置预期锚点，可以在后续体验中更容易创造超预期的感受。'
        },
        {
            label: 'Insight 02',
            title: '满足基础目标',
            content: '确保基础功能的可靠性和易用性，让用户能够顺利完成核心任务。这是建立信任的基础，也是创造惊喜的前提。'
        },
        {
            label: 'Insight 03',
            title: '提供额外价值',
            content: '在满足基础需求的基础上，通过智能推荐、主动服务等方式，为用户提供超出预期的额外价值，创造惊喜感。'
        }
    ];

    return (
        <div style={{ background: colors.background, minHeight: '100vh', paddingBottom: '100px' }}>
            <Navbar theme="light" />

            {/* Teaser Section */}
            <div style={{
                width: '100%',
                height: '100vh',
                background: colors.white.solid
            }} />

            {/* Header Image */}
            <div style={{ width: '100%', marginTop: '60px' }}>
                <img
                    src={headerBg}
                    alt="支小宝 - AI出行助手"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                />
            </div>

            <div style={containerStyle}>

                {/* Section 1: Background - 拓展生活服务新场景 */}
                <div style={sectionStyle}>
                    <SectionLabel>BACKGROUND</SectionLabel>
                    <SectionTitle>拓展生活服务新场景</SectionTitle>
                    <ImageContainer src={background1} alt="拓展生活服务新场景" />
                </div>

                {/* Section 2: Background - AI+出行+惊喜 */}
                <div style={sectionStyle}>
                    <SectionLabel>BACKGROUND</SectionLabel>
                    <SectionTitle>AI+出行+惊喜=新的可能_</SectionTitle>
                    <ImageContainer src={background2} alt="AI+出行+惊喜=新的可能" />
                </div>

                {/* Section 3: Analysis 01 - 什么是惊喜 */}
                <div style={sectionStyle}>
                    <SectionLabel>ANALYSIS 01</SectionLabel>
                    <SectionTitle>什么是惊喜？从文献中理解惊喜</SectionTitle>
                    <ImageContainer src={analysis1} alt="什么是惊喜" borderRadius="0" />
                </div>

                {/* Section 4: Analysis - 怎样提供惊喜 with Interactive Insights */}
                <div style={sectionStyle}>
                    <SectionLabel>ANALYSIS</SectionLabel>
                    <SectionTitle>怎样提供惊喜？基于场景拆解惊喜</SectionTitle>

                    <div style={{
                        background: colors.white.solid,
                        borderRadius: '24px',
                        padding: isMobile ? '20px' : '40px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        marginBottom: '28px'
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
                                fontSize: '18px',
                                lineHeight: '21.6px',
                                color: 'rgba(0,0,0,0.4)'
                            }}>
                                切换Insights查看对应分析
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {insights.map((_, index) => (
                                    <InsightTab
                                        key={index}
                                        active={activeInsight === index}
                                        onClick={() => setActiveInsight(index)}
                                    >
                                        Insight 0{index + 1}
                                    </InsightTab>
                                ))}
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
                            <div style={{
                                fontFamily: 'Montserrat, sans-serif',
                                fontSize: '14px',
                                marginBottom: '16px',
                                opacity: 0.6
                            }}>
                                {insights[activeInsight].label}
                            </div>
                            <h3 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: isMobile ? '24px' : '32px',
                                fontWeight: 500,
                                marginBottom: '24px',
                                lineHeight: isMobile ? '28.8px' : '38.4px'
                            }}>
                                {insights[activeInsight].title}
                            </h3>
                            <p style={{
                                opacity: 0.8,
                                lineHeight: 1.6,
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '18px'
                            }}>
                                {insights[activeInsight].content}
                            </p>
                        </div>
                    </div>

                    <ImageContainer src={analysisInsights} alt="场景分析" borderRadius="20px" />
                </div>

                {/* Section 5: Goals & Solutions */}
                <div style={sectionStyle}>
                    <SectionLabel>GOALS & SOLUTIONS</SectionLabel>
                    <SectionTitle>提出设计目标与策略</SectionTitle>
                    <ImageContainer src={goalsSolutions} alt="设计目标与策略" borderRadius="20px" />
                </div>

                {/* Section 6: Ideation */}
                <div style={sectionStyle}>
                    <SectionLabel>IDEATION</SectionLabel>
                    <SectionTitle>不同阶段分别用什么样的交互框架承载？</SectionTitle>
                    <ImageContainer src={ideationPlanning} alt="交互框架" borderRadius="20px" />
                </div>

                {/* Section 7: Features - 出行计划共创 */}
                <div style={sectionStyle}>
                    <FeatureCard
                        label="FEATURE 01"
                        title="规划全新板块：共创页面"
                        image={featureCoCreation}
                    >
                        <BodyText>
                            做规划 - 共创页面
                        </BodyText>
                    </FeatureCard>

                    <FeatureCard
                        label="FEATURE 02"
                        title="唠唠出行预期，让小宝更懂我"
                        image={featureExpectation}
                    >
                        <BodyText>
                            做规划 - 了解 - 预期管理面板
                        </BodyText>
                    </FeatureCard>

                    <FeatureCard
                        label="FEATURE 03"
                        title="我最关心的，小宝帮我总结"
                        image={featureRecommendations}
                    >
                        <BodyText>
                            做规划 - 共创 - 推荐详情页
                        </BodyText>
                    </FeatureCard>
                </div>

                {/* Section 8: Features - 走出去阶段 */}
                <div style={sectionStyle}>
                    <FeatureCard
                        label="FEATURE 01"
                        title="全新「小宝伴游地图」"
                        image={featureMap}
                    >
                        <BodyText>
                            走出去 - 感知 - 小宝伴游地图详情页
                        </BodyText>
                    </FeatureCard>

                    <FeatureCard
                        label="FEATURE 02"
                        title="灵活调整，推荐附近惊喜"
                        image={featureAdjustment}
                    >
                        <BodyText>
                            走出去 - 调整 - 小宝伴游地图详情页
                        </BodyText>
                    </FeatureCard>

                    <FeatureCard
                        label="FEATURE 03"
                        title="此时此地，小宝主动聊"
                        image={featureChat}
                    >
                        <BodyText>
                            走出去 - 提供 - 对话页面
                        </BodyText>
                    </FeatureCard>

                    <FeatureCard
                        label="FEATURE 03"
                        title="口袋里的小精灵"
                        image={featureLockscreen}
                    >
                        <BodyText>
                            走出去 - 提供 - 锁屏页卡片
                        </BodyText>
                    </FeatureCard>
                </div>

                {/* Section 9: User Testing */}
                <div style={sectionStyle}>
                    <SectionLabel>USER TESTING</SectionLabel>
                    <SectionTitle>使用绿野仙踪法进行功能测试</SectionTitle>
                    <BodyText>
                        关于迭代内容我们还是结合了专家评估结果和用户测试结果，从中挑选了一个功能进行了更深入的迭代。
                    </BodyText>
                    <BodyText style={{ marginBottom: '40px' }}>
                        所以我们对「预期管理」功能进一步迭代。
                    </BodyText>
                    <ImageContainer src={userTesting1} alt="用户测试" borderRadius="20px" />
                </div>

                {/* Section 10: Reflections Header */}
                <div style={{ ...sectionStyle, textAlign: 'center' }}>
                    <SectionTitle>反思与展望</SectionTitle>
                    <SectionLabel>REFLECTIONS</SectionLabel>
                </div>

                {/* Section 11: Iteration */}
                <div style={sectionStyle}>
                    <SectionLabel>USER TESTING</SectionLabel>
                    <SectionTitle>迭代尝试：联动计划与预期</SectionTitle>
                    <ImageContainer src={iteration} alt="迭代尝试" borderRadius="20px" />
                </div>

                {/* Section 12: Takeaway 01 - Trust */}
                <div style={sectionStyle}>
                    <SectionLabel>TAKEAWAY 01</SectionLabel>
                    <SectionTitle>如何强化用户对AI的"信任感"？</SectionTitle>

                    <div style={{
                        background: '#F3F9FF',
                        borderRadius: '24px',
                        padding: isMobile ? '24px' : '40px',
                        marginBottom: '40px',
                        borderLeft: '4px solid #1687FA'
                    }}>
                        <BodyText style={{
                            fontStyle: 'italic',
                            color: 'rgba(0, 0, 0, 0.8)',
                            fontSize: '18px',
                            marginBottom: 0
                        }}>
                            "AI真的能帮到我吗？我不是很信任AI，感觉小红书和大众点评更靠谱一些……"
                        </BodyText>
                    </div>

                    <SectionSubtitle>三个设计方向探索</SectionSubtitle>

                    <div style={{
                        display: 'grid',
                        gap: '20px',
                        marginBottom: '40px'
                    }}>
                        <div style={{
                            background: colors.white.solid,
                            borderRadius: '20px',
                            padding: isMobile ? '24px' : '32px'
                        }}>
                            <h4 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: '20px',
                                marginBottom: '12px'
                            }}>
                                Ideation 01: AI能力角度：突出独特优势
                            </h4>
                            <BodyText style={{ fontSize: '18px', marginBottom: '8px' }}>
                                快速整合大量信息
                            </BodyText>
                            <ul style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                lineHeight: '24px',
                                color: 'rgba(0, 0, 0, 0.7)',
                                paddingLeft: '20px'
                            }}>
                                <li>高效简化文字和图片信息</li>
                                <li>透明化AI信息整合真实性</li>
                            </ul>
                        </div>

                        <div style={{
                            background: colors.white.solid,
                            borderRadius: '20px',
                            padding: isMobile ? '24px' : '32px'
                        }}>
                            <h4 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: '20px',
                                marginBottom: '12px'
                            }}>
                                Ideation 02: 用户角度：强化管家心智
                            </h4>
                            <BodyText style={{ fontSize: '18px', marginBottom: '8px' }}>
                                懂我伴我
                            </BodyText>
                            <ul style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                lineHeight: '24px',
                                color: 'rgba(0, 0, 0, 0.7)',
                                paddingLeft: '20px'
                            }}>
                                <li>懂我：沟通独特推荐内容</li>
                                <li>伴我：丰富的CUI触点</li>
                            </ul>
                        </div>

                        <div style={{
                            background: colors.white.solid,
                            borderRadius: '20px',
                            padding: isMobile ? '24px' : '32px'
                        }}>
                            <h4 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: '20px',
                                marginBottom: '12px'
                            }}>
                                Ideation 03: 反其道而行：适当添加UGC内容
                            </h4>
                            <BodyText style={{ fontSize: '18px', marginBottom: '8px' }}>
                                活人感
                            </BodyText>
                            <ul style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                lineHeight: '24px',
                                color: 'rgba(0, 0, 0, 0.7)',
                                paddingLeft: '20px'
                            }}>
                                <li>展示真实用户评价</li>
                                <li>添加旅行者心情板，emoji反应</li>
                            </ul>
                        </div>
                    </div>

                    <ImageContainer src={takeawayTrust} alt="信任感设计" borderRadius="20px" />
                </div>

                {/* Section 13: Takeaway 02 - AI Form */}
                <div style={sectionStyle}>
                    <SectionLabel>TAKEAWAY 02</SectionLabel>
                    <SectionTitle>🤖 周边出行场景下的AI形态反思</SectionTitle>

                    <BodyText>
                        用户对AI产品的依赖程度随出行状态变化。在不同场景下，需要考虑AI的呈现形态：
                    </BodyText>

                    <div style={{
                        background: '#DBEAFF',
                        borderRadius: '20px',
                        padding: isMobile ? '24px' : '32px',
                        marginBottom: '32px'
                    }}>
                        <h4 style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                            fontSize: '20px',
                            marginBottom: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            💡 反思沉淀
                        </h4>
                        <BodyText style={{ fontSize: '18px', marginBottom: 0 }}>
                            即便是AI产品设计，我们也需要回归到需求本身。不同场景下用户对AI的需求强度不同，我们需要灵活调整AI的呈现方式，从Copilot（协同伙伴）到Embedding（嵌入式工具），找到最适合的形态。
                        </BodyText>
                    </div>

                    <ImageContainer src={takeawayAiForm} alt="AI形态反思" borderRadius="20px" />
                </div>

                {/* Section 14: Takeaway 03 - Future Trends */}
                <div style={sectionStyle}>
                    <SectionLabel>TAKEAWAY 03</SectionLabel>
                    <SectionTitle>🧐 从项目中窥见 HAII 的未来趋势</SectionTitle>

                    <div style={{
                        display: 'grid',
                        gap: '28px',
                        marginBottom: '40px'
                    }}>
                        <div style={{
                            background: colors.white.solid,
                            borderRadius: '24px',
                            padding: isMobile ? '24px' : '40px'
                        }}>
                            <h4 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: '24px',
                                marginBottom: '16px',
                                color: '#1687FA'
                            }}>
                                AI产品载体
                            </h4>
                            <SectionSubtitle>移动设备并非最佳载体</SectionSubtitle>
                            <BodyText style={{ fontSize: '18px' }}>
                                手机在出行场景中存在电量、安全性、交互便捷性等局限。未来AI可以通过智能设备协同、车载系统、耳机、眼镜等多种载体，为用户提供更自然的交互体验。
                            </BodyText>
                        </div>

                        <div style={{
                            background: colors.white.solid,
                            borderRadius: '24px',
                            padding: isMobile ? '24px' : '40px'
                        }}>
                            <h4 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: '24px',
                                marginBottom: '16px',
                                color: '#1687FA'
                            }}>
                                AI心智培养
                            </h4>
                            <SectionSubtitle>把AI打造成我的什么？</SectionSubtitle>
                            <BodyText style={{ fontSize: '18px' }}>
                                用户对AI的信任问题本质是心智模型问题。需要在智能感与工具感之间找到平衡，在个性化与通用性之间做出权衡，逐步建立用户对AI助手的信任。
                            </BodyText>
                        </div>

                        <div style={{
                            background: colors.white.solid,
                            borderRadius: '24px',
                            padding: isMobile ? '24px' : '40px'
                        }}>
                            <h4 style={{
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 600,
                                fontSize: '24px',
                                marginBottom: '16px',
                                color: '#1687FA'
                            }}>
                                AI记忆管理
                            </h4>
                            <SectionSubtitle>AI辅助长期记忆管理</SectionSubtitle>
                            <BodyText style={{ fontSize: '18px' }}>
                                "预期管理"功能可以成为AI逐步理解用户的关键。通过长期记忆管理，AI能够更好地理解用户偏好，提供真正个性化的服务，而不是每次都从零开始。
                            </BodyText>
                        </div>
                    </div>

                    <ImageContainer src={takeawayFuture} alt="HAII未来趋势" borderRadius="20px" />
                </div>

                {/* Section 15: Takeaway 04 - Project Memory Wall */}
                <div style={sectionStyle}>
                    <SectionLabel>TAKEAWAY 04</SectionLabel>
                    <SectionTitle>🧩 项目回忆墙</SectionTitle>

                    <div style={{
                        background: colors.white.solid,
                        borderRadius: '24px',
                        padding: isMobile ? '24px' : '40px',
                        marginBottom: '32px'
                    }}>
                        <ul style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '18px',
                            lineHeight: '28px',
                            color: 'rgba(0, 0, 0, 0.7)',
                            paddingLeft: '20px',
                            margin: 0
                        }}>
                            <li style={{ marginBottom: '12px' }}>我们小组在教室里秘密脑暴</li>
                            <li style={{ marginBottom: '12px' }}>带着我们的项目去蚂蚁杭州总部汇报啦</li>
                            <li>V1.0.96 新版支小宝和我们的方案有异曲同工之妙</li>
                        </ul>
                    </div>

                    <ImageContainer src={projectPhotos} alt="项目回忆墙" borderRadius="20px" />
                </div>

                {/* Section 16: Contact Footer */}
                <div style={{
                    ...sectionStyle,
                    textAlign: 'center',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    paddingTop: '80px'
                }}>
                    <SectionLabel>CONTACT ME</SectionLabel>

                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h3 style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '24px',
                            fontWeight: 600,
                            marginBottom: '16px',
                            color: colors.black
                        }}>
                            Thanks for reaching the end of the page.
                        </h3>

                        <BodyText style={{
                            textAlign: 'center',
                            fontSize: '18px',
                            marginBottom: '40px'
                        }}>
                            If you want to learn more about me or what I'm working on, feel free to get in touch!
                        </BodyText>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            alignItems: 'center',
                            marginBottom: '60px'
                        }}>
                            <div style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                color: 'rgba(0, 0, 0, 0.7)'
                            }}>
                                📱 (+86)15968545540
                            </div>
                            <div style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                color: 'rgba(0, 0, 0, 0.7)'
                            }}>
                                💬 LittleLionTOP
                            </div>
                            <div style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                color: 'rgba(0, 0, 0, 0.7)'
                            }}>
                                ✉️ AstronautTL@163.com
                            </div>
                        </div>

                        <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.4)',
                            marginTop: '40px'
                        }}>
                            Designed and Coded by Chloe Tian • 2025
                        </div>

                        <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.4)',
                            marginTop: '8px'
                        }}>
                            Copyright © 2025
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
