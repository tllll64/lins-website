import React, { useRef, useState } from 'react';
import { Mail, Phone, MessageCircle, Copy, Check } from 'lucide-react';
import Antigravity from './Antigravity';
import { colors, spacing, typography, fontWeight, stackSpacing, layoutSpacing, fontSize } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';

export const ContactSection = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const footerRef = useRef(null);
    const [isFooterHovered, setIsFooterHovered] = useState(false);
    const [copiedField, setCopiedField] = useState(null);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const footerStyle = {
        position: 'relative',
        background: colors.black.solid,
        color: colors.white.solid,
        paddingTop: layoutSpacing.section.md,
        paddingBottom: layoutSpacing.section.lg,
        overflow: 'hidden'
    };

    const footerContainerStyle = {
        position: 'relative',
        zIndex: 1,
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
        position: 'relative',
        zIndex: 1,
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

    return (
        <footer
            style={footerStyle}
            ref={footerRef}
            onMouseEnter={() => setIsFooterHovered(true)}
            onMouseLeave={() => setIsFooterHovered(false)}
        >
            <div style={{
                position: 'absolute',
                width: '900px',
                height: '900px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0,
                opacity: isFooterHovered ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
            }}>
                <Antigravity
                    count={400}
                    magnetRadius={10}
                    ringRadius={20}
                    waveSpeed={0.8}
                    waveAmplitude={1.0}
                    particleSize={1.5}
                    lerpSpeed={0.35}
                    color="#e8e8e8"
                    opacity={0.3}
                    autoAnimate={false}
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={4}
                    particleShape="sphere"
                    fieldStrength={12}
                />
            </div>
            <div style={footerContainerStyle}>
                <div>
                    <h2 style={footerTitleStyle}>Contact Me</h2>
                    <p style={footerDescStyle}>
                        Thanks for reaching end of page. If you want to learn more, email me or verify what I'm working on, feel free to get in touch!
                    </p>
                </div>
                <div style={footerLinksStyle}>
                    <div 
                        style={footerLinkStyle} 
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} 
                        onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}
                        onClick={() => handleCopy('(+86) 15968545540', 'phone')}
                    >
                        <Phone size={16} /> <span>(+86) 15968545540</span>
                        <div style={iconContainerStyle}>
                            {copiedField === 'phone' ? <Check size={14} color={colors.white.solid} /> : <Copy size={14} style={{ opacity: 0.5 }} />}
                        </div>
                    </div>
                    <div 
                        style={footerLinkStyle} 
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} 
                        onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}
                        onClick={() => handleCopy('LittleLionTOP', 'wechat')}
                    >
                        <MessageCircle size={16} /> <span>LittleLionTOP</span>
                        <div style={iconContainerStyle}>
                            {copiedField === 'wechat' ? <Check size={14} color={colors.white.solid} /> : <Copy size={14} style={{ opacity: 0.5 }} />}
                        </div>
                    </div>
                    <div 
                        style={footerLinkStyle} 
                        onMouseEnter={(e) => e.currentTarget.style.color = colors.white.solid} 
                        onMouseLeave={(e) => e.currentTarget.style.color = colors.grey[66]}
                        onClick={() => handleCopy('AstronautTL@163.com', 'email')}
                    >
                        <Mail size={16} /> <span>AstronautTL@163.com</span>
                        <div style={iconContainerStyle}>
                            {copiedField === 'email' ? <Check size={14} color={colors.white.solid} /> : <Copy size={14} style={{ opacity: 0.5 }} />}
                        </div>
                    </div>
                </div>
            </div>
            <div style={copyrightStyle}>
                Designed and Coded by Chloe Tian • 2025 · Copyright @ 2025
            </div>
        </footer>
    );
};
