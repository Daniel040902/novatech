// ============================================================
// BackToTop.jsx — Boton flotante para volver al inicio
// ============================================================
// Aparece cuando el usuario scrollea mas de 500px y al hacer
// click lleva suavemente al tope de la pagina
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BackToTop() {
  // Estado de visibilidad del boton
  const [visible, setVisible] = useState(false)

  // Efecto: escuchamos el scroll para mostrar/ocultar el boton
  useEffect(() => {
    function handle() {
      // Mostramos solo si scroll > 500px
      setVisible(window.scrollY > 500)
    }
    // Escuchamos scroll con passive:true para rendimiento
    window.addEventListener('scroll', handle, { passive: true })
    // Limpieza del listener
    return () => window.removeEventListener('scroll', handle)
  }, [])

  // Funcion para scroll suave al inicio
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    // AnimatePresence permite animar la salida del boton
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollTop}
          aria-label="Volver arriba"
          // Estilos: posicion fija, fondo gradiente, sombra
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center"
          // Animacion de entrada: aparece desde abajo escalando
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          // Animacion de salida: se va hacia abajo
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          // Spring para sensacion elastica
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          // Hover: escala + rotacion completa
          whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.6 } }}
          // Tap: escala reducida
          whileTap={{ scale: 0.9 }}
        >
          {/*
            Icono SVG de flecha hacia arriba
          */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
