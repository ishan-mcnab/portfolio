import { useEffect, useState } from 'react'

const ACTIONS = {
  timedoor: ['WINS LOG', 'RECYCLING BIN'],
  projects: ['TINKREN & INHABIT', 'SIDE PROJECTS'],
  athletics: ['BASKETBALL', 'LIFTING & WORKOUTS'],
  entertainment: ['CINEMA', 'MUSIC', 'BOOK LOG'],
  about: ['ABOUT ME', 'LINKS', 'ABOUT THIS SITE'],
}

const SECTION_LABELS = {
  timedoor: 'TIME DOOR',
  projects: 'PROJECTS',
  athletics: 'ATHLETICS',
  entertainment: 'ENTERTAINMENT',
  about: 'ABOUT',
}

function labelToActionId(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

export default function TVAActionList({ activeSection, onAction }) {
  const [blinkOn, setBlinkOn] = useState(true)

  useEffect(() => {
    const id = window.setInterval(() => setBlinkOn((v) => !v), 800)
    return () => window.clearInterval(id)
  }, [])

  const list = activeSection ? ACTIONS[activeSection] ?? [] : []

  return (
    <section
      style={{
        flex: 1,
        background: 'var(--tva-bg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '2px solid var(--tva-border)',
        position: 'relative',
        minWidth: 0,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: '20px 24px',
          borderBottom: '1px solid var(--tva-border)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--tva-display)',
            fontSize: '28px',
            color: 'var(--tva-amber)',
          }}
        >
          ACTION LIST //
        </div>
        <div
          style={{
            fontFamily: 'var(--tva-display)',
            fontSize: '28px',
            color: 'var(--tva-amber)',
          }}
        >
          {activeSection ? SECTION_LABELS[activeSection] : 'SELECT PROGRAM'}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          position: 'relative',
          minHeight: 0,
        }}
      >
        {!activeSection ? (
          <div>
            <div
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '15px',
                color: 'var(--tva-amber-dim)',
              }}
            >
              AWAITING INPUT...
            </div>
            <span
              style={{
                display: 'inline-block',
                marginTop: '12px',
                fontFamily: 'var(--tva-mono)',
                fontSize: '15px',
                color: 'var(--tva-amber)',
                opacity: blinkOn ? 1 : 0,
                transition: 'opacity 0.1s',
              }}
            >
              █
            </span>
          </div>
        ) : (
          <>
            {list.map((actionLabel) => {
              const actionId = labelToActionId(actionLabel)
              return (
                <button
                  key={actionId}
                  type="button"
                  onClick={() => onAction(activeSection, actionId)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    fontFamily: 'var(--tva-display)',
                    fontSize: '36px',
                    color: 'var(--tva-amber-dim)',
                    letterSpacing: '2px',
                    padding: '16px 0',
                    borderBottom: '1px solid var(--tva-border)',
                    cursor: 'pointer',
                    background: 'none',
                    borderTop: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--tva-amber)'
                    e.currentTarget.style.paddingLeft = '8px'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--tva-amber-dim)'
                    e.currentTarget.style.paddingLeft = '0'
                  }}
                >
                  * {actionLabel}
                </button>
              )
            })}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                fontFamily: 'var(--tva-mono)',
                fontSize: '9px',
                color: 'var(--tva-amber-dim)',
                opacity: 0.5,
                pointerEvents: 'none',
              }}
            >
              TVA // TIME VARIANCE AUTHORITY
            </div>
          </>
        )}
      </div>
    </section>
  )
}
