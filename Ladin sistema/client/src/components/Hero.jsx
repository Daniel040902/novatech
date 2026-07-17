// ============================================================
// Hero.jsx — Seccion principal (Hero) de la landing page
// ============================================================
// Muestra el titulo principal, descripcion, CTA y estadisticas
// Incluye un canvas con particulas interactivas y el globo 3D
// como fondo visual. Animaciones escalonadas con Framer Motion

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Hero3D from './Hero3D'

// Variantes de animacion para el contenedor principal (stagger children)
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    // Los hijos aparecen escalonadamente con 0.12s de delay entre ellos
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

// Variantes para cada elemento hijo (fade + slide up)
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

// ============================================================
// useParticleNetwork — Hook para animacion de particulas en canvas
// ============================================================
// Crea una red de nodos conectados por lineas con efecto
// parallax al mover el mouse. Se renderiza detras del contenido.

function useParticleNetwork(canvasRef, orbsRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId // ID del requestAnimationFrame para limpieza

    // Ajusta el tamano del canvas al viewport
    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ============================================================
    // Creacion de nodos de la red
    // ============================================================
    const nodeCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 15000))
    const nodes = []
    for (let i = 0; i < nodeCount; i++) {
      // Distribucion circular alrededor del centro
      const angle = Math.random() * Math.PI * 2
      const radius = 80 + Math.random() * 180
      nodes.push({
        x: canvas.width / 2 + Math.cos(angle) * radius,
        y: canvas.height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.2,    // Velocidad horizontal
        vy: (Math.random() - 0.5) * 0.2,    // Velocidad vertical
        r: Math.random() * 2 + 1,            // Radio base del nodo
        alpha: Math.random() * 0.4 + 0.2,    // Opacidad
        pulse: Math.random() * Math.PI * 2,  // Fase de pulso
        pulseSpeed: 0.01 + Math.random() * 0.02, // Velocidad de pulso
        connections: [],                      // Indices de nodos conectados
      })
    }

    // Calculamos las conexiones entre nodos cercanos (< 200px)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          nodes[i].connections.push(j)
          nodes[j].connections.push(i)
        }
      }
    }

    // ============================================================
    // Loop de animacion
    // ============================================================
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Actualizamos y dibujamos cada nodo
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        // Movimiento
        n.x += n.vx
        n.y += n.vy
        n.pulse += n.pulseSpeed
        // Wrap alrededor de los bordes
        if (n.x < 0) n.x = canvas.width
        if (n.x > canvas.width) n.x = 0
        if (n.y < 0) n.y = canvas.height
        if (n.y > canvas.height) n.y = 0

        // Efecto de glow radial alrededor del nodo
        const pulseR = n.r + Math.sin(n.pulse) * 0.8
        ctx.beginPath()
        ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 3)
        grad.addColorStop(0, `rgba(129, 140, 248, ${n.alpha})`)
        grad.addColorStop(1, 'rgba(129, 140, 248, 0)')
        ctx.fillStyle = grad
        ctx.fill()

        // Punto central del nodo
        ctx.beginPath()
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(165, 180, 252, ${n.alpha + 0.2})`
        ctx.fill()

        // Dibujamos lineas de conexion a nodos cercanos
        for (const j of n.connections) {
          const n2 = nodes[j]
          const dx = n.x - n2.x
          const dy = n.y - n2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          // Solo dibujamos si aun estan cerca
          if (dist < 200) {
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(n2.x, n2.y)
            // Opacidad basada en distancia (mas lejos = mas tenue)
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 200)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    // ============================================================
    // Efecto parallax con el mouse
    // ============================================================
    function handleMouse(e) {
      // Calculamos posicion normalizada del mouse (-1 a 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      // Aplicamos transformacion sutil al canvas
      canvas.style.transform = `translate(${x * 8}px, ${y * 8}px)`
      // Movemos las esferas de fondo (orbs) con parallax mas pronunciado
      orbsRef.current.forEach((orb, i) => {
        if (orb) {
          orb.style.transform = `translate(${x * (12 + i * 6)}px, ${y * (12 + i * 6)}px)`
        }
      })
    }
    window.addEventListener('mousemove', handleMouse)

    // ============================================================
    // Limpieza al desmontar
    // ============================================================
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])
}

// ============================================================
// Hero — Componente principal de la seccion Hero
// ============================================================
export default function Hero() {
  const canvasRef = useRef(null)  // Referencia al canvas de particulas
  const bgRef = useRef(null)      // Referencia al fondo gradiente
  const orbsRef = useRef([])      // Referencias a esferas decorativas
  orbsRef.current = []            // Inicializamos el array

  // Iniciamos la red de particulas
  useParticleNetwork(canvasRef, orbsRef)

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/*
        Fondo gradiente con tonos indigo/purpura
      */}
      <div ref={bgRef} className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-slate-950 to-purple-950/30" />

      {/*
        Patron de puntos con opacidad muy baja (textura sutil)
      */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/*
        Gradiente de oscuridad hacia arriba (vignette)
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      {/*
        Esferas decorativas con blur (efecto de luz ambiental)
        Se mueven con parallax al mover el mouse
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={(el) => { orbsRef.current[0] = el }} className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div ref={(el) => { orbsRef.current[1] = el }} className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
        <div ref={(el) => { orbsRef.current[2] = el }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-400/5 rounded-full blur-[140px]" />
      </div>

      {/*
        Canvas de particulas interactivas (red de nodos)
      */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/*
        Globo 3D con Three.js (renderizado transparente)
      */}
      <Hero3D />

      {/*
        Indicador de scroll en la parte inferior
        Animacion de "scroll down" con icono de mouse
      */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-6 h-10 rounded-2xl border-2 border-white/20 flex items-start justify-center pt-2">
              <motion.div
                className="w-1 h-2 rounded-full bg-white/40"
                animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
          <span className="text-[10px] text-white/20 font-medium tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>

      {/*
        Contenido principal del Hero
        Texto, descripcion, CTAs y estadisticas
      */}
      <div className="relative w-full">
        <div className="px-6 sm:px-12 lg:px-16 py-32">
          {/*
            Contenedor animado con stagger children
          */}
          <motion.div
            className="text-left max-w-4xl"
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="visible"
          >
            {/*
              Badge de marca: "Novatech" + "Soluciones Digitales"
            */}
            <motion.div className="flex items-center gap-2 mb-6">
              <span
                className="text-2xl md:text-3xl font-bold text-white/90 tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Nova<span className="text-indigo-400">tech</span>
              </span>
              <span className="px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium">
                Soluciones Digitales
              </span>
            </motion.div>

            {/*
              Titulo principal con gradiente animado
            */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-[-0.03em]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Llevamos tu negocio
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-[length:200%_auto] animate-[gradient-shift_4s_linear_infinite]">
                al siguiente nivel
              </span>
            </motion.h1>

            {/*
              Descripcion del servicio
            */}
            <motion.p
              className="text-base md:text-lg text-slate-400/80 mb-12 leading-relaxed font-light tracking-wide max-w-xl"
            >
              Desarrollamos landing pages, sistemas web y aplicaciones moviles a medida,
              creando soluciones tecnologicas modernas para impulsar tu negocio.
            </motion.p>

            {/*
              Botones de Call to Action
              "Ver Servicios" (primario) y "Contactanos" (secundario)
            */}
            <motion.div variants={ITEM_VARIANTS} className="flex flex-col sm:flex-row gap-4">
              {/*
                Boton primario: fondo blanco, al hacer hover se tiñe de indigo
              */}
              <motion.a
                href="#services"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-500 text-sm tracking-wide cursor-pointer bg-white text-slate-900 shadow-2xl shadow-white/10 hover:shadow-indigo-500/25 hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/*
                  Overlay de color que sube en hover
                */}
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative flex items-center gap-2 group-hover:text-white">
                  Ver Servicios
                  <svg className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>

              {/*
                Boton secundario: borde blanco, hover con glow
              */}
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative border border-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-500 hover:border-indigo-400/50 hover:bg-indigo-500/5 hover:-translate-y-1 backdrop-blur-sm text-sm tracking-wide overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/*
                  Barrido de luz en hover
                */}
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <span className="relative flex items-center gap-2">
                  Contactanos
                  <svg className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.a>
            </motion.div>

            {/*
              Estadisticas: proyectos, clientes, años
            */}
            <motion.div variants={ITEM_VARIANTS} className="flex items-center gap-8 mt-16">
              {[
                { number: '50+', label: 'Proyectos' },
                { number: '30+', label: 'Clientes' },
                { number: '5+', label: 'Años' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
