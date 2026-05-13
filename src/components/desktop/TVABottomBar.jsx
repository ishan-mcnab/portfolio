import { useEffect, useState } from 'react'

function pad2(n) {
  return String(n).padStart(2, '0')
}

function formatDate(d) {
  return `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`
}

function randomCoord() {
  const lat = 30 + Math.random() * 20
  const lon = 70 + Math.random() * 25
  return {
    lat: lat.toFixed(2),
    lon: lon.toFixed(2),
  }
}

function drift(prev) {
  const dLat = (Math.random() - 0.5) * 0.08
  const dLon = (Math.random() - 0.5) * 0.08
  let lat = parseFloat(prev.lat) + dLat
  let lon = parseFloat(prev.lon) + dLon
  lat = Math.min(55, Math.max(25, lat))
  lon = Math.min(100, Math.max(65, lon))
  return { lat: lat.toFixed(2), lon: lon.toFixed(2) }
}

export default function TVABottomBar() {
  const [coords, setCoords] = useState(() => randomCoord())
  const [dateStr, setDateStr] = useState(() => formatDate(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => {
      setCoords((c) => drift(c))
    }, 8000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => setDateStr(formatDate(new Date())), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <footer
      style={{
        height: '32px',
        flexShrink: 0,
        background: 'var(--tva-bg2)',
        borderTop: '2px solid var(--tva-border)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
        }}
      >
        {`${coords.lat}'N\\${coords.lon}'W`}
      </span>
      <span
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
        }}
      >
        {dateStr}
      </span>
      <span
        style={{
          fontFamily: 'var(--tva-display)',
          fontSize: '18px',
          color: 'var(--tva-amber)',
          letterSpacing: '4px',
        }}
      >
        TVA
      </span>
    </footer>
  )
}
