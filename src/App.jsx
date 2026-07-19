import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sandbox" element={<Research />} />
            <Route path="/echo" element={<Echo />} />
            <Route path="/works/zhi-xiao-bao" element={<ZhiXiaoBao />} />
            <Route path="/works/xiao-mi" element={<XiaoMi />} />
            <Route path="/works/colean" element={<ColeanDetail />} />
            <Route path="/works/qiaopi" element={<Qiaopi />} />
            <Route path="/works/qiaopi/demo" element={<QiaopiDemo />} />
          </Routes>
        </Suspense>
      </Router>
    </LanguageProvider>
  );
}

export default App;
