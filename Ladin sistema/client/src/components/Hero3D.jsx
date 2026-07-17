// ============================================================
// Hero3D.jsx — Componente 3D del globo terraqueo con anillos
// ============================================================
// Renderiza un globo terraqueo con textura real de la Tierra
// rodeado de anillos orbitales de puntos luminosos con efecto glow
// Optimizado para rendimiento en dispositivos moviles

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ============================================================
// OrbitalRings — Anillos orbitales alrededor del globo
// ============================================================
// Genera 3 anillos con diferentes angulos, radios y velocidades
// Cada anillo tiene: puntos principales, glow difuso y lineas de conexion

function OrbitalRings({ radius }) {
  // Referencias a los grupos de cada anillo para rotarlos en useFrame
  const refs = useRef([])
  // Angulos de rotacion acumulados para cada anillo
  const angles = useRef([0, 0, 0])

  // Configuracion de los 3 anillos: tilt, offset, dots, colores, velocidades
  const RING_CONFIGS = [
    { tilt: 0,     yOff: 0,    count: 120, rOff: 0.05, dotSize: 0.07, glowSize: 0.03, lineOp: 0.15, speed: 0.12, color: '#c7d2fe' },
    { tilt: 0.5,   yOff: 0.12, count: 80,  rOff: 0.15, dotSize: 0.04, glowSize: 0.02, lineOp: 0.07, speed: -0.08, color: '#a5b4fc' },
    { tilt: -0.35, yOff: -0.1, count: 60,  rOff: 0.25, dotSize: 0.03, glowSize: 0.02, lineOp: 0.05, speed: 0.06, color: '#818cf8' },
  ]

  // useMemo: calcula las posiciones de dots, glow y lineas una sola vez
  // Se recalcula solo si cambia el radio del globo
  const rings = useMemo(() => {
    return RING_CONFIGS.map((cfg) => {
      // Arrays para almacenar posiciones (Float32Array plano)
      const dotPos = []      // Puntos principales del anillo
      const glowPos = []     // Puntos de glow (3 por cada punto principal)
      const linePos = []     // Lineas de conexion entre puntos

      // Precalculamos cos/seno del tilt para transformar coordenadas
      const cosT = Math.cos(cfg.tilt)
      const sinT = Math.sin(cfg.tilt)

      // Generamos puntos para cada posicion del anillo
      for (let i = 0; i < cfg.count; i++) {
        // Angulo de este punto en el circulo
        const theta = (i / cfg.count) * Math.PI * 2
        // Radio base del anillo
        const baseR = radius + cfg.rOff

        // Posicion del punto en el plano XY antes del tilt
        const x = baseR * Math.cos(theta)
        const z = baseR * Math.sin(theta)
        const y = cfg.yOff

        // Aplicamos rotacion de tilt (inclinacion del anillo)
        const dy = y * cosT - z * sinT
        const dz = y * sinT + z * cosT

        // Guardamos posicion del punto principal
        dotPos.push(x, dy, dz)

        // Generamos 3 puntos de glow alrededor de cada punto (difuminado)
        for (let g = 0; g < 3; g++) {
          // Angulo con pequeno desplazamiento aleatorio
          const gt = theta + (Math.random() - 0.5) * 0.2
          // Radio con desplazamiento aleatorio
          const gr = baseR + (Math.random() - 0.5) * 0.25
          // Desplazamiento vertical aleatorio
          const gs = (Math.random() - 0.5) * 0.08

          // Posicion del glow transformada con tilt
          const gx = gr * Math.cos(gt)
          const gz = gr * Math.sin(gt)
          const gdy = (cfg.yOff + gs) * cosT - gz * sinT
          const gdz = (cfg.yOff + gs) * sinT + gz * cosT
          glowPos.push(gx, gdy, gdz)
        }

        // Linea que conecta este punto con el siguiente
        const tn = ((i + 1) / cfg.count) * Math.PI * 2
        const rn = radius + cfg.rOff
        const xn = rn * Math.cos(tn)
        const zn = rn * Math.sin(tn)
        linePos.push(x, dy, dz, xn, dy, zn)
      }

      // Generamos lineas de conexion largas (cada 5 puntos)
      for (let i = 0; i < cfg.count; i += 5) {
        const theta = (i / cfg.count) * Math.PI * 2
        const tn = ((i + 2) / cfg.count) * Math.PI * 2
        const r0 = radius + cfg.rOff
        const x0 = r0 * Math.cos(theta)
        const z0 = r0 * Math.sin(theta)
        const xn = r0 * Math.cos(tn)
        const zn = r0 * Math.sin(tn)
        const dy0 = cfg.yOff * cosT - z0 * sinT
        const dz0 = cfg.yOff * sinT + z0 * cosT
        const dyn = cfg.yOff * cosT - zn * sinT
        const dzn = cfg.yOff * sinT + zn * cosT
        linePos.push(x0, dy0, dz0, xn, dyn, dzn)
      }

      // Retornamos todos los datos como Float32Array para Three.js
      return {
        dotPos: new Float32Array(dotPos),
        glowPos: new Float32Array(glowPos),
        linePos: new Float32Array(linePos),
        dotSize: cfg.dotSize,
        glowSize: cfg.glowSize,
        lineOp: cfg.lineOp,
        speed: cfg.speed,
        color: cfg.color,
      }
    })
  }, [radius]) // Solo se recalcula si cambia radius

  // useFrame: anima cada anillo rotando a diferente velocidad
  useFrame((_, delta) => {
    rings.forEach((ring, i) => {
      // Acumulamos el angulo segun la velocidad
      angles.current[i] += delta * ring.speed
      // Rotamos el grupo del anillo en el eje Y
      if (refs.current[i]) refs.current[i].rotation.y = angles.current[i]
    })
  })

  return (
    <>
      {rings.map((ring, i) => (
        <group key={i} ref={(el) => { refs.current[i] = el }}>
          {/*
            Puntos principales del anillo
            PointsMaterial con AdditiveBlending para efecto luminoso
          */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[ring.dotPos, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={ring.dotSize}
              color={ring.color}
              transparent
              opacity={0.9}
              sizeAttenuation    // Los puntos se achican con la distancia
              blending={THREE.AdditiveBlending}  // Brillo tipo luz
              depthWrite={false} // No escribe en depth buffer (transparencia)
            />
          </points>

          {/*
            Glow difuso alrededor del anillo
            Puntos mas pequenos y transparentes
          */}
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[ring.glowPos, 3]} />
            </bufferGeometry>
            <pointsMaterial
              size={ring.glowSize}
              color={ring.color}
              transparent
              opacity={0.2}
              sizeAttenuation
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </points>

          {/*
            Lineas de conexion entre puntos del anillo
            Crea efecto de red/orbita
          */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[ring.linePos, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              color={ring.color}
              transparent
              opacity={ring.lineOp}
            />
          </lineSegments>
        </group>
      ))}
    </>
  )
}

// ============================================================
// Globe — Globo terraqueo con textura real
// ============================================================
// Renderiza una esfera con textura de la Tierra que rota lentamente
// Tamano y posicion se adaptan segun sea movil o desktop

function Globe({ isMobile }) {
  // Referencia al grupo del globo para rotacion
  const globeRef = useRef(null)
  // Angulo de rotacion acumulado
  const angleRef = useRef(0)

  // Estado para la textura de la Tierra
  const [earthMap, setEarthMap] = useState(null)

  // Cargamos la textura de la Tierra con useEffect (evita Suspense)
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/textures/earth-day.jpg', (texture) => {
      // Configuramos espacio de color sRGB para textura realista
      texture.colorSpace = THREE.SRGBColorSpace
      setEarthMap(texture)
    })
  }, [])

  // Radio del globo: mas pequeno en movil
  const globeRadius = isMobile ? 1 : 2
  // Posicion horizontal: centrado en movil, desplazado en desktop
  const groupX = isMobile ? 0 : 1.5

  // Animacion de rotacion del globo
  useFrame((_, delta) => {
    angleRef.current += delta * 0.15
    if (globeRef.current) {
      globeRef.current.rotation.y = angleRef.current
    }
  })

  return (
    <group position={[groupX, 0.2, 0]}>
      <group ref={globeRef}>
        {/*
          Esfera del globo solo se renderiza cuando la textura esta cargada
          meshBasicMaterial: no necesita luz, muestra la textura directamente
        */}
        {earthMap && (
          <mesh>
            <sphereGeometry args={[globeRadius, 64, 64]} />
            <meshBasicMaterial map={earthMap} />
          </mesh>
        )}

        {/*
          Anillos orbitales alrededor del globo
          El radio se ajusta al tamano del globo
        */}
        <OrbitalRings radius={globeRadius} />
      </group>
    </group>
  )
}

