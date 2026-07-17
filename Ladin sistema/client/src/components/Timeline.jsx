// ============================================================
// Timeline.jsx — Linea de tiempo del proceso de desarrollo
// ============================================================
// Muestra 5 fases del proceso (Descubrimiento -> Despliegue)
// con diseno alternado (izquierda/derecha) y linea central
// Animaciones al hacer scroll con Framer Motion

import { motion } from 'framer-motion'

// ============================================================
// Datos de las fases del proceso
// ============================================================
const PHASES = [
  {
    phase: '01',
    title: 'Descubrimiento',
    description: 'Analizamos tu negocio, objetivos y requisitos para definir la mejor estrategia tecnologica.',
    gradient: 'from-blue-500 to-cyan-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    phase: '02',
    title: 'Diseno',
    description: 'Creamos prototipos, wireframes y disenos UI/UX centrados en el usuario y la experiencia.',
    gradient: 'from-purple-500 to-pink-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    phase: '03',
    title: 'Desarrollo',
    description: 'Implementamos con codigo limpio, pruebas automatizadas y las mejores practicas de la industria.',
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    phase: '04',
    title: 'Pruebas',
    description: 'QA exhaustivo, pruebas de carga, seguridad y rendimiento para garantizar calidad total.',
    gradient: 'from-emerald-500 to-teal-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    phase: '05',
    title: 'Despliegue',
    description: 'Lanzamiento a produccion con monitoreo continuo, soporte y mantenimiento garantizado.',
    gradient: 'from-violet-500 to-indigo-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
  },
]

// ============================================================
// Timeline — Componente principal
// ============================================================
export default function Timeline() {
  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden">
      {/*
        Linea divisoria superior con gradiente
      */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

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
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            {/*
              Icono de rayo
            */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Metodologia
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestro{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Proceso
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            De la idea al lanzamiento, te acompanamos en cada etapa del desarrollo
          </p>
        </motion.div>

        {/*
          Timeline: linea vertical central con items alternados
        */}
        <div className="relative">
          {/*
            Linea vertical central con gradiente
          */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-transparent -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {PHASES.map((phase, i) => (
              <motion.div
                key={phase.phase}
                // Alternamos entre left y right en desktop
                className={`relative flex flex-col md:flex-row items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/*
                  Espaciador para alinear al lado contrario en desktop
                */}
                <div className="hidden md:block flex-1" />

                {/*
                  Punto en la linea de tiempo
                  Circulo exterior con relleno gradiente
                */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-indigo-500/30 flex items-center justify-center z-10">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${phase.gradient}`} />
                </div>

                {/*
                  Contenido de la fase (tarjeta)
                  Se desplaza al lado opuesto del punto central
                */}
                <div className="flex-1 pl-16 md:pl-0 md:pr-12">
                  <div className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-500">
                    <div className="flex items-center gap-3 mb-3">
                      {/*
                        Numero de fase con gradiente en texto
                      */}
                      <span className={`text-2xl font-bold bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent`}>
                        {phase.phase}
                      </span>
                      {/*
                        Icono de la fase en fondo gradiente
                      */}
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${phase.gradient} p-2 text-white flex items-center justify-center`}>
                        {phase.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{phase.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
