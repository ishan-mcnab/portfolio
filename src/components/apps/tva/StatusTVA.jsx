import { config } from '../../../content.js'

export default function StatusTVA() {
  const raw = config.status?.text
  const text = typeof raw === 'string' ? raw.trim() : ''
  const hasText = text.length > 0

  return (
    <div style={{ padding: '8px', overflowY: 'auto', height: '100%' }}>
      <style>{`
        @keyframes tva-status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .tva-status-dot {
          animation: tva-status-pulse 1.2s ease-in-out infinite;
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
        // VARIANT STATUS // CURRENT OPERATIONS //
      </div>

      <div
        style={{
          border: '1px solid var(--tva-amber)',
          padding: '24px',
          marginBottom: '28px',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '9px',
            color: 'var(--tva-amber-dim)',
            letterSpacing: '3px',
            marginBottom: '16px',
          }}
        >
          CURRENT STATUS
        </div>
        {hasText ? (
          <div
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '16px',
              color: 'var(--tva-amber)',
              lineHeight: 2,
              whiteSpace: 'pre-line',
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
            // NO STATUS SET // UPDATE content.js TO ADD STATUS //
          </div>
        )}
        <div
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '9px',
            color: 'var(--tva-amber-dim)',
            opacity: 0.5,
            position: 'absolute',
            bottom: '10px',
            right: '14px',
          }}
        >
          TVA // LIVE
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          className="tva-status-dot"
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--tva-amber)',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          STATUS ACTIVE // LAST UPDATED: content.js
        </span>
      </div>
    </div>
  )
}
