import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Research } from './pages/Research';

function App() {
  // Check if we are in production environment (GitHub Pages)
  const isProduction = import.meta.env.PROD;
  const basename = isProduction ? '/lins-website' : '/';

  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
      </Routes>
    </Router>
  );
}

export default App;