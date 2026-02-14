import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Research = lazy(() => import('./pages/Research').then(module => ({ default: module.Research })));
const ZhiXiaoBao = lazy(() => import('./pages/works/zhi-xiao-bao').then(module => ({ default: module.ZhiXiaoBao })));
const XiaoMi = lazy(() => import('./pages/works/xiao-mi').then(module => ({ default: module.XiaoMi })));
const ColeanDetail = lazy(() => import('./pages/ColeanDetail').then(module => ({ default: module.ColeanDetail })));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/works/zhi-xiao-bao" element={<ZhiXiaoBao />} />
          <Route path="/works/xiao-mi" element={<XiaoMi />} />
          <Route path="/works/colean" element={<ColeanDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
