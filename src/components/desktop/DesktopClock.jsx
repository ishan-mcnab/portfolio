import { useEffect, useState } from 'react'

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function pad2(n) {
  return String(n).padStart(2, '0')
}

function formatTime(d) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`
}

function formatAmbientDate(d) {
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`
}

export default function DesktopClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        right: '80px',
        transform: 'translateY(-50%)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontFamily: '"Unbounded", sans-serif',
          fontSize: '64px',
          color: 'rgba(255,255,255,0.04)',
          letterSpacing: '4px',
          lineHeight: 1,
          textAlign: 'right',
        }}
      >
        {formatTime(now)}
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
          color: 'rgba(255,255,255,0.03)',
          letterSpacing: '3px',
          textAlign: 'right',
          marginTop: '8px',
        }}
      >
        {formatAmbientDate(now)}
      </div>
    </div>
  )
}
