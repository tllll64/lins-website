import React, { useRef, useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Section } from '../components/Section';
import { ASSETS } from '../constants/assets';
import { colors, spacing, typography, fontWeight, stackSpacing, gridGap, layoutSpacing, componentSpacing, width, fontSize } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { Twitter, Github, Mail, Phone, MessageCircle } from 'lucide-react';

export const About = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const [navTheme, setNavTheme] = useState('light');

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
        fontWeight: typography.heading1.fontWeight,
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
        fontStyle: 'italic',
        color: colors.grey[9]
    };

    const contactLinksStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: spacing.xl,
        fontSize: typography.body.fontSize,
        color: colors.grey[56]
    };

    const contactLinkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs
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
        transform: 'rotate(3deg)',
        transition: 'transform 0.5s ease',
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

    const footerStyle = {
        background: colors.black.solid,
        color: colors.white.solid,
        paddingTop: layoutSpacing.section.md,
        paddingBottom: layoutSpacing.section.lg
    };

    const footerContainerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: stackSpacing.xl
    };

    const footerTitleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? fontSize[24] : fontSize[32],
        fontWeight: typography.heading1.fontWeight,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: typography.heading1.letterSpacing,
        color: colors.white.solid,
        marginBottom: spacing.xs
    };

    const footerDescStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
        letterSpacing: typography.body.letterSpacing,
        color: colors.grey[66],
        maxWidth: '400px'
    };

    const footerLinksStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: stackSpacing.md,
        fontSize: typography.body.fontSize,
        color: colors.grey[66]
    };

    const footerLinkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.xs,
        color: colors.grey[66],
        transition: 'color 0.2s ease',
        cursor: 'pointer'
    };

    const copyrightStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        marginTop: spacing.xl,
        fontSize: '11px',
        color: colors.grey[66],
        opacity: '0.4',
        textAlign: isMobile ? 'center' : 'left'
    };

    const newsData = [
        { date: "[01/2026]", emoji: "✨", text: "My first CHI! 四月份巴黎梦幻见！感谢学术之途的每一位引路人，给世界贡献一份 contribution （本 N 人的终极梦想）正在一步步实现中 ✨" },
        { date: "[11/2025]", emoji: "🎉", text: "CHI 首轮 拿到了 ARR A ARR ARR ！完全超乎预期的成绩～ 持续奋战中 💪" },
        { date: "[11/2025]", emoji: "🔮", text: "本人的毕设研究课题「元设计驱动的生成式设计研究」开动啦！和小前 UIST、CHI 论文一脉相承的研究方向，持续一年半，期待由我主导的、严谨细腻的、为真实世界作出贡献的研究成果..." },
        { date: "[10/2025]", emoji: "🎵", text: "字节跳动 TikTok AI 业务实习啦，很庆幸自己在过去的一年里积累了很多关于 AI 的知识和思考，能被面试官看到。" },
        { date: "[09/2025]", emoji: "🎓", text: "开始在同济大学 D&I 攻读交互设计硕士学位，新的旅程开始！" },
        { date: "[06/2025]", emoji: "📜", text: "本科毕业啦！感谢所有帮助过我的老师和同学，未来可期！" },
        { date: "[03/2025]", emoji: "🚀", text: "发布了新的个人作品集网站，基于 React 和 design system 重构，性能提升 200%。" },
        { date: "[01/2025]", emoji: "💡", text: "参加 Global Game Jam，我们的队伍获得最佳创意奖！" }
    ];

    const photoRotations = ['rotate(2deg)', '-rotate(2deg)', 'rotate(1deg)', '-rotate(1deg)', 'rotate(2deg)', '-rotate(2deg)'];

    return (
        <div style={pageStyle}>
            <Navbar theme={navTheme} />
            
            <div style={profileContainerStyle}>
                <div style={profileContentStyle}>
                    <div style={profileTextStyle}>
                        <h1 style={profileTitleStyle}>About Me</h1>

                        <div style={profileBodyStyle}>
                            <p>
                                嗨，我是 Chloe Tian。作为一名数字设计师和 AI 工程师，我致力于将以人为本的设计与前沿技术相融合。
                            </p>
                            <p>
                                目前在上海，就读于 <span style={{ fontWeight: fontWeight.semibold, textDecoration: 'underline', textDecorationThickness: '2px', textDecorationColor: colors.black[40] }}>同济大学 D&I</span> 交互设计专业，专注于 🤖 人机交互（HAI）研究 @ <span style={{ fontWeight: fontWeight.semibold, textDecoration: 'underline', textDecorationThickness: '2px', textDecorationColor: colors.black[40] }}>CDI</span>。
                            </p>
                            <p>
                                我热衷于重新定义我们与技术互动的方式，使其更加直观、流畅，并无缝融入我们的日常生活。
                            </p>
                        </div>

                        <div style={contactInfoStyle}>
                            <h3 style={contactTitleStyle}>Seeking 2025 internship opportunities!</h3>
                            <div style={contactLinksStyle}>
                                <div style={contactLinkStyle}>
                                    <Phone size={16} /> <span>(+86) 15968545540</span>
                                </div>
                                <div style={contactLinkStyle}>
                                    <MessageCircle size={16} /> <span>LittleLionTOP</span>
                                </div>
                                <div style={contactLinkStyle}>
                                    <Mail size={16} /> <span>Astronaut7L@163.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={avatarContainerStyle}>
                        <div style={avatarStyle} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(3deg)'}>
                            <img src={ASSETS.profile} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </div>

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

            <Section title="Extra Extra !" subtitle="不工作的时候，你会发现我在 🏃 Citywalk，💗 志愿服务，🧘 旅行，🎵 听 R&B 歌曲，🍮 享用甜点，以及 👧 照顾我的小侄子（德华带娃）。" style={{ paddingTop: layoutSpacing.section.xl, paddingBottom: layoutSpacing.section.xl }}>
                <div style={photoGridStyle}>
                    {ASSETS.photo1 && (
                        <div style={{...photoItemStyle, transform: photoRotations[0]}} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = photoRotations[0]}>
                            <img src={ASSETS.photo1} alt="Life 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    {ASSETS.photo2 && (
                        <div style={{...photoItemStyle, transform: photoRotations[1]}} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = photoRotations[1]}>
                            <img src={ASSETS.photo2} alt="Life 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    {ASSETS.photo3 && (
                        <div style={{...photoItemStyle, transform: photoRotations[2]}} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = photoRotations[2]}>
                            <img src={ASSETS.photo3} alt="Life 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    {ASSETS.photo4 && (
                        <div style={{...photoItemStyle, transform: photoRotations[3]}} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = photoRotations[3]}>
                            <img src={ASSETS.photo4} alt="Life 4" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    {ASSETS.photo5 && (
                        <div style={{...photoItemStyle, transform: photoRotations[4]}} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = photoRotations[4]}>
                            <img src={ASSETS.photo5} alt="Life 5" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                    {ASSETS.photo6 && (
                        <div style={{...photoItemStyle, transform: photoRotations[5]}} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(0deg)'} onMouseLeave={(e) => e.currentTarget.style.transform = photoRotations[5]}>
                            <img src={ASSETS.photo6} alt="Life 6" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    )}
                </div>
            </Section>

            <footer style={footerStyle} ref={footerRef}>
                <div style={footerContainerStyle}>
                    <div>
                        <h2 style={footerTitleStyle}>Contact Me</h2>
                        <p style={footerDescStyle}>
                            Thanks for reaching end of page. If you want to learn more, email me or verify what I'm working on, feel free to get in touch!
                        </p>
                    </div>
                    <div style={footerLinksStyle}>
                        <div style={footerLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}>
                            <Phone size={16} /> <span>(+86) 15968545540</span>
                        </div>
                        <div style={footerLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}>
                            <MessageCircle size={16} /> <span>LittleLionTOP</span>
                        </div>
                        <div style={footerLinkStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}>
                            <Mail size={16} /> <span>Astronaut7L@163.com</span>
                        </div>
                    </div>
                </div>
                <div style={copyrightStyle}>
                    Designed and Coded by Chloe Tian • 2025 · Copyright @ 2025
                </div>
            </footer>
        </div>
    );
};
