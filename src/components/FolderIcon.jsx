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
    const backColor = '#5A9FDE'; // Unified solid color for back parts
    
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
        background: backColor,
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
        background: backColor,
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
            // Each logo peeks ~1/6 above the front body's top edge
            // Adjusted to peek out more for "half-hidden" affordance
            // Further adjusted: Increased scale to match hover size roughly (~1.0)
            const initialPositions = [
                // Left logo - Peeking out left
                { x: -55, y: -55, rotate: -15, scale: 1.0, zIndex: 2 },
                // Right logo - Peeking out right
                { x: 115, y: -55, rotate:  15, scale: 1.0, zIndex: 3 },
                // Center logo (front) - Peeking out top center
                { x: 30,  y: -75, rotate:  0, scale: 1.05, zIndex: 4 }
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
            // Reduced jump amplitude to ~1/3 of the previous extreme version
            const positions = [
                // Left - Top Left scatter (Moderate)
                { x: '-55%', y: '-95%', rotate: -25, scale: 1.15, zIndex: 10 },
                // Right - Top Right scatter (Moderate)
                { x: '110%', y: '-85%', rotate: 25, scale: 1.15, zIndex: 11 },
                // Center - Top Center scatter (Moderate)
                { x: '28%', y: '-110%', rotate: 0, scale: 1.2, zIndex: 12 }
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
    
    // Calculate adjusted font size and stroke width based on scale to maintain consistent visual size (approx 16px)
    // Default target size is 16px. If scale is 0.6, we need 16 / 0.6 = 26.6px
    const targetFontSize = 16;
    const adjustedFontSize = Math.round(targetFontSize / scale);
    // Adjusted to be visually thinner (approx 1.0px visual width instead of 1.2px)
    const adjustedStrokeWidth = 1.0 / scale;

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
        // Negative angle makes the top come towards viewer, creating "wider top" perspective
        transform: isHovered ? 'rotateX(-20deg)' : 'rotateX(0deg)', // Open folder effect, adjusted for correct perspective
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
                        fontSize: '16px',
                        fontWeight: 'normal',
                        textAlign: 'center',
                        width: '100%',
                        opacity: 0.4
                    }}>
                        {title}
                    </div>
                </div>
            </div>

            {/* Custom Annotation (Arrow + Text) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 30,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease-out',
            }}>
                <svg style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'visible',
                    pointerEvents: 'none'
                }}>
                    <defs>
                        <marker id="forkedArrowFolder" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                            <path d="M 0 2 L 10 6 L 0 10" fill="none" stroke="#000" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </marker>
                    </defs>
                    <path 
                        d="M 140 180 Q 200 230 140 280" 
                        fill="none" 
                        stroke="#000" 
                        strokeWidth={adjustedStrokeWidth}
                        strokeLinecap="round"
                        markerEnd="url(#forkedArrowFolder)"
                        style={{
                            transition: 'd 0.3s ease-out'
                        }}
                    />
                </svg>
                
                <div style={{
                    position: 'absolute',
                    top: '290px',
                    left: '50%',
                    transform: 'translateX(-50%)', 
                    width: 'max-content',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: `${adjustedFontSize}px`,
                    color: '#000',
                    fontWeight: 'normal',
                    pointerEvents: 'none'
                }}>
                    My Projects
                </div>
            </div>
        </div>
    );
};

export default FolderIcon;
