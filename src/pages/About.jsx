import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Section } from '../components/Section';
import { ContactSection } from '../components/ContactSection';
import TextType from '../components/TextType';
import { ASSETS } from '../constants/assets';
import { colors, spacing, typography, fontWeight, stackSpacing, gridGap, layoutSpacing, componentSpacing, width, fontSize } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { Twitter, Github, Mail, MessageCircle, Copy, Check, Phone } from 'lucide-react';

import profileImage from '../assets/about/profile.jpg';
import PolaroidGallery from '../components/PolaroidGallery';
import StackedCards from '../components/StackedCards';
import AboutContact from '../components/AboutContact';
import { GitHubCalendar } from 'react-github-calendar';
export const About = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const [navTheme, setNavTheme] = useState('light');
    const [copiedField, setCopiedField] = useState(null);
    const [hoveredField, setHoveredField] = useState(null);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (footerRef.current) {
                const footerRect = footerRef.current.getBoundingClientRect();
                // Switch when footer reaches navbar area
                if (footerRect.top <= 72) {
                    setNavTheme('dark');
                } else {
                    setNavTheme('light');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98]
    };

    const profileContainerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingTop: layoutSpacing.hero.top,
        paddingBottom: layoutSpacing.section.xl
    };

    const profileContentStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: isMobile ? stackSpacing.xl : layoutSpacing.section.md
    };

    const profileTextStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: stackSpacing.xl
    };

    const profileTitleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '36px' : typography.heading1.fontSize,
        fontWeight: 200,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: typography.heading1.letterSpacing,
        color: colors.grey[9]
    };

    const profileBodyStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: stackSpacing.lg,
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
        letterSpacing: typography.body.letterSpacing,
        color: colors.grey[9],
        opacity: '0.9'
    };

    const contactInfoStyle = {
        paddingTop: spacing.md,
        display: 'flex',
        flexDirection: 'column',
        gap: stackSpacing.sm
    };

    const contactTitleStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '18px',
        fontWeight: fontWeight.semibold,
        color: colors.grey[9]
    };

    const contactLinksStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
        fontSize: typography.body.fontSize,
        color: colors.grey[56]
    };

    const contactLinkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        position: 'relative',
        paddingRight: '24px' // Space for icon
    };

    const iconContainerStyle = {
        position: 'absolute',
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const avatarContainerStyle = {
        flex: 1,
        width: '100%',
        display: 'flex',
        justifyContent: isMobile ? 'center' : 'flex-end'
    };

    const avatarStyle = {
        position: 'relative',
        width: isMobile ? '256px' : '384px',
        aspectRatio: '3/4',
        borderRadius: '16px',
        overflow: 'hidden',
        background: colors.grey[95]
    };

    const workWithGridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: gridGap.xl,
        opacity: '0.5',
        transition: 'opacity 0.5s ease'
    };

    const workWithItemStyle = {
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: typography.heading1.fontFamily,
        fontSize: '20px',
        color: colors.grey[9]
    };

    const newsContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: stackSpacing.md,
        width: '100%',
        height: '320px',
        overflowY: 'auto',
        paddingRight: spacing.sm
    };

    const newsItemStyle = {
        display: 'flex',
        gap: spacing.md,
        alignItems: 'flex-start'
    };

    const newsDateStyle = {
        ...typography.body,
        color: colors.grey[56],
        whiteSpace: 'nowrap'
    };

    const newsTextStyle = {
        ...typography.body,
        color: colors.grey[9],
        margin: 0
    };

    const photoGridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: gridGap.md
    };

    const photoItemStyle = {
        aspectRatio: '1/1',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        background: colors.grey[95]
    };

    const newsData = [
        { date: "[02/2026]", emoji: "💻", text: "寒假 vibe coding 重新装修了自己的个人网站，新域名：lynntian.com 🍩" },
        { date: "[02/2026]", emoji: "🎵", text: "结束了在字节的产品设计实习，这是一次对 AI 落地业务的全方位了解，我仍然会保持眼里有光，保持 passion ✨" },
        { date: "[01/2026]", emoji: "🇪🇸", text: "My first CHI! 四月份西班牙巴塞罗那见！感谢学术之途的每一位引路人，给世界贡献一份 contribution（本 N 人的终极梦想）正在一步步实现中 ✨" },
        { date: "[11/2025]", emoji: "🎉", text: "CHI 首轮拿到了 ARR A ARR ARR！完全超乎预期的成绩～ 持续奋战中 💪" },
        { date: "[11/2025]", emoji: "🔮", text: "本人的毕设研究课题「元设计驱动的生成式设计研究」开动啦！和之前 UIST、CHI 论文一脉相承的研究方向，将持续一年半，期待由我主导的、严谨细腻的、为真实世界作出贡献的研究成果..." },
        { date: "[10/2025]", emoji: "🎵", text: "来字节的 TikTok AI 业务实习啦，很庆幸自己在过去的一年里积累了很多关于 AI 的知识和思考，能被面试官看到，希望能持续在 AI 方向有所思所学～" },
        { date: "[09/2025]", emoji: "✈️", text: "来釜山参加 UIST'25 会议啦！UIST is thriving!" },
        { date: "[09/2025]", emoji: "📄", text: "我参与的全文论文 \"Jokeasy: Exploring Human-AI Collaboration in Thematic Joke Generation\" 被 IASDR'25 接收啦！十二月份将在台湾汇报～" },
        { date: "[08/2025]", emoji: "📬", text: "我们的海报论文被 UIST'25 接收啦，九月🇰🇷韩国釜山见！相关全文手稿正在准备中..." },
        { date: "[06/2025]", emoji: "🏆", text: "我们有关\"AI 眼镜+手写笔记\"的课题获得了华为智能眼镜创新挑战赛二等奖～" },
        { date: "[05/2025]", emoji: "🌍", text: "我参与的海报论文 \"When Accessibility Becomes a Trap...\" 被 CSCW'25 接收啦！成果将在挪威展出～" },
        { date: "[04/2025]", emoji: "🚗", text: "超开心跟大家分享，我在极氪设计 × XAI 实验室共创项目里拿了一等奖，为我两年来在车载 HMI 领域的探索话画上了超级圆满的句号。永远相信美好的事情即将发生～" },
        { date: "[03/2025]", emoji: "📕", text: "拿到了小红书（梦司）的体验设计实习 offer～" },
        { date: "[01/2025]", emoji: "🐜", text: "去蚂蚁集团（杭州）汇报校企合作课程的成果！超激动能跟大家分享我们的创新项目～" },
        { date: "[01/2025]", emoji: "🌱", text: "我们的\"生成式可持续智能体\"项目目前正在 D&I 展区展出。如果您对可持续科技感兴趣，欢迎前来与我们交流！" },
        { date: "[11/2024]", emoji: "👩‍💼", text: "我以志愿者负责人的身份协助组织了 IX2D 设计大会——这也是我首次参与统筹大型学术活动的幕后工作。" },
        { date: "[06/2024]", emoji: "🎓", text: "我的本科毕业论文获得了江南大学优秀毕业论文奖，特别感谢我的导师李瑞教授以及同学们的支持！" },
        { date: "[01/2024]", emoji: "🚗", text: "我在小米汽车的五个月实习已顺利结束，特别感谢优秀的团队给予我的指导，让我深入探索车载交互设计领域。" },
        { date: "[11/2023]", emoji: "🏅", text: "很荣幸和大家分享：我获得了国家奖学金 (1%)！" },
        { date: "[10/2023]", emoji: "💽", text: "我成功获得同济大学交互设计专业的推免资格。明年秋天，上海见！" }
    ];

    const photoRotations = ['rotate(2deg)', '-rotate(2deg)', 'rotate(1deg)', '-rotate(1deg)', 'rotate(2deg)', '-rotate(2deg)'];

    return (
        <div style={pageStyle}>
            <Navbar theme={navTheme} />
            
            <div style={profileContainerStyle}>
                <div style={profileContentStyle}>
                    <div style={profileTextStyle}>
                        <TextType
                            text="About Me"
                            as="h1"
                            style={profileTitleStyle}
                            typingSpeed={120}
                            initialDelay={300}
                            loop={false}
                            showCursor={true}
                            cursorCharacter="|"
                            startOnVisible={false}
                        />

                        <div style={profileBodyStyle}>
                            <p>
                                嗨，我是 Chloe Tian。作为一名数字设计师和 AI 工程师，我致力于将以人为本的设计与前沿技术相融合。
                            </p>
                            <p>
                                目前在上海，就读于 <span style={{ fontWeight: fontWeight.semibold }}>同济大学 </span><span style={{ fontWeight: fontWeight.semibold, textDecoration: 'underline', textDecorationThickness: '2px', textDecorationColor: colors.black[40] }}>D&I</span> 交互设计专业，专注于 🤖 人机交互（HAI）研究 @ <span style={{ fontWeight: fontWeight.semibold, textDecoration: 'underline', textDecorationThickness: '2px', textDecorationColor: colors.black[40] }}>CDI</span>。
                            </p>
                            <p>
                                我热衷于重新定义我们与技术互动的方式，使其更加直观、流畅，并无缝融入我们的日常生活。
                            </p>
                        </div>

                        <AboutContact />
                    </div>

                    <div style={avatarContainerStyle}>
                        <div style={avatarStyle}>
                            <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </div>

            <Section style={{ paddingTop: layoutSpacing.section.xs, paddingBottom: layoutSpacing.section.xs }}>
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', // Changed from flex-start to center for horizontal centering
                    gap: isMobile ? stackSpacing.md : '6.66px' // Reduced to ~1/3 of 20px
                }}>
                    <h2 style={{
                        fontFamily: typography.heading1.fontFamily,
                        fontSize: isMobile ? '28px' : `calc(${typography.heading1.fontSize} - 8px)`, // Reduced by 8px
                        fontWeight: 200,
                        lineHeight: typography.heading1.lineHeight,
                        letterSpacing: typography.heading1.letterSpacing,
                        color: colors.grey[9],
                        margin: 0,
                        whiteSpace: 'nowrap'
                    }}>
                        Recently Work with
                    </h2>
                    <div style={{ flex: 1, width: '100%' }}>
                        <StackedCards 
                            assets={ASSETS} 
                            images={[
                                ASSETS.tiktokWork,
                                ASSETS.red,
                                ASSETS.mi,
                                ASSETS.ant,
                                ASSETS.bmw,
                                ASSETS.huawei,
                                ASSETS.nio,
                                ASSETS.zeekr
                            ]}
                        />
                    </div>
                </div>
            </Section>

            <Section title="Latest News" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
                <div style={newsContainerStyle}>
                    {newsData.map((item, index) => (
                        <div key={`${index}-updated`} style={newsItemStyle}>
                            <span style={newsDateStyle}>{item.emoji} {item.date}</span>
                            <p style={newsTextStyle}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Coding Activity" subtitle="GitHub 上的贡献足迹" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
                <div className="github-calendar-fill" style={{
                    background: '#fff',
                    border: `1px solid ${colors.grey[92]}`,
                    borderRadius: '16px',
                    padding: isMobile ? '20px' : '28px',
                    overflowX: 'auto',
                }}>
                    <style>{`
                        .github-calendar-fill .react-activity-calendar {
                            width: 100%;
                        }
                        .github-calendar-fill .react-activity-calendar__scroll-container {
                            width: 100%;
                            overflow: visible;
                        }
                        .github-calendar-fill .react-activity-calendar svg.react-activity-calendar__calendar {
                            width: 100%;
                            height: auto;
                        }
                    `}</style>
                    <GitHubCalendar
                        username="tllll64"
                        colorScheme="light"
                        blockSize={isMobile ? 11 : 14}
                        blockMargin={isMobile ? 3 : 5}
                        fontSize={isMobile ? 12 : 15}
                        theme={{
                            light: ['#f2f2f2', '#c6c6c6', '#8f8f8f', '#4d4d4d', '#171717'],
                        }}
                        style={{
                            color: colors.grey[40],
                            fontFamily: typography.body.fontFamily,
                            width: '100%',
                        }}
                    />
                </div>
            </Section>

            <Section title="Extra Extra" subtitle="不工作的时候，我会 🏃 Citywalk，🧘 旅行，🎵 听音乐&播客，💪 健身，🩵 追星，🍮 享用甜点，以及 👧 照顾我的小侄子（德华带娃）。" subtitleStyle={{ color: colors.grey[9] }} style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
                <PolaroidGallery images={[ASSETS.photo1, ASSETS.photo2, ASSETS.photo3, ASSETS.photo4, ASSETS.photo5, ASSETS.photo6].filter(Boolean)} />
            </Section>

            <ContactSection ref={footerRef} />
        </div>
    );
};
