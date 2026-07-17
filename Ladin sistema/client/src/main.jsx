// ============================================================
// main.jsx — Punto de entrada de la aplicacion React
// ============================================================
// Renderiza la aplicacion con todos los providers necesarios:
// ThemeProvider (tema oscuro/claro) y SmoothScroll (scroll suave)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Estilos globales (Tailwind + animaciones personalizadas)
import './index.css'

// Componente raiz de la aplicacion
import App from './App.jsx'

// Provider de tema oscuro/claro con persistencia en localStorage
import { ThemeProvider } from './context/ThemeContext'

// Componente de scroll suave con Lenis
import SmoothScroll from './components/SmoothScroll'

// Obtenemos el elemento root del DOM y montamos la app
createRoot(document.getElementById('root')).render(
  // StrictMode activa verificaciones en desarrollo (no afecta produccion)
  <StrictMode>
    <ThemeProvider>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </ThemeProvider>
  </StrictMode>,
)