// ============================================================
// Hero3D — Componente exportado del canvas 3D
// ============================================================
// Configura el canvas de Three.js con camara adaptativa
// y renderizado transparente para superponer sobre el hero

export default function Hero3D() {
  // Deteccion de movil para ajustar tamano y camara
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  // Efecto: escucha cambios de tamano de ventana
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Configuracion de camara segun dispositivo
  const cameraPosition = isMobile ? [0, -0.5, 5] : [0, 0, 10]
  const cameraFov = isMobile ? 50 : 40

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/*
        Contenedor del canvas: posicionado absolutamente
        En movil: cuadrado de 45vw en esquina superior derecha
        En desktop: mas grande y centrado verticalmente
      */}
      <div className="absolute right-0 top-[12%] sm:top-1/2 sm:-translate-y-1/2 h-[45vw] w-[45vw] sm:h-full sm:w-[350px] lg:w-[900px] lg:h-[800px]">
        {/*
          Canvas de Three.js con fondo transparente
          dpr limitado a 1.5 para rendimiento en dispositivos
        */}
        <Canvas
          camera={{ position: cameraPosition, fov: cameraFov }}
          dpr={[1, 1.5]}          // Rango de device pixel ratio
          gl={{ antialias: true, alpha: true }}  // Antialiasing + transparencia
          style={{ background: 'transparent' }}
        >
          {/*
            Componente del globo 3D
          */}
          <Globe isMobile={isMobile} />
        </Canvas>
      </div>
    </div>
  )
}
