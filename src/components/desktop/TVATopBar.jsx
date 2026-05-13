import { useEffect, useState } from 'react'

function pad2(n) {
  return String(n).padStart(2, '0')
}

function formatClock(d) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

export default function TVATopBar() {
  const [clock, setClock] = useState(() => formatClock(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatClock(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <header
      style={{
        height: '36px',
        flexShrink: 0,
        background: 'var(--tva-bg2)',
        borderBottom: '2px solid var(--tva-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '0 4px' }}>
        <span
          style={{
            fontFamily: 'var(--tva-display)',
            fontSize: '22px',
            color: 'var(--tva-amber)',
            letterSpacing: '4px',
          }}
        >
          TVA
        </span>
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
            letterSpacing: '2px',
            marginLeft: '10px',
          }}
        >
          // TEMPAD OS // TIME VARIANCE AUTHORITY
        </span>
      </div>
      <span
        className="tva-glow"
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '12px',
          color: 'var(--tva-amber)',
          letterSpacing: '2px',
        }}
      >
        {clock}
      </span>
    </header>
  )
}
