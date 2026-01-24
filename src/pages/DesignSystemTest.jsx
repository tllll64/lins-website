import React from 'react';

// Simple test page to verify design system works
export const DesignSystemTest = () => {
  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#ffffff',
      minHeight: '100vh',
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#000000',
      }}>
        Design System Test
      </h1>

      <p style={{
        fontSize: '16px',
        color: '#666666',
        marginBottom: '40px',
      }}>
        If you can see this text, the page is rendering correctly.
      </p>

      <div style={{
        padding: '20px',
        background: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '20px',
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Test Section</h2>
        <p>This is a test paragraph with basic styling.</p>
      </div>

      <button style={{
        padding: '12px 24px',
        background: '#000000',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        cursor: 'pointer',
      }}>
        Test Button
      </button>
    </div>
  );
};

export default DesignSystemTest;
