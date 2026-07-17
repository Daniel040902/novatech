// ============================================================
// AISection.jsx — Seccion de Inteligencia Artificial
// ============================================================
// Muestra 4 tarjetas con servicios de IA: chatbots,
// automatizacion, APIs e IA. Cada una con icono, gradiente
// y descripcion. Animaciones staggered al hacer scroll

import { motion } from 'framer-motion'

// ============================================================
// Datos de las caracteristicas de IA
// ============================================================
const FEATURES = [
  {
    title: 'Chatbots Inteligentes',
    description: 'Asistentes virtuales con IA generativa que entienden lenguaje natural y aprenden de cada interaccion.',
    gradient: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: 'Automatizacion de Procesos',
    description: 'Automatiza tareas repetitivas, flujos de trabajo y procesos empresariales con inteligencia artificial.',
    gradient: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Integraciones API',
    description: 'Conectamos tu negocio con servicios externos: pagos, CRM, ERP, redes sociales y mas.',
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    title: 'Inteligencia Artificial',
    description: 'Modelos de machine learning, analisis predictivo y recomendaciones personalizadas con IA.',
    gradient: 'from-emerald-500 to-teal-500',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

// Variante para animacion staggered
const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// Variante para cada item
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

// ============================================================
// AISection — Componente principal
// ============================================================
export default function AISection() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/*
        Esferas decorativas de fondo
      */}
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl" />

      {/*
        Patron de puntos
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
          Header de la seccion
        */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/*
            Badge de IA
          */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            {/*
              Icono de rayo
            */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            IA y Automatizacion
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Innovacion con{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Inteligencia Artificial
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Potencia tu negocio con soluciones inteligentes y automatizacion avanzada
          </p>
        </motion.div>

        {/*
          Grid de 2 columnas con las tarjetas de IA
        */}
        <div className="grid md:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              // Hover: levanta la tarjeta y colorea el borde
              whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.3)' }}
            >
              {/*
                Overlay de gradiente que aparece en hover
              */}
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl`} />

              <div className="relative flex gap-5">
                {/*
                  Icono del servicio con fondo gradiente
                */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-3.5 text-white flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  {feature.icon}
                </div>
                {/*
                  Texto: titulo y descripcion
                */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
