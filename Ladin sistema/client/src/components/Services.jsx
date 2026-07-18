// ============================================================
// Services.jsx — Seccion de servicios ofrecidos
// ============================================================
// Muestra 6 tarjetas de servicio con efecto 3D tilt en hover,
// imagenes ilustrativas, iconos, descripcion y tecnologias
// Cada servicio se aniade en el array SERVICES con su imagen

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// ============================================================
// Datos de los servicios
// ============================================================
// Cada servicio tiene: titulo, imagen (path relativo a /public/),
// descripcion, gradiente de color, icono SVG, y etiquetas tech
const SERVICES = [
  {
    title: 'Desarrollo Web',
    price: '$60',
    // encodeURI se usa al renderizar para manejar espacios en el filename
    image: `${import.meta.env.BASE_URL}pawuina web.png`,
    description: 'Creamos paginas web corporativas, landing pages y sistemas web modernos que ayudan a tu negocio a vender mas y destacar en internet.',
    gradient: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    tech: 'React · Laravel · .NET · SEO',
  },
  {
    title: 'Sistemas Empresariales',
    image: `${import.meta.env.BASE_URL}Sistemas Empresariales.png`,
    description: 'Desarrollamos sistemas personalizados para gestionar inventarios, ventas, clientes, reservas y procesos internos de forma eficiente.',
    gradient: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    tech: 'Laravel · PostgreSQL · MySQL',
  },
  {
    title: 'Aplicaciones Moviles',
    image: `${import.meta.env.BASE_URL}Aplicacione moviles.png`,
    description: 'Creamos aplicaciones moviles rapidas e intuitivas para Android e iOS adaptadas a las necesidades de tu empresa.',
    gradient: 'from-emerald-500 to-teal-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    tech: 'Android · React Native · API REST',
  },
  {
    title: 'SEO y Posicionamiento Web',
    image: `${import.meta.env.BASE_URL}SEO y Posicionamiento Web.png`,
    description: 'Optimizamos tu sitio web para mejorar su visibilidad en Google y atraer mas clientes potenciales de forma organica.',
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    tech: 'SEO Local · Google Search Console · Google Analytics',
  },

  {
    title: 'Hosting y Seguridad Web',
    image: `${import.meta.env.BASE_URL}hosting.png`,
    description: 'Configuramos dominios, hosting, certificados SSL y proteccion para garantizar el rendimiento y seguridad de tu sitio web.',
    gradient: 'from-rose-500 to-red-500',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    tech: 'Cloudflare · Vercel · SSL',
  },
]

// Variante de animacion para el contenedor (stagger)
const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// Variante para cada tarjeta (fade + slide up)
const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

// ============================================================
// ServiceCard — Tarjeta de servicio individual
// ============================================================
// Efecto 3D tilt al mover el mouse sobre la tarjeta
// Scroll parallax sutil en los ejes X/Y
// Imagen del servicio con efecto zoom en hover

function ServiceCard({ service, index }) {
  const cardRef = useRef(null)

  // Scroll-based transform (parallax en las tarjetas)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['0 1', '1 0'],
  })
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5])

  /**
   * Efecto 3D tilt: calcula rotacion basada en posicion del mouse
   */
  function handleMouseMove(e) {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rx = (y - centerY) / centerY * -8   // Rotacion en X
    const ry = (x - centerX) / centerX * 8    // Rotacion en Y
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }

  /**
   * Restablece la rotacion al salir el mouse
   */
  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }

  return (
    <motion.div
      ref={cardRef}
      variants={CARD_VARIANTS}
      // Estilos: border sutil, fondo semi-transparente, efecto glass
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden cursor-default"
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      {/*
        Overlay de gradiente que aparece en hover
      */}
      <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-15 blur-xl transition-opacity duration-500 rounded-2xl`} />

      {/*
        Header de la tarjeta: imagen del servicio
      */}
      <div className="relative h-44 sm:h-48 bg-slate-800/50 overflow-hidden">
        {/*
          Fondo de respaldo con el gradiente del servicio
        */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`} />

        {/*
          Imagen del servicio (con encodeURI para manejar espacios)
          object-contain + padding para que se vea completa
          Zoom sutil en hover
        */}
        <img
          src={encodeURI(service.image)}
          alt={service.title}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
        />

        {/*
          Gradiente desde abajo para suavizar la transicion al contenido
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        {/*
          Icono del servicio superpuesto en la esquina superior izquierda
          Efecto 3D translateZ para profundidad
        */}
        <div
          className={`absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.gradient} text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3`}
          style={{ transform: 'translateZ(20px)' }}
        >
          {service.icon}
        </div>

        {/*
          Badge numerico "01", "02", etc. en la esquina superior derecha
        */}
        <div className="absolute top-4 right-4 z-10">
          <div className="px-3 py-1 rounded-full border border-white/20 bg-slate-900/80 backdrop-blur-sm text-[10px] text-slate-300 font-mono tracking-wide">
            {`0${index + 1}`}
          </div>
        </div>
      </div>

      {/*
        Contenido de la tarjeta: titulo, descripcion, tech tags
      */}
      <div className="p-6 relative">
        {service.price && (
          <div className="mb-2 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-400 text-sm font-bold">
            Desde {service.price}
          </div>
        )}
        <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm mb-4">{service.description}</p>
        {/*
          Etiquetas de tecnologias (monoespaciado, modo terminal)
        */}
        <div className="inline-flex px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-slate-500 font-mono tracking-wide">
          {service.tech}
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================
// Services — Componente principal de la seccion
// ============================================================
export default function Services() {
  return (
    <section id="services" className="relative py-24 bg-slate-900 overflow-hidden">
      {/*
        Esferas decorativas de fondo con blur
      */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />

      {/*
        Patron de puntos sutil
      */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Header de la seccion: badge, titulo, descripcion
        */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            {/*
              Icono de maletin/herramientas
            */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Servicios
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Soluciones{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Integrales
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tecnologia de punta para impulsar tu negocio al siguiente nivel
          </p>
        </motion.div>

        {/*
          Grid de tarjetas de servicio
          3 columnas en lg, 2 en md, 1 en sm
          Animacion stagger al hacer scroll
        */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
