// ============================================================
// TechStack.jsx — Seccion de tecnologias que usamos
// ============================================================
// Muestra un grid de 10 tecnologias con iconos, colores
// representativos y animaciones al hacer scroll

import { motion } from 'framer-motion'

// ============================================================
// Datos de las tecnologias
// ============================================================
const TECHS = [
  { name: 'React', color: '#61DAFB', icon: '⚛️' },
  { name: 'Node.js', color: '#339933', icon: '🟢' },
  { name: 'Laravel', color: '#FF2D20', icon: '🔥' },
  { name: 'PostgreSQL', color: '#4169E1', icon: '🐘' },
  { name: 'Docker', color: '#2496ED', icon: '🐳' },
  { name: 'Cloudflare', color: '#F38020', icon: '☁️' },
  { name: 'Flutter', color: '#02569B', icon: '📱' },
  { name: '.NET', color: '#512BD4', icon: '🟣' },
  { name: 'React Native', color: '#61DAFB', icon: '📲' },
  { name: 'Next.js', color: '#000000', icon: '▲' },
]

// ============================================================
// TechStack — Componente principal
// ============================================================
export default function TechStack() {
  return (
    <section className="relative py-24 bg-slate-950 overflow-hidden">
      {/*
        Linea divisoria superior
      */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

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
            Badge de seccion
          */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            {/*
              Icono de engranaje/herramientas
            */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Tecnologias
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Stack{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Tecnologico
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Las tecnologias mas modernas y robustas del mercado
          </p>
        </motion.div>

        {/*
          Grid de tecnologias: 5 cols en lg, 4 en md, 3 en sm, 2 en movil
        */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TECHS.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col items-center gap-3 cursor-default"
              // Animacion de entrada: escala desde 0.8
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              // Hover: levanta, escala y colorea el borde
              whileHover={{ y: -8, scale: 1.05, borderColor: tech.color + '40' }}
            >
              {/*
                Fondo gradiente sutil en hover
              */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundImage: `linear-gradient(135deg, ${tech.color}33, transparent)` }}
              />
              {/*
                Icono de la tecnologia (emoji)
              */}
              <div className="relative text-3xl">{tech.icon}</div>
              {/*
                Nombre de la tecnologia
              */}
              <div className="relative text-sm font-semibold text-white">{tech.name}</div>
              {/*
                Barra de color representativo
              */}
              <div
                className="relative w-12 h-1 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500"
                style={{ backgroundColor: tech.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
