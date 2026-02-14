import React from 'react';

/**
 * PDF查看器组件
 * 使用iframe嵌入PDF文件，支持自定义样式和标题
 */
const PDFViewer = ({ 
  src, 
  title = "PDF Document", 
  showHeader = true,
  width = "100%", 
  height = "600px",
  className = "",
  style = {}
}) => {
  return (
    <div 
      className={`pdf-viewer-container ${className}`}
      style={{
        width: '100%',
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        ...style
      }}
    >
      {/* PDF标题栏 */}
      {showHeader && (
        <div 
          style={{
            padding: '12px 16px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #e8e8e8',
            fontSize: '14px',
            fontWeight: '500',
            color: '#333'
          }}
        >
          {title}
        </div>
      )}
      
      {/* PDF内容区域 */}
      <div style={{ width: '100%', height }}>
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          style={{ 
            border: 'none', 
            display: 'block',
            backgroundColor: '#fff'
          }}
          // 允许全屏和打印功能
          allow="fullscreen"
        />
      </div>
    </div>
  );
};

export default PDFViewer;