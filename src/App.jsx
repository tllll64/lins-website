import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Research } from './pages/Research';
import { DesignSystemPreview } from './pages/DesignSystemPreview';
import { DesignSystemTest } from './pages/DesignSystemTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/design-system" element={<DesignSystemPreview />} />
        <Route path="/design-system-test" element={<DesignSystemTest />} />
      </Routes>
    </Router>
  );
}

export default App;
