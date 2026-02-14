import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowLeft } from '@arco-design/web-react/icon';
import { Button } from '@arco-design/web-react';
import PDFViewer from '../components/PDFViewer';

/**
 * Colean项目详情页面
 * 展示AR家务游戏的详细信息和技术文档
 */
const ColeanDetail = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#fafafa',
      padding: '24px'
    }}>
      {/* 返回按钮 */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 24px',
        padding: '0 16px'
      }}>
        <Button 
          icon={<IconArrowLeft />}
          onClick={handleBack}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            border: 'none',
            background: 'transparent',
            color: '#666'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#1890ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666';
          }}
        >
          返回首页
        </Button>
      </div>

      {/* 主要内容 */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {/* 项目标题区域 */}
        <div style={{
          padding: '48px 48px 32px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '16px',
            fontFamily: 'Lora, "Times New Roman", Georgia, serif'
          }}>
            Colean: 未来家务 AR 游戏
          </h1>
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            opacity: '0.9',
            maxWidth: '800px'
          }}>
            一个创新的增强现实家务管理游戏，通过AR技术让日常家务变得有趣和互动。
            用户可以在真实环境中与虚拟家务任务进行交互，提升家务管理的参与度和效率。
          </p>
        </div>

        {/* 项目信息区域 */}
        <div style={{ padding: '48px' }}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#333'
            }}>
              项目概述
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>技术栈</h3>
                <ul style={{ color: '#666', lineHeight: '1.8' }}>
                  <li>ARCore / ARKit</li>
                  <li>Unity 3D</li>
                  <li>计算机视觉</li>
                  <li>手势识别</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>核心功能</h3>
                <ul style={{ color: '#666', lineHeight: '1.8' }}>
                  <li>AR家务任务识别</li>
                  <li>游戏化任务管理</li>
                  <li>实时反馈系统</li>
                  <li>成就奖励机制</li>
                </ul>
              </div>
            </div>
          </div>

          {/* PDF文档展示区域 */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#333'
            }}>
              技术文档
            </h2>
            <p style={{
              color: '#666',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              以下文档详细介绍了Colean项目的设计理念、技术实现和用户体验研究：
            </p>
            
            <PDFViewer 
              src="/documents/AR家务.pdf" 
              title="Colean: AR家务游戏 - 技术文档"
              height="800px"
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColeanDetail;