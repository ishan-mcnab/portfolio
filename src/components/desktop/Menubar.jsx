import { useEffect, useState } from 'react'

function formatTime(d) {
  let h = d.getHours()
  const m = d.getMinutes()
  const am = h >= 12 ? 'PM' : 'AM'
  h = h % 12
  if (h === 0) h = 12
  const mm = m < 10 ? `0${m}` : `${m}`
  return `${h}:${mm} ${am}`
}

export default function Menubar() {
  const [clock, setClock] = useState(() => formatTime(new Date()))
  const [dnd, setDnd] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => setClock(formatTime(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 200,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '26px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          boxSizing: 'border-box',
          background: 'rgba(8,8,8,0.92)',
          borderBottom: '1px solid #2a2a2a',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          gap: '20px',
        }}
      >
        <div
          style={{
            fontFamily: '"Unbounded", sans-serif',
            fontSize: '13px',
            color: '#ff3d00',
            letterSpacing: '3px',
            flexShrink: 0,
          }}
        >
          IshOS
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            color: '#5a5a5a',
          }}
        >
          {['File', 'View', 'Window'].map((item) => (
            <button
              key={item}
              type="button"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'default',
                color: 'inherit',
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#efefef'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#5a5a5a'
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
          }}
        >
          <span style={{ color: '#5a5a5a' }}>🔋 94%</span>
          <button
            type="button"
            onClick={() => setDnd((v) => !v)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: '#5a5a5a',
              fontSize: '14px',
              lineHeight: 1,
            }}
            aria-pressed={dnd}
          >
            🔕
          </button>
          <span style={{ color: '#efefef' }}>{clock}</span>
        </div>
      </div>
      {dnd && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '26px',
            transform: 'translateX(-50%)',
            marginTop: '4px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            padding: '6px 16px',
            color: '#efefef',
            whiteSpace: 'nowrap',
          }}
        >
          ⛔ Do Not Disturb — Building. Back when it ships.
        </div>
      )}
    </div>
  )
}
