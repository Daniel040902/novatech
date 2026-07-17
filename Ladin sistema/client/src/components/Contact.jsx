// ============================================================
// Contact.jsx — Seccion de contacto con formulario
// ============================================================
// Incluye informacion de contacto (email, telefono) y un
// formulario con validacion en tiempo real. Los datos se
// envian via POST al endpoint /api/contact

import { motion } from 'framer-motion'
import { useFormValidation } from '../hooks/useFormValidation'
import { useScrollReveal } from '../hooks/useScrollReveal'

// ============================================================
// FloatingInput — Campo de formulario con etiqueta flotante
// ============================================================
// Muestra la etiqueta como placeholder que sube al escribir
// Soporta input text, email y textarea. Muestra errores
// y resalta el borde en rojo si hay validacion fallida

function FloatingInput({ label, name, type, value, onChange, onBlur, error, touched, maxLength, placeholder, textarea }) {
  // Elegimos entre textarea o input segun el tipo
  const Input = textarea ? 'textarea' : 'input'

  return (
    <div className="relative mb-6">
      {/*
        Input/Textarea con estilo flotante
        Borde cambia a rojo si hay error, a indigo si esta enfocado
      */}
      <Input
        type={type || 'text'}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={textarea ? 5 : undefined}
        className={`peer w-full px-4 pt-6 pb-2 rounded-xl border-2 bg-transparent transition-all duration-200 outline-none resize-none ${
          touched && error
            ? 'border-red-300 dark:border-red-500'
            : 'border-slate-200 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400'
        }`}
      />
      {/*
        Label flotante: sube cuando el campo tiene valor o focus
      */}
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          value
            ? 'top-2 text-xs font-medium text-indigo-600 dark:text-indigo-400'
            : 'top-4 text-sm text-slate-400 dark:text-slate-500 peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-indigo-600 dark:peer-focus:text-indigo-400'
        }`}
      >
        {label}
      </label>
      {/*
        Mensaje de error (solo si el campo fue tocado y hay error)
      */}
      {touched && error && <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>}
    </div>
  )
}

// ============================================================
// Datos de informacion de contacto
// ============================================================
const CONTACT_INFO = [
  {
    // Icono de sobre (email)
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    gradient: 'from-blue-500 to-cyan-500',
    label: 'Email',
    value: 'valverde44255@gmail.com',
  },
  {
    // Icono de telefono
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    gradient: 'from-purple-500 to-pink-500',
    label: 'Telefono',
    value: '+505 5824 9298',
  },
]

// Variantes de animacion para los items de contacto
const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const ITEM_VARIANTS = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

// ============================================================
// Contact — Componente principal
// ============================================================
export default function Contact() {
  // Hook de validacion del formulario
  const { values, errors, touched, handleChange, handleBlur, isValid, resetForm } = useFormValidation()
  // Hook para animacion de scroll
  const headerRef = useScrollReveal()

  /**
   * Maneja el envio del formulario
   * Valida, envia via POST a /api/contact y muestra resultado
   */
  function handleSubmit(e) {
    e.preventDefault()
    // Validamos antes de enviar
    if (!isValid()) return

    // Preparamos los datos del formulario
    const data = {
      name: values.name,
      email: values.email,
      message: values.message,
    }

    // Enviamos via POST al endpoint de API
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          alert('Mensaje enviado con exito. Nos pondremos en contacto pronto.')
          resetForm() // Limpiamos el formulario
        } else {
          alert('Error al enviar el mensaje. Intente nuevamente.')
        }
      })
      .catch(() => alert('Error de conexion. Verifique su internet.'))
  }

  return (
    <section id="contact" className="relative py-24 bg-white dark:bg-slate-900 overflow-hidden">
      {/*
        Patron de puntos decorativo
      */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99 102 241) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/*
          Header de la seccion
        */}
        <div ref={headerRef} className="text-center mb-16 scroll-reveal">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            {/*
              Icono de sobre
            */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contacto
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">Contactanos</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Cuentanos sobre tu proyecto y te enviaremos una propuesta personalizada en menos de 48 horas.
          </p>
        </div>

        {/*
          Grid de 2 columnas: info de contacto + formulario
        */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
          {/*
            Columna izquierda: informacion de contacto
          */}
          <motion.div
            className="space-y-6"
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {CONTACT_INFO.map((item) => (
              <motion.div
                key={item.label}
                variants={ITEM_VARIANTS}
                className="group flex items-center gap-5 p-5 rounded-2xl bg-slate-50/50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all duration-300"
                whileHover={{ x: 6 }}
              >
                {/*
                  Icono con gradiente
                */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} p-3.5 flex items-center justify-center flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-slate-400 font-medium">{item.label}</div>
                  <div className="text-slate-800 dark:text-slate-200 font-semibold text-lg">{item.value}</div>
                </div>
              </motion.div>
            ))}

            {/*
              Card informativa: tiempo de respuesta
            */}
            <motion.div
              variants={ITEM_VARIANTS}
              className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-100 dark:border-indigo-500/20"
            >
              <div className="flex items-center gap-3 text-indigo-700 dark:text-indigo-300 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Respuesta Rapida</span>
              </div>
              <p className="text-sm text-indigo-600/70 dark:text-indigo-400/70">
                Generalmente respondemos en menos de 24 horas habiles.
              </p>
            </motion.div>
          </motion.div>

          {/*
            Columna derecha: formulario de contacto
            Fondo semi-transparente con efecto glass
          */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800/80 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xl shadow-slate-100/50 dark:shadow-slate-900/50 backdrop-blur-sm"
            noValidate  // Desactivamos validacion nativa del browser
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/*
              Campo: nombre completo
            */}
            <FloatingInput
              label="Nombre completo"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              maxLength={100}
              placeholder="Juan Perez"
            />

            {/*
              Campo: correo electronico
            */}
            <FloatingInput
              label="Correo electronico"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              placeholder="juan@ejemplo.com"
            />

            {/*
              Campo: mensaje (textarea)
            */}
            <FloatingInput
              label="Mensaje"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.message}
              touched={touched.message}
              maxLength={1000}
              placeholder="Cuentanos sobre tu proyecto..."
              textarea
            />

            {/*
              Boton de envio con efecto de hover
              Deshabilitado si el formulario no es valido
            */}
            <motion.button
              type="submit"
              className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold overflow-hidden transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/*
                Overlay blanco que sube en hover
              */}
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Enviar Mensaje</span>
            </motion.button>

            {/*
              Texto de privacidad
            */}
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-5 text-center">
              Tus datos estan seguros. No compartiremos tu informacion con terceros.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
