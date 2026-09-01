import React, { useEffect, useRef } from 'react';
import { useZoom } from '../contexts/ZoomContext';

/* ------------------------------------------------------------------ */
/*  ZoomableImage — hover 圆形放大镜（圆心跟随指针，放大指针区域）       */
/*  事件只记录坐标；rAF 每帧统一写 DOM（不丢帧、不强制布局）             */
/*  是否启用由全局 ZoomContext 控制（右下角开关 / Shift+F4）            */
/* ------------------------------------------------------------------ */
const ZoomableImage = ({ src, alt, zoom = 1.8, lensSize = 180, showFrame = true, autoHeight = false, style = {} }) => {
    const { zoomEnabled } = useZoom();
    const containerRef = useRef(null);
    const lensRef = useRef(null);
    const lensImgRef = useRef(null);
    const rafRef = useRef(null);
    const lastXRef = useRef(null);
    const lastYRef = useRef(null);

    const writeLens = () => {
        rafRef.current = null;
        const container = containerRef.current;
        const lens = lensRef.current;
        const lensImg = lensImgRef.current;
        const x = lastXRef.current;
        const y = lastYRef.current;
        if (!container || !lens || !lensImg || x == null || y == null) return;

        const rect = container.getBoundingClientRect();
        const px = x - rect.left; // 指针相对容器坐标
        const py = y - rect.top;

        // 放大图尺寸 = 容器尺寸 × zoom（这才是真正的放大）
        lensImg.style.width = `${rect.width * zoom}px`;
        lensImg.style.height = `${rect.height * zoom}px`;
        // 镜头圆心对准指针
        lens.style.transform = `translate(${px - lensSize / 2}px, ${py - lensSize / 2}px)`;
        // 镜头内放大图位移：指针处内容对准镜头中心
        lensImg.style.transform = `translate(${-px * zoom + lensSize / 2}px, ${-py * zoom + lensSize / 2}px)`;
    };

    const onPointerMove = (e) => {
        // 仅鼠标设备且开关开启时启用放大镜（触屏无 hover，自动降级）
        if (!zoomEnabled || e.pointerType !== 'mouse') return;
        lastXRef.current = e.clientX;
        lastYRef.current = e.clientY;
        if (lensRef.current) lensRef.current.style.opacity = '1';
        if (!rafRef.current) {
            rafRef.current = requestAnimationFrame(writeLens);
        }
    };

    const onPointerLeave = () => {
        if (lensRef.current) lensRef.current.style.opacity = '0';
    };

    // 开关关闭时隐藏镜头（避免残留）
    useEffect(() => {
        if (!zoomEnabled && lensRef.current) {
            lensRef.current.style.opacity = '0';
        }
    }, [zoomEnabled]);

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{
                position: 'relative',
                width: '100%',
                aspectRatio: autoHeight ? 'auto' : '1 / 1',
                overflow: 'hidden',
                background: showFrame ? '#F5F5F5' : 'transparent',
                border: showFrame ? '1px solid #E8E8E8' : 'none',
                borderRadius: showFrame ? '8px' : '0',
                ...style,
            }}
        >
            <img
                src={src}
                alt={alt}
                loading="lazy"
                draggable={false}
                style={{
                    width: '100%',
                    height: autoHeight ? 'auto' : '100%',
                    objectFit: 'contain',
                    display: 'block',
                }}
            />

            {/* 圆形放大镜镜头 */}
            <div
                ref={lensRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${lensSize}px`,
                    height: `${lensSize}px`,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    opacity: 0,
                    zIndex: 2,
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.95), 0 8px 24px rgba(0,0,0,0.28)',
                    transition: 'opacity 0.15s ease',
                    willChange: 'transform',
                }}
            >
                <img
                    ref={lensImgRef}
                    src={src}
                    alt=""
                    draggable={false}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        maxWidth: 'none',
                        objectFit: 'contain',
                        display: 'block',
                        willChange: 'transform',
                    }}
                />
            </div>
        </div>
    );
};

export default ZoomableImage;
