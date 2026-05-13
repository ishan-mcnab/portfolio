import { config } from '../../../content.js'

export default function WinsLog() {
  const wins = config.wins ?? []

  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
          letterSpacing: '3px',
          marginBottom: '24px',
        }}
      >
        // CLASSIFIED ACHIEVEMENT RECORD //
      </div>
      {!wins.length ? (
        <div
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '12px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          // NO WINS LOGGED // UPDATE content.js TO ADD ENTRIES
        </div>
      ) : (
        wins.map((w, i) => (
          <div
            key={`${w.year}-${i}`}
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
              padding: '12px 0',
              borderBottom: '1px solid var(--tva-border)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--tva-display)',
                fontSize: '20px',
                color: 'var(--tva-amber-dim)',
                flexShrink: 0,
                width: '80px',
              }}
            >
              [{w.year}]
            </div>
            <div
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '15px',
                color: 'var(--tva-amber)',
                lineHeight: 1.7,
              }}
            >
              {w.text}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
