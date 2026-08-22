import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { LanguageProvider } from './contexts/LanguageContext';

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

// 路由切换时回到页面顶部（带 hash 的锚点跳转除外）
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();
  useEffect(() => {
    if (hash) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenis]);
  return null;
}

function App() {
  return (
    <LanguageProvider>
      <Router>
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
              <Route path="/works/zhi-xiao-bao" element={<ZhiXiaoBao />} />
              <Route path="/works/xiao-mi" element={<XiaoMi />} />
              <Route path="/works/colean" element={<ColeanDetail />} />
              <Route path="/works/qiaopi" element={<Qiaopi />} />
              <Route path="/works/qiaopi/demo" element={<QiaopiDemo />} />
              <Route path="/works/xhs-fries" element={<XhsFries />} />
              <Route path="/works/tako" element={<Tako />} />
            </Routes>
          </Suspense>
        </ReactLenis>
      </Router>
    </LanguageProvider>
  );
}

export default App;
