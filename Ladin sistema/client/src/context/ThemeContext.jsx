// ============================================================
// ThemeContext.jsx — Contexto de tema oscuro/claro
// ============================================================
// Provee tema global con persistencia en localStorage,
// soporte para modo claro, oscuro y deteccion del sistema
import { createContext, useContext, useState, useEffect } from 'react'

// Creamos el contexto de tema
const ThemeContext = createContext()

// Key usada en localStorage para persistir la preferencia
const STORAGE_KEY = 'theme'

/**
 * Provider del tema que envuelve toda la aplicacion
 * Gestiona el estado del tema y lo aplica al HTML root
 */
export function ThemeProvider({ children }) {
  // Estado del tema seleccionado (light | dark | system)
  const [theme, setTheme] = useState(() => {
    // Inicializamos desde localStorage si existe
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved
    // Por defecto usamos modo claro
    return 'light'
  })

  // Estado del tema realmente aplicado (resuelto: light | dark)
  const [resolved, setResolved] = useState('light')

  /**
   * Aplica el tema al HTML root y actualiza el estado resuelto
   * @param {string} t - Tema a aplicar (light, dark, system)
   */
  const applyTheme = (t) => {
    // Determinamos si debe ser oscuro
    const isDark =
      t === 'dark' ||
      (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    // Agregamos o removemos la clase 'dark' del HTML root
    document.documentElement.classList.toggle('dark', isDark)
    // Guardamos el tema resuelto para los componentes
    setResolved(isDark ? 'dark' : 'light')
  }

  // Efecto: aplica el tema cada vez que cambia la seleccion
  useEffect(() => {
    applyTheme(theme)

    if (theme === 'system') {
      // Si es 'system', no guardamos en localStorage
      localStorage.removeItem(STORAGE_KEY)
      // Escuchamos cambios en la preferencia del sistema
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => applyTheme('system')
      mq.addEventListener('change', handler)
      // Limpieza del listener
      return () => mq.removeEventListener('change', handler)
    } else {
      // Guardamos la preferencia del usuario
      localStorage.setItem(STORAGE_KEY, theme)
    }
  }, [theme])

  /**
   * Alterna entre temas: light <-> dark <-> system
   * Cuando viene de 'system', detecta el tema actual del sistema
   */
  const toggle = () => {
    setTheme(prev => {
      if (prev === 'system') {
        // Si veniamos de 'system', vamos al opuesto del sistema actual
        const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        return sysDark ? 'light' : 'dark'
      }
      // Alternamos entre light y dark
      return prev === 'dark' ? 'light' : 'dark'
    })
  }

  // Proveemos el contexto con tema, tema resuelto y toggle
  return (
    <ThemeContext.Provider value={{ theme, resolved, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook para consumir el contexto del tema
 * @returns {object} { theme, resolved, toggle }
 */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  // Aseguramos que se use dentro del Provider
  if (!ctx) throw new Error('useTheme debe usarse dentro de ThemeProvider')
  return ctx
}
