// ============================================================
// Navbar.jsx — Barra de navegacion principal
// ============================================================
// Navbar fija con fondo transparente que se vuelve
// semi-opaco al scrollear. Incluye menu desktop y movil
// con enlaces a secciones, toggle de tema y logo de la marca

import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useState, useEffect } from 'react'

// Enlaces de navegacion: label visible y href para scroll-to
const NAV_LINKS = [
  { href: '#hero', label: 'Inicio' },
  { href: '#services', label: 'Servicios' },
  { href: '#timeline', label: 'Proceso' },
  { href: '#contact', label: 'Contacto' },
]

// Icono SVG de sol (modo claro)
const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

// Icono SVG de luna (modo oscuro)
const MoonIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
)

export default function Navbar() {
  // Estado: navbar con fondo solido (true si scroll > 50px)
  const [scrolled, setScrolled] = useState(false)
  // Estado: menu movil abierto/cerrado
  const [menuOpen, setMenuOpen] = useState(false)
  // Contexto de tema (resolved: dark | light, toggle: cambiar tema)
  const { resolved, toggle } = useTheme()

  // Efecto: detecta scroll para cambiar estilo del navbar
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    // passive:true mejora rendimiento del scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Efecto: bloquea scroll del body cuando el menu movil esta abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /**
   * Maneja click en enlace de navegacion
   * Cierra el menu y hace scroll suave a la seccion destino
   */
  function handleNavClick(e, href) {
    e.preventDefault()       // Evita navegacion por defecto
    setMenuOpen(false)       // Cierra menu movil si estaba abierto
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/*
        Navbar principal: fixed en top con z-index alto
        Fondo transparente inicial, solido con blur al scrollear
      */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/*
              Logo de la marca: enlace al inicio
              Muestra el SVG de novatech_logo
            */}
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <img src={`${import.meta.env.BASE_URL}novatech_logo.svg`} alt="Novatech" className="h-8 w-auto" />
            </motion.a>

            {/*
              Menu desktop: visible en md+ (hidden en movil)
              Incluye enlaces de navegacion + toggle de tema
            */}
            <div className="hidden md:flex items-center gap-1">
              {/* Renderizamos cada enlace */}
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    scrolled
                      ? 'text-slate-300 hover:text-white hover:bg-white/5'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              {/*
                Boton de alternar tema (sol/luna)
                Animacion de rotacion en hover
              */}
              <motion.button
                onClick={toggle}
                aria-label="Cambiar tema"
                className={`ml-2 p-2.5 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? 'text-slate-300 hover:bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                {resolved === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.button>
            </div>

            {/*
              Menu movil: visible solo en md-
              Incluye toggle de tema y boton hamburguesa
            */}
            <div className="flex md:hidden items-center gap-2">
              {/* Toggle de tema para movil */}
              <motion.button
                onClick={toggle}
                aria-label="Cambiar tema"
                className="p-2.5 rounded-xl text-slate-300"
                whileTap={{ scale: 0.9 }}
              >
                {resolved === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.button>
              {/*
                Boton hamburguesa para abrir menu lateral
              */}
              <button
                className="text-slate-300"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/*
        Menu lateral movil (overlay + panel deslizante)
        Animado con Framer Motion: aparece desde la derecha
      */}
      <motion.div
        className="fixed inset-0 z-[60]"
        // Estado inicial: animacion controlada por variantes
        initial={false}
        animate={menuOpen ? 'visible' : 'hidden'}
        variants={{
          visible: { pointerEvents: 'auto' },
          hidden: { pointerEvents: 'none' },
        }}
      >
        {/*
          Overlay semitransparente con blur
          Al hacer click cierra el menu
        */}
        <motion.div
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          variants={{
            visible: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
          onClick={() => setMenuOpen(false)}
        />

        {/*
          Panel lateral derecho con los enlaces
          Animacion de slide-in desde la derecha
        */}
        <motion.div
          className="absolute top-0 right-0 h-full w-72 bg-slate-950 border-l border-white/10 shadow-2xl"
          variants={{
            visible: { x: 0 },
            hidden: { x: '100%' },
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        >
          {/*
            Header del panel: logo + boton cerrar
          */}
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <img src={`${import.meta.env.BASE_URL}novatech_logo.svg`} alt="Novatech" className="h-6 w-auto" />
            <button onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/*
            Lista de enlaces con animacion escalonada
            Cada enlace aparece con un pequeno delay (stagger)
          */}
          <div className="p-5 space-y-1">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-slate-300 hover:text-white hover:bg-white/5 rounded-xl px-4 py-3.5 transition-all font-medium"
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: 20 },
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}
