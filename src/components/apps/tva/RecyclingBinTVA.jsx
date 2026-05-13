import { config } from '../../../content.js'

export default function RecyclingBinTVA() {
  const failures = config.failures ?? []

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
        // PRUNED TIMELINE EVENTS // CLASSIFIED //
      </div>
      {failures.map((f, i) => (
        <div
          key={f.id ?? i}
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            padding: '12px 0',
            borderBottom: '1px solid var(--tva-border)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '18px',
              color: 'var(--tva-amber-dim)',
              width: '32px',
              flexShrink: 0,
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontFamily: 'var(--tva-display)',
                fontSize: '18px',
                color: 'var(--tva-amber)',
                marginBottom: '4px',
              }}
            >
              {f.title}
            </div>
            <div
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '13px',
                color: 'var(--tva-amber-dim)',
                lineHeight: 1.6,
              }}
            >
              {f.desc}
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '10px',
              color: 'var(--tva-amber-dim)',
              flexShrink: 0,
            }}
          >
            {f.year}
          </div>
        </div>
      ))}
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
          opacity: 0.5,
          marginTop: '20px',
          fontStyle: 'italic',
        }}
      >
        // PRUNED. FILED. FORGOTTEN. //
      </div>
    </div>
  )
}
