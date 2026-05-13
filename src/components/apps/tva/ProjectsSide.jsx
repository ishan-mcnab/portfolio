import { useMemo } from 'react'
import { config } from '../../../content.js'

function badgeForStatus(status) {
  const s = (status ?? '').toLowerCase()
  if (s === 'in-production' || s === 'in_production')
    return { label: '[ IN PRODUCTION ]', bg: 'var(--tva-amber-dim)' }
  if (s === 'shipped') return { label: '[ SHIPPED ]', bg: 'var(--tva-amber)' }
  if (s === 'classified') return { label: '[ CLASSIFIED ]', bg: 'var(--tva-bg3)' }
  return { label: `[ ${String(status).toUpperCase()} ]`, bg: 'var(--tva-amber-dim)' }
}

export default function ProjectsSide() {
  const list = useMemo(() => {
    const all = config.projects ?? []
    return all.filter((p) => {
      const n = (p.name ?? '').toUpperCase()
      return n !== 'INHABIT' && n !== 'TINKREN'
    })
  }, [])

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
        // ACTIVE OPERATIONS // SIDE VARIANTS //
      </div>
      {!list.length ? (
        <div
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '12px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          // NO SIDE PROJECTS YET //
        </div>
      ) : (
        list.map((p, i) => {
          const badge = badgeForStatus(p.status)
          return (
            <div
              key={`${p.name}-${i}`}
              style={{
                padding: '14px 0',
                borderBottom: '1px solid var(--tva-border)',
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
                    fontFamily: 'var(--tva-display)',
                    fontSize: '24px',
                    color: 'var(--tva-amber)',
                  }}
                >
                  {p.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--tva-mono)',
                    fontSize: '9px',
                    color: 'var(--tva-bg)',
                    background: badge.bg,
                    padding: '2px 8px',
                  }}
                >
                  {badge.label}
                </span>
              </div>
              {p.desc ? (
                <div
                  style={{
                    fontFamily: 'var(--tva-mono)',
                    fontSize: '11px',
                    color: 'var(--tva-amber-dim)',
                    marginTop: '6px',
                  }}
                >
                  {p.desc}
                </div>
              ) : null}
              <div
                style={{
                  fontFamily: 'var(--tva-mono)',
                  fontSize: '10px',
                  color: 'var(--tva-amber-dim)',
                  opacity: 0.6,
                  marginTop: '4px',
                  display: 'flex',
                  gap: '20px',
                }}
              >
                {p.stack ? <span>{p.stack}</span> : null}
                {p.meta ? <span>{p.meta}</span> : null}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
