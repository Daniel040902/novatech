import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const practices = [
  {
    title: 'OWASP Top 10',
    description: 'Protegemos contra las vulnerabilidades mas criticas: XSS, inyeccion SQL, CSRF y mas.',
    level: 'Critico',
    gradient: 'from-red-500 to-rose-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Autenticacion Segura',
    description: 'Implementamos JWT con refresh tokens, OAuth 2.0, y autenticacion multifactor.',
    level: 'Alto',
    gradient: 'from-orange-500 to-amber-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Cifrado de Datos',
    description: 'Datos cifrados en transito (TLS 1.3) y en reposo (AES-256) con gestion segura de claves.',
    level: 'Alto',
    gradient: 'from-orange-500 to-amber-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Validacion de Inputs',
    description: 'Sanitizacion y validacion estricta de todos los datos de entrada en frontend y backend.',
    level: 'Alto',
    gradient: 'from-orange-500 to-amber-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Rate Limiting',
    description: 'Proteccion contra ataques de fuerza bruta y DDoS con limites de peticiones inteligentes.',
    level: 'Medio',
    gradient: 'from-yellow-500 to-lime-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Auditoria Continua',
    description: 'Logs de seguridad, monitoreo en tiempo real y analisis de vulnerabilidades automatizado.',
    level: 'Medio',
    gradient: 'from-yellow-500 to-lime-500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Security() {
  const headerRef = useScrollReveal()
  const ctaRef = useScrollReveal()

  return (
    <section id="security" className="relative py-24 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Seguridad Primero
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Practicas de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Seguridad
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Cada proyecto se construye con seguridad desde el diseno, siguiendo estandares internacionales
          </p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {practices.map((practice) => (
            <motion.div
              key={practice.title}
              variants={cardVariants}
              className="group relative bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden"
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${practice.gradient} opacity-0 group-hover:opacity-10 blur transition-opacity duration-500 rounded-2xl`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${practice.gradient} p-2.5 text-white flex items-center justify-center shadow-lg`}>
                    {practice.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${practice.gradient} text-white shadow-lg`}>
                    {practice.level}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{practice.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{practice.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          ref={ctaRef}
          className="mt-16 scroll-reveal relative overflow-hidden rounded-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
          <div className="relative p-10 md:p-14 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Listo para un software seguro?</h3>
            <p className="text-indigo-200 mb-8 max-w-xl mx-auto">
              Implementamos las mejores practicas de seguridad desde el primer dia de desarrollo
            </p>
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="group relative inline-block bg-white text-indigo-600 px-10 py-4 rounded-xl font-semibold overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="absolute inset-0 bg-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Solicitar Cotizacion</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
