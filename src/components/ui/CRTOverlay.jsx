import { useEffect, useRef } from 'react'

export default function CRTOverlay() {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const lastGlitchRef = useRef(0)
  const glitchActiveRef = useRef(false)
  const glitchDurationRef = useRef(0)
  const glitchStartRef = useRef(0)
  const rippleRef = useRef(null)
  const screenShakeRef = useRef({ x: 0, y: 0, active: false, start: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function drawGlitch(timestamp) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const now = timestamp
      const timeSinceLast = now - lastGlitchRef.current

      // Trigger glitch every 3-8 seconds
      if (!glitchActiveRef.current && timeSinceLast > 3000 + Math.random() * 5000) {
        glitchActiveRef.current = true
        glitchDurationRef.current = 80 + Math.random() * 180
        glitchStartRef.current = now
        lastGlitchRef.current = now

        // Occasionally trigger a screen shake ripple (30% chance)
        if (Math.random() > 0.7) {
          screenShakeRef.current = {
            active: true,
            start: now,
            duration: 300 + Math.random() * 200,
            magnitude: 4 + Math.random() * 6,
          }
          rippleRef.current = {
            x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.4,
            y: canvas.height / 2 + (Math.random() - 0.5) * canvas.height * 0.4,
            start: now,
            duration: 500 + Math.random() * 300,
            maxRadius: Math.max(canvas.width, canvas.height) * 0.6,
          }
        }
      }

      // End glitch
      if (glitchActiveRef.current && now - glitchStartRef.current > glitchDurationRef.current) {
        glitchActiveRef.current = false
      }

      // SCREEN SHAKE — moves the canvas itself
      const shake = screenShakeRef.current
      if (shake.active) {
        const shakeProgress = (now - shake.start) / shake.duration
        if (shakeProgress >= 1) {
          screenShakeRef.current = { active: false, x: 0, y: 0 }
          canvas.style.transform = 'translate(0px, 0px)'
        } else {
          const decay = 1 - shakeProgress
          const shakeX = (Math.random() - 0.5) * shake.magnitude * decay
          const shakeY = (Math.random() - 0.5) * shake.magnitude * decay
          canvas.style.transform = `translate(${shakeX}px, ${shakeY}px)`

          // Also shake the entire document body slightly
          document.body.style.transform = `translate(${shakeX * 0.4}px, ${shakeY * 0.4}px)`
        }
      } else {
        canvas.style.transform = 'translate(0px, 0px)'
        document.body.style.transform = 'translate(0px, 0px)'
      }

      // RIPPLE EFFECT — expanding ring from a point
      const ripple = rippleRef.current
      if (ripple) {
        const rippleProgress = (now - ripple.start) / ripple.duration
        if (rippleProgress >= 1) {
          rippleRef.current = null
        } else {
          const currentRadius = ripple.maxRadius * rippleProgress
          const rippleOpacity = (1 - rippleProgress) * 0.06

          const gradient = ctx.createRadialGradient(
            ripple.x, ripple.y, currentRadius * 0.85,
            ripple.x, ripple.y, currentRadius
          )
          gradient.addColorStop(0, `rgba(232, 101, 26, 0)`)
          gradient.addColorStop(0.5, `rgba(232, 101, 26, ${rippleOpacity})`)
          gradient.addColorStop(1, `rgba(232, 101, 26, 0)`)

          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, currentRadius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()

          // Second inner ring slightly behind
          const innerRadius = currentRadius * 0.75
          const gradient2 = ctx.createRadialGradient(
            ripple.x, ripple.y, innerRadius * 0.85,
            ripple.x, ripple.y, innerRadius
          )
          gradient2.addColorStop(0, `rgba(232, 101, 26, 0)`)
          gradient2.addColorStop(0.5, `rgba(232, 101, 26, ${rippleOpacity * 0.5})`)
          gradient2.addColorStop(1, `rgba(232, 101, 26, 0)`)

          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, innerRadius, 0, Math.PI * 2)
          ctx.fillStyle = gradient2
          ctx.fill()
        }
      }

      // SUBTLE GLITCH ARTIFACTS (very toned down)
      if (glitchActiveRef.current) {
        const progress = (now - glitchStartRef.current) / glitchDurationRef.current
        const intensity = Math.sin(progress * Math.PI)

        const W = canvas.width
        const H = canvas.height

        // Chromatic aberration — very subtle
        const aberrationAmount = intensity * 1.5
        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = `rgba(255, 0, 0, ${intensity * 0.008})`
        ctx.fillRect(-aberrationAmount, 0, W + aberrationAmount, H)
        ctx.fillStyle = `rgba(0, 0, 255, ${intensity * 0.008})`
        ctx.fillRect(aberrationAmount, 0, W - aberrationAmount, H)
        ctx.globalCompositeOperation = 'source-over'

        // 1-2 very faint slice lines max
        const numSlices = Math.floor(intensity * 2) + 1
        for (let i = 0; i < numSlices; i++) {
          const sliceY = Math.random() * H
          const sliceH = Math.random() * 12 + 2
          const shiftX = (Math.random() - 0.5) * intensity * 20
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * intensity * 0.04})`
          ctx.fillRect(shiftX, sliceY, W, sliceH)
        }

        // 1 misregistration line occasionally
        if (Math.random() > 0.6) {
          const lineY = Math.random() * H
          const lineW = Math.random() * W * 0.4 + W * 0.1
          const lineX = Math.random() * (W - lineW)
          ctx.fillStyle = `rgba(232, 101, 26, ${Math.random() * intensity * 0.04})`
          ctx.fillRect(lineX, lineY, lineW, 1)
        }
      }

      animRef.current = requestAnimationFrame(drawGlitch)
    }

    animRef.current = requestAnimationFrame(drawGlitch)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      document.body.style.transform = ''
      canvas.style.transform = ''
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9997,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  )
}
