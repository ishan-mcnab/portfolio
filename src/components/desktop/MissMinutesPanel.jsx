import { useCallback, useState } from 'react'
import { config } from '../../content.js'

const MM_ITEMS = [
  { id: 'status', label: 'STATUS' },
  { id: 'updates', label: 'UPDATES' },
  { id: 'bucket_list', label: 'BUCKET LIST' },
]

export default function MissMinutesPanel({ action, onAction, onClose }) {
  const activeId = action?.action ?? null
  const [showContact, setShowContact] = useState(false)
  const [copied, setCopied] = useState(false)
  const links = config.links ?? {}

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('mcnabtg@gmail.com')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 500,
        background: 'var(--tva-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          background: `
            repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(232,101,26,0.08) 29px, rgba(232,101,26,0.08) 30px),
            repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(232,101,26,0.08) 29px, rgba(232,101,26,0.08) 30px)
          `,
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      <header
        style={{
          flexShrink: 0,
          height: '44px',
          borderBottom: '2px solid var(--tva-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
            letterSpacing: '2px',
          }}
        >
          MISS MINUTES // TVA ASSISTANT PROGRAM
        </span>
        <button
          type="button"
          onClick={onClose}
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--tva-amber)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--tva-amber-dim)'
          }}
        >
          [ × CLOSE ]
        </button>
      </header>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          zIndex: 1,
          minHeight: 0,
        }}
      >
        <div
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '2px solid var(--tva-border)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              height: '100%',
            }}
          >
            <img
              src="/miss-minutes-tab.gif"
              alt="Miss Minutes"
              style={{
                width: '300px',
                height: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 16px rgba(232,101,26,0.5))',
              }}
            />
            <div
              style={{
                background: 'var(--tva-bg3)',
                border: '1px solid var(--tva-border-bright)',
                borderRadius: '2px',
                padding: '10px 16px',
                maxWidth: '240px',
                textAlign: 'center',
                fontFamily: 'var(--tva-mono)',
                fontSize: '12px',
                color: 'var(--tva-amber)',
                lineHeight: 1.6,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '7px solid transparent',
                  borderRight: '7px solid transparent',
                  borderBottom: '7px solid var(--tva-border-bright)',
                }}
              />
              {`There you are... Here's what you might've missed!`}
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '14px',
              letterSpacing: '4px',
              color: 'var(--tva-amber-dim)',
              marginBottom: '32px',
            }}
          >
            * MISS MINUTES
          </div>
          {MM_ITEMS.map((item) => {
            const isActive = activeId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onAction('missminutes', item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: 'var(--tva-display)',
                  fontSize: '28px',
                  color: isActive ? 'var(--tva-amber)' : 'var(--tva-amber-dim)',
                  letterSpacing: '3px',
                  padding: '14px 0',
                  paddingLeft: isActive ? '12px' : '0',
                  borderBottom: '1px solid var(--tva-border)',
                  cursor: 'pointer',
                  background: isActive ? 'rgba(232,101,26,0.1)' : 'transparent',
                  transition: 'all 0.15s',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--tva-amber)'
                    e.currentTarget.style.paddingLeft = '12px'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--tva-amber-dim)'
                    e.currentTarget.style.paddingLeft = '0'
                  }
                }}
              >
                * {item.label}
              </button>
            )
          })}

          <div
            style={{
              height: '1px',
              background: 'var(--tva-border)',
              margin: '20px 0',
            }}
          />
          <div
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '9px',
              color: 'var(--tva-amber-dim)',
              letterSpacing: '3px',
              marginBottom: '14px',
            }}
          >
            CONNECTIONS //
          </div>
          <div
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              { src: '/logos/gmail1.png', onClick: () => setShowContact(true) },
              {
                src: '/logos/spotify1.png',
                onClick: () => links.spotify && window.open(links.spotify, '_blank', 'noopener,noreferrer'),
              },
              {
                src: '/logos/linkedin1.png',
                onClick: () => links.linkedin && window.open(links.linkedin, '_blank', 'noopener,noreferrer'),
              },
              {
                src: '/logos/instagram1.webp',
                onClick: () => onAction('entertainment', 'book_log'),
              },
              {
                src: '/logos/inhabit.png',
                onClick: () => window.open('https://inhabit-app-two.vercel.app/', '_blank', 'noopener,noreferrer'),
              },
              {
                src: '/logos/tinkren.jpg',
                onClick: () => links.tinkren && window.open(links.tinkren, '_blank', 'noopener,noreferrer'),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                onClick={item.onClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    item.onClick()
                  }
                }}
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  border: '1px solid var(--tva-border)',
                  borderRadius: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--tva-amber)'
                  e.currentTarget.style.background = 'rgba(232,101,26,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(232, 101, 26, 0.3)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <img
                  src={item.src}
                  alt=""
                  style={{
                    width: '26px',
                    height: '26px',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '48px',
              color: 'var(--tva-amber)',
              opacity: 0.15,
              position: 'absolute',
              bottom: '20px',
              right: '30px',
              pointerEvents: 'none',
            }}
          >
            TVA
          </div>
        </div>
      </div>

      <footer
        style={{
          flexShrink: 0,
          height: '32px',
          borderTop: '1px solid var(--tva-border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          04.12.1985
        </span>
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          {`44.03'N\\87.95'W`}
        </span>
      </footer>

      {showContact ? (
        <div
          role="presentation"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 701,
            background: 'rgba(6,13,15,0.92)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowContact(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--tva-bg2)',
              border: '2px solid var(--tva-amber)',
              padding: '32px 40px',
              minWidth: '320px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                color: 'var(--tva-amber-dim)',
                letterSpacing: '3px',
                marginBottom: '16px',
              }}
            >
              // OPEN CHANNEL //
            </div>
            <div
              style={{
                fontFamily: 'var(--tva-display)',
                fontSize: '24px',
                color: 'var(--tva-amber)',
                marginBottom: '12px',
              }}
            >
              Always open for a convo.
            </div>
            <button
              type="button"
              onClick={copyEmail}
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '14px',
                color: 'var(--tva-amber)',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
            >
              mcnabtg@gmail.com
            </button>
            <div
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '9px',
                color: 'var(--tva-amber-dim)',
                marginTop: '4px',
              }}
            >
              {copied ? '[ COPIED ✓ ]' : '[ CLICK TO COPY ]'}
            </div>
            <button
              type="button"
              onClick={() => setShowContact(false)}
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                color: 'var(--tva-amber-dim)',
                cursor: 'pointer',
                marginTop: '20px',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
            >
              [ × CLOSE ]
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
