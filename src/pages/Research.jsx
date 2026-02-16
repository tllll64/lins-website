import React from 'react';
import { Navbar } from '../components/Navbar';
import CircularGallery from '../components/CircularGallery';
import { colors, layoutSpacing, width, typography, stackSpacing, fontSize, gridGap } from '../design-system/tokens';
import { useMediaQuery } from '../design-system/hooks/useMediaQuery';
import { ASSETS } from '../constants/assets';

export const Research = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    const pageStyle = {
        minHeight: '100vh',
        background: colors.grey[98],
        paddingBottom: layoutSpacing.section.xl
    };

    const containerStyle = {
        maxWidth: width.container.xl,
        margin: '0 auto',
        paddingLeft: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingRight: isMobile ? layoutSpacing.page.mobile : layoutSpacing.page.desktop,
        paddingTop: '0' // Handled by individual sections for better centering
    };

    const titleStyle = {
        fontFamily: typography.heading1.fontFamily,
        fontSize: isMobile ? '36px' : fontSize[48], // Slightly smaller than Hero? Or same. Screenshot shows "PUBLICATIONS" centered.
        fontWeight: typography.heading1.fontWeight,
        color: colors.grey[9],
        textAlign: 'center',
        marginBottom: stackSpacing.xl,
        letterSpacing: '0.05em'
    };

    const demoItems = [
        { type: 'placeholder' },
        { type: 'video', src: 'https://www.youtube.com/embed/5nUYwufk3-U' },
        { type: 'video', src: 'https://www.youtube.com/embed/Cxhs8KX5Kq4' },
        { type: 'video', src: 'https://www.youtube.com/embed/dMuGlI-wrhQ' }
    ];

    const galleryItems = [
        { text: 'Project One', image: 'https://picsum.photos/700/700?random=1', link: '#' },
        { text: 'Project Two', image: 'https://picsum.photos/700/700?random=2', link: '#' },
        { text: 'Project Three', image: 'https://picsum.photos/700/700?random=3', link: '#' },
        { text: 'Project Four', image: 'https://picsum.photos/700/700?random=4', link: '#' },
        { text: 'Project Five', image: 'https://picsum.photos/700/700?random=5', link: '#' },
        { text: 'Project Six', image: 'https://picsum.photos/700/700?random=6', link: '#' },
        { text: 'Project Seven', image: 'https://picsum.photos/700/700?random=7', link: '#' },
        { text: 'Project Eight', image: 'https://picsum.photos/700/700?random=8', link: '#' },
    ];

    return (
        <div style={pageStyle}>
            <Navbar theme="light" />
            
            <div style={containerStyle}>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '80px', // Clear navbar
                    marginBottom: layoutSpacing.section.xl
                }}>
                    <div style={{ width: '100%', height: '720px' }}>
                        <CircularGallery items={galleryItems} bend={3} textColor={colors.grey[9]} borderRadius={0.05} />
                    </div>
                </div>

                <h1 style={titleStyle}>Interactive Demos</h1>
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: gridGap.xl 
                }}>
                    {demoItems.map((item, index) => (
                        <div key={index} style={{
                            width: '100%',
                            aspectRatio: '16/9',
                            background: colors.grey[92],
                            borderRadius: '12px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                             {item.type === 'video' ? (
                                 <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={item.src}
                                    title={`Demo Video ${index + 1}`}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                    style={{ border: 'none' }}
                                 ></iframe>
                             ) : (
                                 <div style={{ width: '100%', height: '100%', background: colors.grey[92] }}></div>
                             )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
