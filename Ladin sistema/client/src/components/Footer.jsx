// ============================================================
// Footer.jsx — Pie de pagina
// ============================================================
// Contiene logo, descripcion, redes sociales, enlaces rapidos,
// tecnologias y copyright. Fondo oscuro con efectos decorativos

import { motion } from 'framer-motion'

// Redes sociales con sus paths SVG (formato icomoon)
const SOCIALS = [
  { name: 'github', path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
  { name: 'twitter', path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { name: 'linkedin', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
]

// Enlaces del footer
const FOOTER_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proceso', href: '#timeline' },
  { label: 'Contacto', href: '#contact' },
]

// Tecnologias listadas en el footer
const TECHNOLOGIES = ['React 19', 'Node.js', 'Laravel', 'PostgreSQL', 'Docker']

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden border-t border-white/5">
      {/*
        Esferas decorativas de fondo con blur
      */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/*
        Patron de puntos decorativo
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
          Grid de 4 columnas: logo+social, enlaces, tecnologias
        */}
        <div className="grid md:grid-cols-4 gap-12 py-16">
          {/*
            Columna 1-2: Logo, descripcion y redes sociales
          */}
          <div className="md:col-span-2">
            {/*
              Logo de Novatech (SVG)
            */}
            <img src="/novatech_logo.svg" alt="Novatech" className="h-8 w-auto" />

            {/*
              Descripcion de la empresa
            */}
            <p className="mt-4 text-slate-400 max-w-md leading-relaxed">
              Desarrollamos software seguro, escalable y de alta calidad.
              Transformamos tus ideas en soluciones digitales con estandares profesionales.
            </p>

            {/*
              Iconos de redes sociales
            */}
            <div className="flex gap-3 mt-6">
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 flex items-center justify-center transition-colors duration-300 group"
                  aria-label={social.name}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/*
            Columna 3: Enlaces rapidos
          */}
          <div>
            <h4 className="text-white font-semibold mb-5">Enlaces</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-slate-400 hover:text-indigo-400 transition-all text-sm group flex items-center gap-2"
                  >
                    {/*
                      Indicador de hover (punto)
                    */}
                    <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/*
            Columna 4: Tecnologias
          */}
          <div>
            <h4 className="text-white font-semibold mb-5">Tecnologias</h4>
            <ul className="space-y-3 text-sm">
              {TECHNOLOGIES.map((tech) => (
                <li key={tech} className="text-slate-400 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/*
          Barra de copyright inferior
        */}
        <div className="border-t border-white/5 py-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Dev. Todos los derechos reservados.</p>
          <p className="mt-1">Soluciones tecnologicas modernas para impulsar tu negocio.</p>
        </div>
      </div>
    </footer>
  )
}
