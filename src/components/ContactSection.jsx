import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, Copy, Check, ArrowUpRight } from 'lucide-react';
import { colors, spacing, typography, fontWeight, stackSpacing, layoutSpacing, fontSize } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const ContactSection = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [copiedField, setCopiedField] = useState(null);
    const [hoveredField, setHoveredField] = useState(null);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const footerStyle = {
        position: 'relative',
        background: colors.black.solid,
        color: colors.white.solid,
        paddingTop: `calc(${layoutSpacing.section.md} + 30px)`,
        paddingBottom: `calc(${layoutSpacing.section.lg} + 20px)`,
        overflow: 'hidden'
    };

    const footerContentStyle = {
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        display: isMobile ? 'flex' : 'grid',
        flexDirection: isMobile ? 'column' : undefined,
        gridTemplateColumns: isMobile ? undefined : '1fr auto',
        gridTemplateRows: isMobile ? undefined : 'auto auto',
        gridTemplateAreas: isMobile ? undefined : `
            "title links"
            "copyright resume"
        `,
        rowGap: `calc(${spacing['2xl']} - 26px)`,
        columnGap: stackSpacing.xl,
        gap: isMobile ? stackSpacing.xl : undefined, // Gap for flex mobile layout
    };

    const footerTitleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? fontSize[24] : fontSize[32],
        fontWeight: 200,
        lineHeight: typography.heading1.lineHeight,
        letterSpacing: '-0.02em',
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
        gridArea: 'links',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
        cursor: 'pointer',
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

    const copyrightStyle = {
        gridArea: 'copyright',
        alignSelf: 'end',
        fontSize: '11px',
        color: colors.grey[66],
        opacity: '0.4',
        textAlign: isMobile ? 'center' : 'left'
    };

    const resumeButtonStyle = {
        gridArea: 'resume',
        alignSelf: 'end',
        justifySelf: 'start', // Keep left align relative to the column (same as links)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        background: colors.white.solid,
        color: colors.black.solid,
        padding: `${spacing.xs} ${spacing.md}`,
        borderRadius: '100px',
        textDecoration: 'none',
        fontSize: typography.body.fontSize,
        fontWeight: 500,
        width: 'fit-content',
        transition: 'transform 0.2s ease',
        cursor: 'pointer',
        // Add margin top for mobile spacing if needed, but flex gap handles it
        marginTop: isMobile ? stackSpacing.md : 0
    };

    return (
        <footer style={footerStyle}>
            <div style={footerContentStyle}>
                <div style={{ gridArea: 'title' }}>
                    <h2 style={footerTitleStyle}>Contact Me</h2>
                    <p style={footerDescStyle}>
                        Thanks for reaching end of page. If you want to learn more, email me or verify what I'm working on, feel free to get in touch!
                    </p>
                </div>
                
                <div style={footerLinksStyle}>
                    <div 
                        style={{
                            ...footerLinkStyle,
                            color: hoveredField === 'phone' ? colors.white.solid : colors.grey[66]
                        }} 
                        onMouseEnter={() => setHoveredField('phone')}
                        onMouseLeave={() => setHoveredField(null)}
                        onClick={() => handleCopy('(+86) 15968545540', 'phone')}
                    >
                        <Phone size={16} /> <span>(+86) 15968545540</span>
                        <div style={iconContainerStyle}>
                            {copiedField === 'phone' ? (
                                <Check size={14} color={colors.white.solid} />
                            ) : hoveredField === 'phone' ? (
                                <Copy size={14} style={{ opacity: 0.5 }} />
                            ) : null}
                        </div>
                    </div>
                    <div 
                        style={{
                            ...footerLinkStyle,
                            color: hoveredField === 'wechat' ? colors.white.solid : colors.grey[66]
                        }} 
                        onMouseEnter={() => setHoveredField('wechat')}
                        onMouseLeave={() => setHoveredField(null)}
                        onClick={() => handleCopy('LittleLionTOP', 'wechat')}
                    >
                        <MessageCircle size={16} /> <span>LittleLionTOP</span>
                        <div style={iconContainerStyle}>
                            {copiedField === 'wechat' ? (
                                <Check size={14} color={colors.white.solid} />
                            ) : hoveredField === 'wechat' ? (
                                <Copy size={14} style={{ opacity: 0.5 }} />
                            ) : null}
                        </div>
                    </div>
                    <div 
                        style={{
                            ...footerLinkStyle,
                            color: hoveredField === 'email' ? colors.white.solid : colors.grey[66]
                        }} 
                        onMouseEnter={() => setHoveredField('email')}
                        onMouseLeave={() => setHoveredField(null)}
                        onClick={() => handleCopy('AstronautTL@163.com', 'email')}
                    >
                        <Mail size={16} /> <span>AstronautTL@163.com</span>
                        <div style={iconContainerStyle}>
                            {copiedField === 'email' ? (
                                <Check size={14} color={colors.white.solid} />
                            ) : hoveredField === 'email' ? (
                                <Copy size={14} style={{ opacity: 0.5 }} />
                            ) : null}
                        </div>
                    </div>
                </div>

                <a 
                    href="https://jq6o8oyx72u.feishu.cn/wiki/R2XrwQooKiYVk1kF4facXBtdnkd"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={resumeButtonStyle}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Resume <ArrowUpRight size={16} />
                </a>
                
                <div style={copyrightStyle}>
                    Designed and Coded by Lynn Tian • Copyright @ 2026
                </div>
            </div>
        </footer>
    );
};
