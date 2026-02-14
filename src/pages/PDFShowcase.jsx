import React from 'react';
import PDFViewer from '../components/PDFViewer';

/**
 * PDF展示页面示例
 * 演示如何使用PDFViewer组件
 */
const PDFShowcase = () => {
  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>PDF文档展示</h1>
      
      {/* 基础用法 */}
      <div style={{ marginBottom: '32px' }}>
        <h2>简历预览</h2>
        <PDFViewer 
          src="/documents/resume.pdf" 
          title="我的简历"
          height="500px"
        />
      </div>

      {/* 自定义样式 */}
      <div style={{ marginBottom: '32px' }}>
        <h2>项目文档</h2>
        <PDFViewer 
          src="/documents/project.pdf" 
          title="项目说明书"
          height="400px"
          style={{ 
            border: '2px solid #1890ff',
            borderRadius: '12px'
          }}
        />
      </div>

      {/* 外部链接PDF */}
      <div style={{ marginBottom: '32px' }}>
        <h2>在线PDF</h2>
        <PDFViewer 
          src="https://example.com/document.pdf" 
          title="在线文档"
          height="600px"
        />
      </div>
    </div>
  );
};

export default PDFShowcase;