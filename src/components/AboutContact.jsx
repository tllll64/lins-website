import React from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import { colors, spacing, typography, fontWeight, stackSpacing } from '../design-system/tokens';

const AboutContact = () => {
    const containerStyle = {
        paddingTop: spacing.md,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px' // Reduced to 1/3 of previous (stackSpacing.sm = 12px)
    };

    const titleStyle = {
        fontFamily: typography.body.fontFamily,
        fontSize: '18px',
        fontWeight: fontWeight.semibold,
        color: colors.grey[9],
        marginBottom: spacing.xs
    };

    const listStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px', // Reduced to 1/3 of previous (spacing.sm = 12px)
    };

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.md,
        padding: '4px 0', // Reduced vertical padding to 1/3 of previous (12px), removed horizontal padding/background
        width: 'fit-content',
    };

    const contentStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: spacing.md,
        color: colors.grey[9],
        fontSize: typography.body.fontSize,
        fontFamily: typography.body.fontFamily,
    };

    // Removed complex decorations (background, shadow, etc.)
    const iconStyle = {
        color: colors.grey[9],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const contactItems = [
        {
            id: 'phone',
            icon: <Phone size={18} />,
            text: '(+86) 15968545540',
        },
        {
            id: 'wechat',
            icon: <MessageCircle size={18} />,
            text: 'LittleLionTOP',
        },
        {
            id: 'email',
            icon: <Mail size={18} />,
            text: 'AstronautTL@163.com',
        }
    ];

    return (
        <div style={containerStyle}>
            <h3 style={titleStyle}>寻找 27 届暑期实习中，欢迎联系🙋🏻‍♀️</h3>
            <div style={listStyle}>
                {contactItems.map((item) => (
                    <div
                        key={item.id}
                        style={itemStyle}
                    >
                        <div style={contentStyle}>
                            <div style={iconStyle}>
                                {item.icon}
                            </div>
                            <span style={{ fontWeight: 500 }}>{item.text}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutContact;
