import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Research } from './pages/Research';
import { ZhiXiaoBao } from './pages/works/zhi-xiao-bao';
import { XiaoMi } from './pages/works/xiao-mi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/works/zhi-xiao-bao" element={<ZhiXiaoBao />} />
        <Route path="/works/xiao-mi" element={<XiaoMi />} />
      </Routes>
    </Router>
  );
}

export default App;
