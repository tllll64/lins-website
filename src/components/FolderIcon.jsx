import React, { useState } from 'react';
import { MoreVertical, Settings } from 'lucide-react';
import { colors } from '../design-system/tokens';

const FolderIcon = ({ 
    title = "Daily memo ✍️", 
    subtitle = "Notes & Journaling", 
    noteCount = 2568,
    onClick,
    style
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuHovered, setIsMenuHovered] = useState(false);
    const [isSettingsHovered, setIsSettingsHovered] = useState(false);

    // Dimensions
    const width = 280; // Base width
    const height = 240; // Base height
    
    // Gradient
    const blueGradient = 'linear-gradient(135deg, #6BB6FF 0%, #5BA3E8 100%)';
    
    const containerStyle = {
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.12))',
        ...style
    };

    // Back Tab (The "flap" at the top left)
    const backTabStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '40%', // Slightly wider to ensure connection
        height: '20%',
        background: blueGradient,
        borderRadius: '16px 16px 0 0',
        zIndex: 1,
    };

    // The main back part of the folder (visible behind the paper if any, usually same color as front but darker or same)
    // Actually, for macOS style, the back is often just the tab + a rect behind.
    // Let's make a full back rect to be safe.
    const backBodyStyle = {
        position: 'absolute',
        top: '12%', // Starts a bit down
        left: 0,
        width: '100%',
        height: '88%',
        background: blueGradient,
        borderRadius: '16px',
        zIndex: 1,
    };

    // Paper
    const paperStyle = {
        position: 'absolute',
        top: '8%', // Peeking out
        left: '5%',
        width: '90%',
        height: '80%',
        background: '#FFFFFF',
        borderRadius: '12px 12px 0 0',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.05)',
        zIndex: 2,
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    };

    // Front Body (The main container)
    const frontBodyStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '82%', // Covers most of the bottom
        background: blueGradient,
        borderRadius: '16px',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 -2px 10px rgba(0,0,0,0.05)', // Inner highlight + shadow from paper
    };

    const textStyle = {
        fontFamily: '"Inter", sans-serif',
        color: '#FFFFFF',
    };

    const iconButtonStyle = (isIconHovered) => ({
        cursor: 'pointer',
        opacity: isIconHovered ? 1 : 0.8,
        transition: 'opacity 0.2s ease, transform 0.2s ease',
        transform: isIconHovered ? 'scale(1.1)' : 'scale(1)',
        color: '#FFFFFF'
    });

    return (
        <div 
            style={containerStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* Back Layer Parts */}
            <div style={backTabStyle} />
            <div style={backBodyStyle} />

            {/* Paper */}
            <div style={paperStyle} />

            {/* Front Body */}
            <div style={frontBodyStyle}>
                {/* Top Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{
                            ...textStyle,
                            fontSize: '20px',
                            fontWeight: 600,
                            marginBottom: '4px',
                            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}>
                            {title}
                        </div>
                        <div style={{
                            ...textStyle,
                            fontSize: '14px',
                            opacity: 0.8,
                            fontWeight: 400
                        }}>
                            {subtitle}
                        </div>
                    </div>
                    
                    {/* Icons */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div 
                            onMouseEnter={() => setIsMenuHovered(true)}
                            onMouseLeave={() => setIsMenuHovered(false)}
                            style={iconButtonStyle(isMenuHovered)}
                        >
                            <MoreVertical size={20} />
                        </div>
                        <div 
                            onMouseEnter={() => setIsSettingsHovered(true)}
                            onMouseLeave={() => setIsSettingsHovered(false)}
                            style={iconButtonStyle(isSettingsHovered)}
                        >
                            <Settings size={20} />
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div style={{
                    ...textStyle,
                    fontSize: '14px',
                    opacity: 0.9,
                    fontWeight: 500
                }}>
                    {noteCount.toLocaleString().replace(/,/g, ' ')} notes
                </div>
            </div>
        </div>
    );
};

export default FolderIcon;
