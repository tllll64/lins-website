import React, { useState } from 'react';
import { MoreVertical, Settings } from 'lucide-react';
import { colors } from '../design-system/tokens';

const FolderIcon = ({ 
    title = "Daily memo ✍️", 
    subtitle = "Notes & Journaling", 
    bottomText = "2 568 notes",
    scale = 1,
    folderImages = [], // Array of image URLs
    onClick,
    style
}) => {
    const [isHovered, setIsHovered] = useState(false);

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
        transform: isHovered ? `scale(${scale * 1.02})` : `scale(${scale})`,
        transformOrigin: 'top right', // Pivot from top-right to maintain position relative to container
        filter: 'drop-shadow(0px 8px 24px rgba(0,0,0,0.12))',
        perspective: '1000px', // Enable 3D perspective
        transformStyle: 'preserve-3d',
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
    
    // Image item styles for scattered layout
    const getImageStyle = (index) => {
        // Different transforms for up to 3 images
        const transforms = [
            // Left: Overlap center by ~50%
            { 
                initial: { rotate: '-15deg', x: '-20%', y: '-30%', scale: 1 },
                hover: { rotate: '-25deg', x: '-35%', y: '-65%', scale: 1.1 }
            },  
            // Right: Overlap center by ~50%
            { 
                initial: { rotate: '15deg', x: '80%', y: '-25%', scale: 1 },
                hover: { rotate: '25deg', x: '85%', y: '-60%', scale: 1.1 }
            },   
            // Center: Middle
            { 
                initial: { rotate: '-2deg', x: '30%', y: '-40%', scale: 1.05 },
                hover: { rotate: '0deg', x: '27.5%', y: '-77.5%', scale: 1.15 }
            },    
        ];
        
        const t = transforms[index % 3];
        const currentTransform = isHovered ? t.hover : t.initial;
        
        return {
            position: 'absolute',
            width: '140px', // Increased size (1.4x of 100px)
            height: '140px', // Increased size
            objectFit: 'contain',
            top: '10%', // Base position
            left: '10%', // Base position
            transform: `translate(${currentTransform.x}, ${currentTransform.y}) rotate(${currentTransform.rotate}) scale(${currentTransform.scale})`,
            zIndex: isHovered ? 10 + index : 2 + index, // Ensure they are on top when hovered
            // Snappy bounce effect
            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), z-index 0s', 
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
        };
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
        zIndex: 4, // Increased z-index to cover images
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        boxSizing: 'border-box',
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.3), 0 -2px 10px rgba(0,0,0,0.05)', // Inner highlight + shadow from paper
        transformOrigin: 'bottom',
        transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transform: isHovered ? 'rotateX(35deg)' : 'rotateX(0deg)', // Open folder effect, increased angle
    };

    const textContainerStyle = {
        transition: 'opacity 0.2s ease',
        opacity: isHovered ? 0 : 1, // Hide text on hover
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
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

            {/* Folder Contents (Images or Paper) */}
            {folderImages && folderImages.length > 0 ? (
                folderImages.map((imgSrc, index) => (
                    <img 
                        key={index} 
                        src={imgSrc} 
                        alt={`Folder content ${index + 1}`} 
                        style={getImageStyle(index)} 
                    />
                ))
            ) : (
                <div style={paperStyle} />
            )}

            {/* Front Body */}
            <div style={frontBodyStyle}>
                <div style={textContainerStyle}>
                    <div style={{
                        ...textStyle,
                        fontSize: '26px',
                        fontWeight: 600,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>
                        {title}
                    </div>
                    <div style={{
                        ...textStyle,
                        fontSize: '15px',
                        opacity: 0.9,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%'
                    }}>
                        {subtitle}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FolderIcon;
