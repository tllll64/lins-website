import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@arco-design/web-react/dist/css/arco.css';
import './index.css'
import App from './App.jsx'

console.log('App Version: 2026-01-27 12:45 - Digital Projects Updated');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
