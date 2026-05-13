export default function CRTOverlay() {
  return (
    <>
      {/* Flicker layer */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9997,
        pointerEvents: 'none',
        animation: 'crtFlicker 8s step-end infinite',
        background: 'transparent',
      }} />

      {/* Horizontal scan drift line */}
      <div style={{
        position: 'fixed',
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(232,101,26,0.06)',
        zIndex: 9997,
        pointerEvents: 'none',
        animation: 'scanDrift 6s linear infinite',
      }} />

      {/* RGB shift on edges */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9996,
        pointerEvents: 'none',
        background: `
          radial-gradient(ellipse at center,
            transparent 60%,
            rgba(0,0,0,0.35) 100%
          )
        `,
      }} />

      {/* Subtle noise texture via repeating gradient */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9995,
        pointerEvents: 'none',
        opacity: 0.025,
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(232,101,26,0.3) 2px,
            rgba(232,101,26,0.3) 3px
          )
        `,
        animation: 'staticNoise 0.15s steps(1) infinite',
      }} />
    </>
  )
}
