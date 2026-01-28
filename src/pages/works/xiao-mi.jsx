import React from 'react';
import { Navbar } from '../../components/Navbar';
import { colors, layoutSpacing, width } from '../../design-system/tokens';

export const XiaoMi = () => {
    return (
        <div style={{ background: colors.background, minHeight: '100vh' }}>
            <Navbar theme="dark" />
            <div style={{ 
                maxWidth: width.container.xl, 
                margin: '0 auto', 
                paddingTop: '120px',
                paddingLeft: layoutSpacing.page.desktop,
                paddingRight: layoutSpacing.page.desktop
            }}>
                <h1>Xiao Mi</h1>
                <p>Work in progress...</p>
            </div>
        </div>
    );
};
