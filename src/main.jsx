import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'  
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext';
import ThemeProvider from './context/ThemeContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>,
)
