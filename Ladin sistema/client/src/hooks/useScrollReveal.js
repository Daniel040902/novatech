// ============================================================
// useScrollReveal.js — Hook para animaciones al hacer scroll
// ============================================================
// Detecta cuando un elemento entra en el viewport y le aplica
// la clase 'visible' para activar animaciones CSS
import { useEffect, useRef } from 'react'

/**
 * Hook que devuelve una ref para observar un elemento
 * con IntersectionObserver y activar animaciones al aparecer
 * @param {number} threshold - Umbral de visibilidad (0-1)
 * @returns {React.RefObject} ref para asignar al elemento
 */
export function useScrollReveal(threshold = 0.15) {
  // Referencia al elemento que queremos observar
  const ref = useRef(null)

  useEffect(() => {
    // Obtenemos el elemento del DOM
    const el = ref.current
    if (!el) return // Si no existe, salimos

    // Configuramos IntersectionObserver para detectar visibilidad
    const observer = new IntersectionObserver(
      // Callback cuando cambia la visibilidad
      ([entry]) => {
        // Si el elemento es visible en el viewport
        if (entry.isIntersecting) {
          // Agregamos la clase 'visible' para activar animacion CSS
          el.classList.add('visible')
          // Dejamos de observar (la animacion se ejecuta una sola vez)
          observer.unobserve(el)
        }
      },
      // Config: el elemento se considera visible cuando supera el umbral
      { threshold }
    )

    // Comenzamos a observar el elemento
    observer.observe(el)

    // Limpieza: desconectamos el observer al desmontar
    return () => observer.disconnect()
  }, [threshold])

  // Retornamos la ref para que el componente la asigne a su elemento
  return ref
}
