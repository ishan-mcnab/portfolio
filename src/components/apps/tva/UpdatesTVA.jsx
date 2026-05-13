import { config } from '../../../content.js'

export default function UpdatesTVA() {
  const raw = config.updates?.message
  const message = typeof raw === 'string' ? raw.trim() : ''
  const hasMessage = message.length > 0

  return (
    <div
      style={{
        padding: '8px',
        overflowY: 'auto',
        height: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
          letterSpacing: '3px',
          marginBottom: '24px',
        }}
      >
        // BROADCAST CHANNEL // LATEST UPDATE //
      </div>

      <div
        style={{
          border: '1px solid var(--tva-border)',
          padding: '20px',
          background: 'var(--tva-bg3)',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '10px',
              color: 'var(--tva-amber)',
              letterSpacing: '2px',
            }}
          >
            IshOS // BROADCAST
          </span>
          <span
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '9px',
              color: 'var(--tva-amber-dim)',
            }}
          >
            NOW
          </span>
        </div>
        <div
          style={{
            height: '1px',
            background: 'var(--tva-border)',
            marginBottom: '14px',
          }}
        />
        {hasMessage ? (
          <div
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '22px',
              color: 'var(--tva-amber)',
              lineHeight: 1.6,
              letterSpacing: '1px',
            }}
          >
            {raw}
          </div>
        ) : (
          <div
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '12px',
              color: 'var(--tva-amber-dim)',
            }}
          >
            // NO UPDATE SET // UPDATE content.js TO ADD A MESSAGE //
          </div>
        )}
      </div>

      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '9px',
          color: 'var(--tva-amber-dim)',
          letterSpacing: '3px',
          opacity: 0.5,
          marginTop: '16px',
        }}
      >
        // END BROADCAST //
      </div>

      <div
        style={{
          fontFamily: 'var(--tva-display)',
          fontSize: '64px',
          color: 'var(--tva-amber)',
          opacity: 0.06,
          position: 'absolute',
          bottom: '16px',
          right: '24px',
          pointerEvents: 'none',
          letterSpacing: '6px',
        }}
      >
        TVA
      </div>
    </div>
  )
}
