// ============================================================
// Stats.jsx — Seccion de estadisticas con contadores animados
// ============================================================
// Muestra metricas clave (proyectos, clientes, etc.) con
// animacion de contador numerico que se activa al hacer scroll

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useEffect, useState } from 'react'

// ============================================================
// Counter — Componente de contador animado
// ============================================================
// Cuenta desde 0 hasta un valor final con velocidad progresiva
// Se activa solo una vez cuando el elemento entra en el viewport

function Counter({ end, suffix = '', duration = 2 }) {
  // Referencia al elemento para detectar visibilidad
  const ref = useRef(null)
  // Detectamos si el elemento esta visible (una sola vez)
  const inView = useInView(ref, { once: true })
  // Estado del contador actual
  const [count, setCount] = useState(0)

  // Efecto: anima el contador cuando entra en vista
  useEffect(() => {
    if (!inView) return // No animar hasta que sea visible

    let current = 0
    // Incremento por frame (~60fps): valor final / (duracion * 60)
    const increment = end / (duration * 60)

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        // Llegamos al final, mostramos el valor exacto
        setCount(end)
        clearInterval(timer)
      } else {
        // Mostramos el valor entero actual
        setCount(Math.floor(current))
      }
    }, 16) // ~60fps (1000ms / 60)

    // Limpieza del intervalo al desmontar
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count}{suffix}
    </span>
  )
}

// ============================================================
// Datos de las estadisticas
// ============================================================
const STATS = [
  { end: 50, suffix: '+', label: 'Proyectos Completados', desc: 'Entregados a tiempo y con calidad' },
  { end: 30, suffix: '+', label: 'Clientes Satisfechos', desc: 'Empresas que confian en nosotros' },
  { end: 10, suffix: '+', label: 'Sistemas Desarrollados', desc: 'Plataformas web y moviles' },
  { end: 5, suffix: '+', label: 'Anos de Experiencia', desc: 'Innovando constantemente' },
]

// ============================================================
// Stats — Componente principal
// ============================================================
export default function Stats() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/*
        Patron de puntos con opacidad minima
      */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/*
        Lineas divisorias decorativas (top y bottom) con gradiente
      */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Grid de 4 columnas en desktop, 2 en movil
        */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              // Animacion de entrada escalonada
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/*
                Contador animado con el numero
              */}
              <div className="inline-flex items-baseline gap-1">
                <Counter end={stat.end} suffix={stat.suffix} />
              </div>
              {/*
                Label de la estadistica
              */}
              <div className="text-sm font-semibold text-slate-300 mt-2">{stat.label}</div>
              {/*
                Descripcion breve
              */}
              <div className="text-xs text-slate-500 mt-1">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
