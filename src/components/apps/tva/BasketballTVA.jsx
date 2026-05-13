import { config } from '../../../content.js'

const STAT_KEYS = [
  { key: 'ppg', label: 'PPG' },
  { key: 'rpg', label: 'RPG' },
  { key: 'apg', label: 'APG' },
  { key: 'fg', label: 'FG%' },
  { key: 'threep', label: '3P%' },
]

export default function BasketballTVA() {
  const bb = config.athletics?.basketball ?? { status: 'offseason', stats: {} }
  const stats = bb.stats ?? {}
  const status = (bb.status ?? '').toLowerCase()

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
        // ATHLETIC PERFORMANCE FILE // BASKETBALL //
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid var(--tva-border)',
          padding: '12px 16px',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          SEASON STATUS
        </span>
        <span
          className={status === 'active' ? 'tva-glow' : undefined}
          style={{
            fontFamily: 'var(--tva-display)',
            fontSize: '18px',
            color: status === 'active' ? 'var(--tva-amber)' : 'var(--tva-amber-dim)',
            textTransform: 'uppercase',
          }}
        >
          {bb.status ?? '—'}
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1px',
          background: 'var(--tva-border)',
          border: '1px solid var(--tva-border)',
          marginBottom: '24px',
        }}
      >
        {STAT_KEYS.map(({ key, label }) => {
          const val = stats[key]
          const show = val != null && val !== ''
          return (
            <div
              key={key}
              style={{
                background: 'var(--tva-bg2)',
                padding: '16px 8px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--tva-mono)',
                  fontSize: '9px',
                  color: 'var(--tva-amber-dim)',
                  letterSpacing: '2px',
                  marginBottom: '8px',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--tva-display)',
                  fontSize: '32px',
                  color: show ? 'var(--tva-amber)' : 'var(--tva-amber-dim)',
                }}
              >
                {show ? String(val) : '—'}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
