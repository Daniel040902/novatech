// ============================================================
// SmoothScroll.jsx — Scroll suave con Lenis
// ============================================================
// Envuelve toda la aplicacion para aplicar scroll fluido
// con easing personalizado y soporte para rueda del mouse
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Componente que aplica scroll suave a toda la pagina
 * Usa la libreria Lenis para interpolar el scroll nativo
 * @param {object} props - { children: ReactNode }
 */
export default function SmoothScroll({ children }) {
  // Referencia a la instancia de Lenis para limpieza
  const lenisRef = useRef(null)

  useEffect(() => {
    // Creamos una nueva instancia de Lenis con configuracion personalizada
    const lenis = new Lenis({
      // Duracion de la animacion de scroll (segundos)
      duration: 1.4,
      // Easing: curva exponencial suave (ease-out)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Solo scroll vertical
      orientation: 'vertical',
      // Smooth para scroll con rueda del mouse
      smoothWheel: true,
      // Multiplicador de velocidad del scroll
      wheelMultiplier: 1,
    })

    // Guardamos la instancia
    lenisRef.current = lenis

    // Loop de animacion: Lenis necesita requestAnimationFrame
    function raf(time) {
      lenis.raf(time)     // Actualiza Lenis con el tiempo actual
      requestAnimationFrame(raf)  // Siguiente frame
    }

    // Iniciamos el loop
    requestAnimationFrame(raf)

    // Limpieza al desmontar: destruimos la instancia de Lenis
    return () => {
      lenis.destroy()
    }
  }, [])

  // Renderizamos los hijos sin agregar elementos DOM extra
  return children
}
