import { useEffect, useState } from 'react'

const TRANSITION_MS = 500
const TRANSITION = `transform ${TRANSITION_MS / 1000}s cubic-bezier(0.34, 1.56, 0.64, 1)`

const PANEL_BASE = {
  position: 'fixed',
  bottom: '68px',
  right: '20px',
  zIndex: 300,
  width: '280px',
  background: 'rgba(16,16,16,0.95)',
  border: '1px solid #383838',
  borderRadius: '12px',
  backdropFilter: 'blur(20px)',
  padding: '14px 16px',
  transition: TRANSITION,
}

const TAB_BASE = {
  position: 'fixed',
  bottom: '68px',
  right: '20px',
  zIndex: 300,
  background: 'rgba(16,16,16,0.95)',
  border: '1px solid #383838',
  borderRadius: '8px',
  padding: '6px 14px',
  cursor: 'pointer',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '10px',
  color: '#5a5a5a',
  borderStyle: 'solid',
  transition: TRANSITION,
}

export default function Notification({ message }) {
  const [allowIntro, setAllowIntro] = useState(false)
  const [panelY, setPanelY] = useState(120)
  const [minimized, setMinimized] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setAllowIntro(true), 1500)
    return () => window.clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!allowIntro || minimized) return
    const id = window.requestAnimationFrame(() => setPanelY(0))
    return () => window.cancelAnimationFrame(id)
  }, [allowIntro, minimized])

  const handleMinimize = () => {
    setPanelY(120)
    window.setTimeout(() => {
      setMinimized(true)
    }, TRANSITION_MS)
  }

  const handleExpandFromTab = () => {
    setMinimized(false)
    setPanelY(120)
    window.requestAnimationFrame(() => setPanelY(0))
  }

  if (minimized) {
    return (
      <button
        type="button"
        onClick={handleExpandFromTab}
        style={{
          ...TAB_BASE,
          transform: allowIntro ? 'translateY(0)' : 'translateY(120px)',
        }}
      >
        1 notification ▲
      </button>
    )
  }

  return (
    <div
      style={{
        ...PANEL_BASE,
        transform: `translateY(${panelY}px)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"Unbounded", sans-serif',
            fontSize: '10px',
            color: '#ff3d00',
            letterSpacing: '2px',
          }}
        >
          IshOS
        </span>
        <button
          type="button"
          onClick={handleMinimize}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '14px',
            color: '#5a5a5a',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#efefef'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#5a5a5a'
          }}
        >
          −
        </button>
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '9px',
          color: '#3a3a3a',
          marginTop: '2px',
        }}
      >
        now
      </div>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          color: '#efefef',
          lineHeight: 1.6,
          marginTop: '8px',
        }}
      >
        {message}
      </div>
    </div>
  )
}
