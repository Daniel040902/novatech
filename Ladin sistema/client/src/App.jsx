// ============================================================
// App.jsx — Componente raiz que organiza todas las secciones
// ============================================================
// Define la estructura completa de la landing page:
// fondo de particulas -> navbar -> secciones -> footer -> flotantes

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Stats from './components/Stats'
import Timeline from './components/Timeline'
import TechStack from './components/TechStack'
import AISection from './components/AISection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import WhatsAppButton from './components/WhatsAppButton'
import ParticlesBackground from './components/ParticlesBackground'

function App() {
  return (
    <>
      {/*
        Fondo de particulas en canvas (fixed, z-index 0)
        Se renderiza detras de todo para dar efecto espacial
      */}
      <ParticlesBackground />

      {/*
        Contenedor principal con z-index relativo para estar
        sobre el fondo de particulas pero bajo modales/toasts
      */}
      <div className="relative z-10">
        {/*
          Navbar fija en la parte superior con efecto blur al scrollear
        */}
        <Navbar />

        {/*
          Main contiene todas las secciones de contenido
          Cada seccion tiene su propio id para navegacion por anclas
        */}
        <main>
          <Hero />
          <Services />
          <Stats />
          <Timeline />
          <TechStack />
          <AISection />
          <Contact />
        </main>

        {/*
          Footer con enlaces, redes sociales y copyright
        */}
        <Footer />

        {/*
          Boton flotante para volver al inicio (aparece al scrollear)
        */}
        <BackToTop />

        {/*
          Boton flotante de WhatsApp (fijo en esquina inferior izquierda)
        */}
        <WhatsAppButton />
      </div>
    </>
  )
}

export default App
