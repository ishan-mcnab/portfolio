const BLOCKS = [
  {
    name: 'TINKREN',
    tagline: 'Building quality robotics kits, without the cost barriers.',
    url: 'https://tinkren.com/',
  },
  {
    name: 'INHABIT',
    tagline: 'Making goals and habits automatic action, not chores.',
    url: 'https://inhabit-app-two.vercel.app/',
  },
]

export default function ProjectsFeatured() {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
          letterSpacing: '3px',
          marginBottom: '28px',
        }}
      >
        // FEATURED OPERATIONS // ACTIVE VARIANTS //
      </div>
      {BLOCKS.map((b, i) => (
        <div key={b.name}>
          {i > 0 ? (
            <div
              style={{
                borderTop: '2px solid var(--tva-border)',
                margin: '28px 0',
              }}
            />
          ) : null}
          <div
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '36px',
              color: 'var(--tva-amber)',
              letterSpacing: '3px',
              marginBottom: '6px',
            }}
          >
            {b.name}
          </div>
          <div
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '10px',
              color: 'var(--tva-bg)',
              background: 'var(--tva-amber)',
              padding: '2px 8px',
              display: 'inline-block',
              marginBottom: '12px',
            }}
          >
            [ LATE PRODUCTION ]
          </div>
          <div
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '13px',
              color: 'var(--tva-amber)',
              lineHeight: 1.6,
              marginBottom: '12px',
            }}
          >
            {b.tagline}
          </div>
          <button
            type="button"
            onClick={() => window.open(b.url, '_blank', 'noopener,noreferrer')}
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '11px',
              color: 'var(--tva-amber-dim)',
              textDecoration: 'underline',
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
            {b.url}
          </button>
        </div>
      ))}
    </div>
  )
}
