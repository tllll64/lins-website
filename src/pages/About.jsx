import React from 'react';
import { Navbar } from '../components/Navbar';
import { Section } from '../components/Section';
import { ASSETS } from '../constants/assets';
import { colors, spacing, typography, fontWeight } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { Twitter, Github, Mail, Phone, MessageCircle } from 'lucide-react';

export const About = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98]
    };

    const profileContainerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? spacing[32] : spacing[56],
        paddingRight: isMobile ? spacing[32] : spacing[56],
        paddingTop: isMobile ? spacing[56] : spacing[56],
        paddingBottom: spacing[56]
    };

    const profileContentStyle = {
        display: 'flex',
        flexDirection: isMobile ? 'column-reverse' : 'row',
        alignItems: isMobile ? 'center' : 'flex-start',
        gap: isMobile ? spacing[32] : spacing[56]
    };

    const profileTextStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[32]
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
        gap: spacing[32],
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: typography.body.fontWeight,
        lineHeight: typography.body.lineHeight,
        letterSpacing: typography.body.letterSpacing,
        color: colors.grey[9],
        opacity: '0.9'
    };

    const contactInfoStyle = {
        paddingTop: spacing[16],
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[12]
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
        gap: spacing[32],
        fontSize: typography.body.fontSize,
        color: colors.grey[56]
    };

    const contactLinkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[8]
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
        height: isMobile ? '256px' : '384px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `4px solid ${colors.white.solid}`,
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        transform: 'rotate(3deg)',
        transition: 'transform 0.5s ease'
    };

    const workWithGridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: spacing[32],
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
        gap: spacing[32],
        maxWidth: '768px',
        margin: '0 auto'
    };

    const newsItemStyle = {
        display: 'flex',
        gap: spacing[16],
        alignItems: 'flex-start'
    };

    const newsDateStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: typography.body.fontSize,
        fontWeight: fontWeight.semibold,
        color: colors.grey[9],
        whiteSpace: 'nowrap'
    };

    const newsTextStyle = {
        color: colors.black[40],
        transition: 'color 0.2s ease'
    };

    const photoGridStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: spacing[32]
    };

    const photoItemStyle = {
        aspectRatio: '1/1',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease'
    };

    const footerStyle = {
        background: colors.black.solid,
        color: colors.white.solid,
        paddingTop: spacing[56],
        paddingBottom: spacing[32]
    };

    const footerContainerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? spacing[32] : spacing[56],
        paddingRight: isMobile ? spacing[32] : spacing[56],
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: spacing[32]
    };

    const footerTitleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '24px' : '32px',
        fontWeight: typography.heading1.fontWeight,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: typography.heading1.letterSpacing,
        color: colors.white.solid,
        marginBottom: spacing[16]
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
        gap: spacing[16],
        fontSize: typography.body.fontSize,
        color: colors.grey[66]
    };

    const footerLinkStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing[8],
        color: colors.grey[66],
        transition: 'color 0.2s ease',
        cursor: 'pointer'
    };

    const copyrightStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? spacing[32] : spacing[56],
        paddingRight: isMobile ? spacing[32] : spacing[56],
        marginTop: spacing[32],
        fontSize: '11px',
        color: colors.grey[66],
        opacity: '0.4',
        textAlign: isMobile ? 'center' : 'left'
    };

    const newsData = [
        { date: "[01/2026]", emoji: "✨", text: "My first CHI! 四月份巴黎梦幻见！感谢学术之途的每一位引路人，给世界贡献一份 contribution （本 N 人的终极梦想）正在一步步实现中 ✨" },
        { date: "[11/2025]", emoji: "🎉", text: "CHI 首轮 拿到了 ARR A ARR ARR ！完全超乎预期的成绩～ 持续奋战中 💪" },
        { date: "[11/2025]", emoji: "🔮", text: "本人的毕设研究课题「元设计驱动的生成式设计研究」开动啦！和小前 UIST、CHI 论文一脉相承的研究方向，持续一年半，期待由我主导的、严谨细腻的、为真实世界作出贡献的研究成果..." },
        { date: "[10/2025]", emoji: "🎵", text: "字节跳动 TikTok AI 业务实习啦，很庆幸自己在过去的一年里积累了很多关于 AI 的知识和思考，能被面试官看到。" }
    ];

    const photoRotations = ['rotate(2deg)', '-rotate(2deg)', 'rotate(1deg)', '-rotate(1deg)', 'rotate(2deg)', '-rotate(2deg)'];

    return (
        <div style={pageStyle}>
            <Navbar />

            <div style={profileContainerStyle}>
                <div style={profileContentStyle}>
                    <div style={profileTextStyle}>
                        <h1 style={profileTitleStyle}>ABOUT ME</h1>

                        <div style={profileBodyStyle}>
                            <p>
                                Hey, I'm Chloe Tian. I'm a digital designer and AI engineer, dedicated to merging human-centered design with cutting-edge technology.
                            </p>
                            <p>
                                Based in Shanghai, I'm currently studying Interaction Design @ <span style={{ fontWeight: fontWeight.semibold, textDecoration: 'underline', textDecorationThickness: '2px', textDecorationColor: colors.black[40] }}>D&I</span>, with a focus on 🤖 HAI research @ <span style={{ fontWeight: fontWeight.semibold, textDecoration: 'underline', textDecorationThickness: '2px', textDecorationColor: colors.black[40] }}>CDI</span>.
                            </p>
                            <p>
                                I'm passionate about redefining way we interact with technology, making it more intuitive, seamless, and integrated into our everyday lives.
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

            <Section title="WORK WITH" className="text-center">
                <div style={workWithGridStyle} onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}>
                    <div style={workWithItemStyle}>ByteDance</div>
                    <div style={workWithItemStyle}>Microsoft</div>
                    <div style={workWithItemStyle}>NIO</div>
                    <div style={workWithItemStyle}>Xiaomi</div>
                </div>
            </Section>

            <Section title="LATEST NEWS">
                <div style={newsContainerStyle}>
                    {newsData.map((item, index) => (
                        <div key={index} style={newsItemStyle}>
                            <span style={newsDateStyle}>{item.emoji} {item.date}</span>
                            <p style={newsTextStyle} onMouseEnter={(e) => e.currentTarget.style.color = colors.grey[9]} onMouseLeave={(e) => e.currentTarget.style.color = colors.black[40]}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="EXTRA EXTRA !" subtitle="When I'm not working, you'd find me 🏃 citywalking, 💗 volunteering, 🧘 traveling, 🎵 listening to R&B songs, 🍮 relishing desserts, and 👧 taking care of my nephew (德华带娃).">
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

            <footer style={footerStyle}>
                <div style={footerContainerStyle}>
                    <div>
                        <h2 style={footerTitleStyle}>CONTACT ME</h2>
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
