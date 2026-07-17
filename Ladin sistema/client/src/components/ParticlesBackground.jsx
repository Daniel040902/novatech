// ============================================================
// ParticlesBackground.jsx — Fondo de particulas animadas en canvas
// ============================================================
// Renderiza un fondo espacial interactivo con:
// - Nebulosas de colores con movimiento organico
// - Estrellas pulsantes de diferentes tamanos
// - Particulas con efecto parallax al mouse
// - Anillos decorativos
// - Brillo sutil al mover el mouse
// Todo en un canvas 2D optimizado con requestAnimationFrame

import { useEffect, useRef } from 'react'

// ============================================================
// hex — Convierte color hex a rgba con opacidad
// ============================================================
function hex(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

export default function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animId
    // Posicion del mouse con interpolacion suave
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    let time = 0

    // ============================================================
    // resize — Ajusta el canvas al tamano de la ventana
    // ============================================================
    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Helpers para obtener dimensiones actuales
    const W = () => canvas.width
    const H = () => canvas.height

    // ============================================================
    // CREACION DE TODAS LAS PARTICULAS Y ELEMENTOS
    // ============================================================

    // Nebulosas: manchas de color grandes y suaves
    const nebulas = Array.from({ length: 7 }, () => ({
      x: Math.random(), y: Math.random(),
      rx: 0.2 + Math.random() * 0.3,       // Radio X (relativo al viewport)
      ry: 0.12 + Math.random() * 0.25,      // Radio Y
      rot: Math.random() * Math.PI * 2,     // Rotacion inicial
      rotV: (Math.random() - 0.5) * 0.0005, // Velocidad de rotacion
      vx: (Math.random() - 0.5) * 0.0001,   // Velocidad X
      vy: (Math.random() - 0.5) * 0.0001,   // Velocidad Y
      color: ['#3b82f6', '#4f46e5', '#6d28d9', '#0891b2', '#6366f1', '#7c3aed', '#2563eb'][Math.floor(Math.random() * 7)],
      a: 0.08 + Math.random() * 0.1,        // Opacidad base
      ps: 0.08 + Math.random() * 0.15,      // Velocidad de pulso
    }))

    // Estrellas pequenas con parpadeo
    const stars = Array.from(
      { length: Math.min(300, Math.floor((innerWidth * innerHeight) / 4000)) },
      () => ({
        x: Math.random(), y: Math.random(),
        r: 0.2 + Math.random() * 2,          // Radio
        a: 0.2 + Math.random() * 0.8,         // Opacidad base
        sp: 0.15 + Math.random() * 3,         // Velocidad de parpadeo
        ph: Math.random() * Math.PI * 2,      // Fase
      })
    )

    // Estrellas brillantes con efecto glare
    const brightStars = Array.from({ length: 18 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 1.5 + Math.random() * 3,
      a: 0.5 + Math.random() * 0.5,
      sp: 0.08 + Math.random() * 0.2,
      ph: Math.random() * Math.PI * 2,
    }))

    // Anillos decorativos
    const rings = Array.from({ length: 3 }, (_, i) => ({
      r: 0.2 + i * 0.08 + Math.random() * 0.05,     // Radio
      width: 0.4 + Math.random() * 0.6,               // Grosor
      a: 0.015 + Math.random() * 0.015,               // Opacidad
      sp: (Math.random() - 0.5) * 0.003,              // Velocidad de rotacion
      ph: Math.random() * Math.PI * 2,                // Fase
      dash: Math.random() > 0.5,                      // Si es punteado
    }))

    // Particulares de diferentes capas con colores indigo/purpura
    const layers = [
      { count: 35, s: [0.5, 1.5], a: [0.12, 0.35], sp: 0.0003, p: 0.01, c: '#818cf8' },
      { count: 45, s: [1.0, 3.0], a: [0.15, 0.45], sp: 0.0006, p: 0.025, c: '#6366f1' },
      { count: 30, s: [1.5, 4.5], a: [0.1, 0.3], sp: 0.001, p: 0.04, c: '#a78bfa' },
    ]
    const particles = layers.map((cfg) =>
      Array.from({ length: cfg.count }, () => ({
        x: Math.random(), y: Math.random(),
        r: cfg.s[0] + Math.random() * (cfg.s[1] - cfg.s[0]), // Radio
        a: cfg.a[0] + Math.random() * (cfg.a[1] - cfg.a[0]), // Opacidad
        vx: (Math.random() - 0.5) * cfg.sp,  // Velocidad X
        vy: (Math.random() - 0.5) * cfg.sp,  // Velocidad Y
        p: cfg.p,  // Sensibilidad parallax
        c: cfg.c,  // Color
      }))
    )

    // Polvo espacial (puntos muy pequenos y tenues)
    const dust = Array.from(
      { length: Math.min(120, Math.floor((innerWidth * innerHeight) / 10000)) },
      () => ({
        x: Math.random(), y: Math.random(),
        r: 0.3 + Math.random() * 0.6,
        a: 0.02 + Math.random() * 0.05,
        vx: (Math.random() - 0.5) * 0.00008,
        vy: (Math.random() - 0.5) * 0.00008,
      })
    )

    // Glows (manchas de luz que pul san)
    const glows = Array.from({ length: 5 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.06 + Math.random() * 0.14,  // Radio (relativo)
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      c: ['#6366f1', '#8b5cf6', '#3b82f6', '#7c3aed', '#4f46e5'][Math.floor(Math.random() * 5)],
      a: 0.06 + Math.random() * 0.08,
      ps: 0.1 + Math.random() * 0.3,
    }))

    // ============================================================
    // drawGlare — Dibuja brillo en forma de cruz para estrellas
    // ============================================================
    function drawGlare(cx, cy, size, alpha) {
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(Math.PI / 4)  // Rotamos 45 grados
      ctx.globalAlpha = alpha * 0.5
      ctx.fillStyle = '#a5b4fc'
      // Barra horizontal y vertical del brillo
      ctx.fillRect(-size * 1.4, -0.4, size * 2.8, 0.8)
      ctx.fillRect(-0.4, -size * 1.4, 0.8, size * 2.8)
      // Capa exterior mas tenue
      ctx.globalAlpha = alpha * 0.2
      ctx.fillRect(-size * 2.5, -0.25, size * 5, 0.5)
      ctx.fillRect(-0.25, -size * 2.5, 0.5, size * 5)
      ctx.restore()
    }

    // ============================================================
    // animate — Loop principal de animacion
    // ============================================================
    function animate() {
      time += 0.004  // Incremento de tiempo global
      const cw = W(), ch = H()

      // Interpolacion suave de la posicion del mouse
      mouse.tx += (mouse.x - mouse.tx) * 0.04
      mouse.ty += (mouse.y - mouse.ty) * 0.04
      const mx = mouse.tx / cw
      const my = mouse.ty / ch

      // Limpiamos el canvas
      ctx.clearRect(0, 0, cw, ch)

      // ============================================================
      // Fondo gradiente oscuro con desplazamiento sutil
      // ============================================================
      const bgShiftX = Math.sin(time * 0.015) * 0.04
      const bgShiftY = Math.cos(time * 0.01) * 0.03
      const bg = ctx.createRadialGradient(
        cw * (0.5 + bgShiftX), ch * (0.35 + bgShiftY), 0,
        cw * 0.5, ch * 0.4, Math.max(cw, ch) * 0.9
      )
      bg.addColorStop(0, '#131126')
      bg.addColorStop(0.3, '#0f0a1e')
      bg.addColorStop(0.6, '#080612')
      bg.addColorStop(1, '#020108')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, cw, ch)

      // ============================================================
      // Nebulosas
      // ============================================================
      for (const n of nebulas) {
        n.x += n.vx
        n.y += n.vy
        n.rot += n.rotV
        // Wrap alrededor
        if (n.x < -n.rx) n.x = 1 + n.rx
        if (n.x > 1 + n.rx) n.x = -n.rx
        if (n.y < -n.ry) n.y = 1 + n.ry
        if (n.y > 1 + n.ry) n.y = -n.ry

        const pulse = 0.7 + Math.sin(time * n.ps) * 0.3
        const cx = n.x * cw, cy = n.y * ch
        const rx = n.rx * cw * pulse
        const ry = n.ry * ch * pulse

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(n.rot)
        // Gradiente eliptico
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.max(rx, ry))
        g.addColorStop(0, hex(n.color, n.a * 0.4))
        g.addColorStop(0.3, hex(n.color, n.a * 0.7))
        g.addColorStop(0.6, hex(n.color, n.a * 0.3))
        g.addColorStop(0.85, hex(n.color, n.a * 0.1))
        g.addColorStop(1, hex(n.color, 0))
        ctx.fillStyle = g
        ctx.fillRect(-rx, -ry, rx * 2, ry * 2)
        ctx.restore()
      }

      // ============================================================
      // Anillos decorativos
      // ============================================================
      for (const ring of rings) {
        const cx = cw * 0.5, cy = ch * 0.5
        const r = Math.min(cw, ch) * ring.r
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(time * ring.sp + ring.ph)
        ctx.globalAlpha = ring.a
        ctx.strokeStyle = '#6366f1'
        ctx.lineWidth = ring.width
        if (ring.dash) ctx.setLineDash([8, 16])
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      // ============================================================
      // Polvo espacial (dust)
      // ============================================================
      for (const d of dust) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < -0.01) d.x = 1.01
        if (d.x > 1.01) d.x = -0.01
        if (d.y < -0.01) d.y = 1.01
        if (d.y > 1.01) d.y = -0.01
        ctx.beginPath()
        ctx.arc(d.x * cw, d.y * ch, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(160,160,200,${d.a})`
        ctx.fill()
      }

      // ============================================================
      // Estrellas normales
      // ============================================================
      for (const s of stars) {
        const t = Math.sin(time * s.sp + s.ph) * 0.5 + 0.5  // 0-1
        ctx.beginPath()
        ctx.arc(s.x * cw, s.y * ch, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.a * (0.3 + t * 0.7)})`
        ctx.fill()
      }

      // ============================================================
      // Estrellas brillantes con glare
      // ============================================================
      for (const s of brightStars) {
        const t = Math.sin(time * s.sp + s.ph) * 0.5 + 0.5
        const alpha = s.a * (0.5 + t * 0.5)
        const x = s.x * cw, y = s.y * ch

        // Glow alrededor de la estrella
        const glow = ctx.createRadialGradient(x, y, 0, x, y, s.r * 8)
        glow.addColorStop(0, `rgba(160,170,255,${alpha * 0.12})`)
        glow.addColorStop(0.4, `rgba(160,170,255,${alpha * 0.04})`)
        glow.addColorStop(1, `rgba(160,170,255,0)`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, s.r * 8, 0, Math.PI * 2)
        ctx.fill()

        // Punto central
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()

        // Brillo en forma de cruz
        if (alpha > 0.35) drawGlare(x, y, s.r * 1.8, alpha)
      }

      // ============================================================
      // Particulas por capas con parallax
      // ============================================================
      for (const layer of particles) {
        for (const p of layer) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -0.01) p.x = 1.01
          if (p.x > 1.01) p.x = -0.01
          if (p.y < -0.01) p.y = 1.01
          if (p.y > 1.01) p.y = -0.01

          // Desplazamiento parallax respecto al mouse
          const ox = (mx - 0.5) * p.p * cw
          const oy = (my - 0.5) * p.p * ch
          const px = p.x * cw + ox
          const py = p.y * ch + oy

          // Glow para particulas grandes
          if (p.r > 2.5) {
            const g = ctx.createRadialGradient(px, py, 0, px, py, p.r * 3)
            g.addColorStop(0, hex(p.c, p.a * 0.2))
            g.addColorStop(1, hex(p.c, 0))
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(px, py, p.r * 3, 0, Math.PI * 2)
            ctx.fill()
          }

          // Punto central
          ctx.beginPath()
          ctx.arc(px, py, p.r, 0, Math.PI * 2)
          ctx.fillStyle = hex(p.c, p.a)
          ctx.fill()
        }
      }

      // ============================================================
      // Glows (manchas de luz pulsantes)
      // ============================================================
      for (const g of glows) {
        g.x += g.vx
        g.y += g.vy
        if (g.x < -g.r) g.x = 1 + g.r
        if (g.x > 1 + g.r) g.x = -g.r
        if (g.y < -g.r) g.y = 1 + g.r
        if (g.y > 1 + g.r) g.y = -g.r

        const pulse = 0.6 + Math.sin(time * g.ps) * 0.4
        const cx = g.x * cw, cy = g.y * ch
        const cr = g.r * cw * pulse

        const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr * 3)
        gr.addColorStop(0, hex(g.c, g.a * 0.3))
        gr.addColorStop(0.25, hex(g.c, g.a * 0.6))
        gr.addColorStop(0.5, hex(g.c, g.a * 0.2))
        gr.addColorStop(0.8, hex(g.c, g.a * 0.05))
        gr.addColorStop(1, hex(g.c, 0))
        ctx.fillStyle = gr
        ctx.beginPath()
        ctx.arc(cx, cy, cr * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // ============================================================
      // Brillo alrededor del mouse
      // ============================================================
      const cg = ctx.createRadialGradient(mouse.tx, mouse.ty, 0, mouse.tx, mouse.ty, 300)
      cg.addColorStop(0, 'rgba(99,102,241,0.05)')
      cg.addColorStop(0.4, 'rgba(99,102,241,0.02)')
      cg.addColorStop(1, 'rgba(99,102,241,0)')
      ctx.fillStyle = cg
      ctx.beginPath()
      ctx.arc(mouse.tx, mouse.ty, 300, 0, Math.PI * 2)
      ctx.fill()

      // Siguiente frame
      animId = requestAnimationFrame(animate)
    }
    animate()

    // ============================================================
    // Eventos de mouse y touch
    // ============================================================
    function onMouse(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function onTouch(e) {
      const t = e.touches[0]
      if (t) {
        mouse.x = t.clientX
        mouse.y = t.clientY
      }
    }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('touchmove', onTouch, { passive: true })

    // ============================================================
    // Limpieza al desmontar el componente
    // ============================================================
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('touchmove', onTouch)
    }
  }, []) // Solo se ejecuta una vez al montar

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
