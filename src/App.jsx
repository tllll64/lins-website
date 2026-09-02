import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ZoomProvider } from './contexts/ZoomContext';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Research = lazy(() => import('./pages/Research').then(module => ({ default: module.Research })));
const Echo = lazy(() => import('./pages/Echo').then(module => ({ default: module.Echo })));
const ZhiXiaoBao = lazy(() => import('./pages/works/zhi-xiao-bao').then(module => ({ default: module.ZhiXiaoBao })));
const XiaoMi = lazy(() => import('./pages/works/xiao-mi').then(module => ({ default: module.XiaoMi })));
const ColeanDetail = lazy(() => import('./pages/ColeanDetail').then(module => ({ default: module.ColeanDetail })));
const Qiaopi = lazy(() => import('./pages/works/qiaopi').then(module => ({ default: module.Qiaopi })));
const QiaopiDemo = lazy(() => import('./pages/works/qiaopi-demo').then(module => ({ default: module.QiaopiDemo })));
const XhsFries = lazy(() => import('./pages/works/xhs-fries').then(module => ({ default: module.XhsFries })));
const Tako = lazy(() => import('./pages/works/tako').then(module => ({ default: module.Tako })));
const Sharelink = lazy(() => import('./pages/works/sharelink').then(module => ({ default: module.Sharelink })));
const FigmaDemo = lazy(() => import('./pages/FigmaDemo').then(module => ({ default: module.FigmaDemo })));

// 路由切换时回到页面顶部；带 hash 时精确定位到锚点。
// 轮询等元素出现后瞬时定位一次（不经过中间内容、不二次跳变）；
// 字体/资源加载完成后，若用户未手动滚动，再静默校正一次。
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    let cancelled = false;
    let userScrolled = false;
    const jump = () => {
      const el = document.getElementById(id);
      if (!el || cancelled) return false;
      // 单次平滑滚动到位（连续动画，不经过中间停顿）
      if (lenis) lenis.scrollTo(el, { offset: 0, duration: 0.8 });
      else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    };
    const markUserScroll = () => { userScrolled = true; };
    window.addEventListener('wheel', markUserScroll, { passive: true });
    window.addEventListener('touchmove', markUserScroll, { passive: true });
    const poll = setInterval(() => { if (jump()) clearInterval(poll); }, 60);
    const fail = setTimeout(() => { clearInterval(poll); jump(); }, 2500);
    const onLoad = () => { if (!userScrolled) jump(); };
    window.addEventListener('load', onLoad);
    return () => {
      cancelled = true;
      clearInterval(poll);
      clearTimeout(fail);
      window.removeEventListener('wheel', markUserScroll);
      window.removeEventListener('touchmove', markUserScroll);
      window.removeEventListener('load', onLoad);
    };
  }, [pathname, hash, lenis]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ZoomProvider>
          <ReactLenis
            root
            options={{
              lerp: 0.08,
              smoothWheel: true,
              syncTouch: true,
              anchors: true,
            }}
          >
            <ScrollToTop />
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/craft" element={<Research />} />
                <Route path="/echo" element={<Echo />} />
                <Route path="/research" element={<Echo />} />
                <Route path="/works/zhi-xiao-bao" element={<ZhiXiaoBao />} />
                <Route path="/works/xiao-mi" element={<XiaoMi />} />
                <Route path="/works/colean" element={<ColeanDetail />} />
                <Route path="/works/qiaopi" element={<Qiaopi />} />
                <Route path="/works/qiaopi/demo" element={<QiaopiDemo />} />
                <Route path="/works/xhs-fries" element={<XhsFries />} />
                <Route path="/works/tako" element={<Tako />} />
                <Route path="/works/sharelink" element={<Sharelink />} />
                <Route path="/demo" element={<FigmaDemo />} />
              </Routes>
            </Suspense>
          </ReactLenis>
        </ZoomProvider>
      </Router>
    </LanguageProvider>
  );
}

export default App;
