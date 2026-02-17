import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, Settings } from 'lucide-react';
import { colors } from '../design-system/tokens';

const FolderIcon = ({ 
    title = "Daily memo ✍️", 
    subtitle = "Notes & Journaling", 
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

    // The main back part of the folder
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
    
    // Animation variants for scattering images
    const imageVariants = {
        initial: (index) => {
            // Slight fan/stagger for peeking when closed
            const initialPositions = [
                // Left-ish peek
                { x: '10%', y: '5%', rotate: -5, scale: 0.65, zIndex: 2 },
                // Right-ish peek
                { x: '40%', y: '0%', rotate: 5, scale: 0.65, zIndex: 3 },
                // Center peek (highest)
                { x: '25%', y: '-5%', rotate: 0, scale: 0.7, zIndex: 4 }
            ];
            const pos = initialPositions[index % 3];

            return {
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
                scale: pos.scale,
                zIndex: pos.zIndex,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                }
            };
        },
        hover: (index) => {
            // Scatter positions: Left, Right, Center-Top
            const positions = [
                // Left - Top Left scatter
                { x: '-40%', y: '-70%', rotate: -25, scale: 1.1, zIndex: 10 },
                // Right - Top Right scatter
                { x: '90%', y: '-60%', rotate: 25, scale: 1.1, zIndex: 11 },
                // Center - Top Center scatter
                { x: '25%', y: '-90%', rotate: 0, scale: 1.15, zIndex: 12 }
            ];
            
            const pos = positions[index % 3];
            
            return {
                x: pos.x,
                y: pos.y,
                rotate: pos.rotate,
                scale: pos.scale,
                zIndex: pos.zIndex,
                transition: {
                    type: "spring",
                    stiffness: 300, // Bouncy spring
                    damping: 12,    // Low damping for bounce
                    mass: 0.8,
                    delay: index * 0.05 // Stagger
                }
            };
        }
    };

    // Base style for images
    const baseImageStyle = {
        position: 'absolute',
        width: '140px',
        height: '140px',
        objectFit: 'contain',
        top: '10%',
        left: '10%',
        filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',
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
        zIndex: 20, // High z-index to cover images initially
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
        justifyContent: 'flex-end',
    };

    const textStyle = {
        fontFamily: '"Inter", sans-serif',
        color: '#FFFFFF',
    };

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
                    <motion.img 
                        key={index} 
                        src={imgSrc} 
                        alt={`Folder content ${index + 1}`} 
                        style={baseImageStyle}
                        variants={imageVariants}
                        initial="initial"
                        animate={isHovered ? "hover" : "initial"}
                        custom={index}
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
                        fontSize: '24px',
                        fontWeight: 600,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}>
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FolderIcon;
