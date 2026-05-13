import { useCallback, useState } from 'react'
import { config } from '../../../content.js'

const LOGO_STYLE = {
  width: '32px',
  height: '32px',
  objectFit: 'contain',
  flexShrink: 0,
}

const ROW_BASE = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '14px 0',
  borderBottom: '1px solid var(--tva-border)',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  background: 'transparent',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
}

export default function LinksTVA({ onOpenBookLog }) {
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
    <div style={{ padding: '8px', overflowY: 'auto', height: '100%' }}>
      <style>{`
        .tva-links-row:hover .tva-links-arrow {
          color: var(--tva-amber) !important;
        }
      `}</style>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
          letterSpacing: '3px',
          marginBottom: '24px',
        }}
      >
        // EXTERNAL CONNECTIONS // AUTHORIZED LINKS //
      </div>

      <LinkRow
        onClick={() => setShowContact(true)}
        imgSrc="/logos/gmail1.png"
        label="GMAIL"
        sublabel="mcnabtg@gmail.com"
      />
      <LinkRow
        onClick={() => links.spotify && window.open(links.spotify, '_blank', 'noopener,noreferrer')}
        imgSrc="/logos/spotify1.png"
        label="SPOTIFY"
        sublabel="Open profile"
      />
      <LinkRow
        onClick={() => links.linkedin && window.open(links.linkedin, '_blank', 'noopener,noreferrer')}
        imgSrc="/logos/linkedin1.png"
        label="LINKEDIN"
        sublabel="Professional profile"
      />
      <LinkRow
        onClick={() => onOpenBookLog?.()}
        imgSrc="/logos/instagram1.webp"
        label="BOOK LOG"
        sublabel="No Instagram. Here's what I'm reading."
      />
      <LinkRow
        onClick={() => window.open('https://inhabit-app-two.vercel.app/', '_blank', 'noopener,noreferrer')}
        imgSrc="/logos/inhabit.png"
        label="INHABIT"
        sublabel="inhabit-app-two.vercel.app"
      />
      <LinkRow
        onClick={() => links.tinkren && window.open(links.tinkren, '_blank', 'noopener,noreferrer')}
        imgSrc="/logos/tinkren.jpg"
        label="TINKREN"
        sublabel="tinkren.com"
      />

      {showContact ? (
        <div
          role="presentation"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
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

function LinkRow({ onClick, imgSrc, label, sublabel }) {
  return (
    <button
      type="button"
      className="tva-links-row"
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(232,101,26,0.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent'
      }}
      style={ROW_BASE}
    >
      <img src={imgSrc} alt="" style={LOGO_STYLE} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--tva-display)',
            fontSize: '20px',
            color: 'var(--tva-amber)',
            letterSpacing: '2px',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          {sublabel}
        </div>
      </div>
      <Arrow />
    </button>
  )
}

function Arrow() {
  return (
    <span
      className="tva-links-arrow"
      style={{
        fontFamily: 'var(--tva-mono)',
        fontSize: '12px',
        color: 'var(--tva-amber-dim)',
        flexShrink: 0,
      }}
    >
      [ → ]
    </span>
  )
}
