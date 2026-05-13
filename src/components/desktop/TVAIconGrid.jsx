const SECTIONS = [
  { id: 'timedoor', label: 'TIME DOOR' },
  { id: 'missminutes', label: 'MISS MINUTES' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'athletics', label: 'ATHLETICS' },
  { id: 'entertainment', label: 'ENTERTAINMENT' },
  { id: 'about', label: 'ABOUT' },
]

const strokeProps = (active) => ({
  fill: 'none',
  stroke: active ? 'var(--tva-amber)' : 'var(--tva-amber-dim)',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

function TimeDoorIcon({ active }) {
  const s = strokeProps(active)
  return (
    <svg width="72" height="72" viewBox="0 0 52 52" aria-hidden style={{ display: 'block' }}>
      <path d="M 10,48 L 10,20 Q 10,4 26,4 Q 42,4 42,20 L 42,48" {...s} />
      <line x1="10" y1="48" x2="42" y2="48" {...s} />
      <ellipse cx="26" cy="26" rx="10" ry="14" strokeDasharray="3 2" {...s} />
      <line x1="26" y1="2" x2="26" y2="6" {...s} />
      <line x1="22" y1="3" x2="20" y2="7" {...s} />
      <line x1="30" y1="3" x2="32" y2="7" {...s} />
    </svg>
  )
}

function MissMinutesIcon({ active }) {
  const s = strokeProps(active)
  const c = active ? 'var(--tva-amber)' : 'var(--tva-amber-dim)'
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const deg = -90 + i * 30
    const major = i % 3 === 0
    const len = major ? 4 : 2
    return (
      <g key={deg} transform={`rotate(${deg} 26 26)`}>
        <line x1="26" y1="6" x2="26" y2={6 + len} strokeWidth={major ? 2 : 1.5} {...s} />
      </g>
    )
  })
  return (
    <svg width="72" height="72" viewBox="0 0 52 52" aria-hidden style={{ display: 'block', color: c }}>
      <circle cx="26" cy="26" r="20" {...s} />
      {ticks}
      <circle cx="20" cy="22" r="2" fill="currentColor" stroke="none" />
      <circle cx="32" cy="22" r="2" fill="currentColor" stroke="none" />
      <path d="M 18,32 Q 26,40 34,32" {...s} />
      <line x1="26" y1="26" x2="26" y2="14" strokeWidth="2" {...s} />
      <line x1="26" y1="26" x2="36" y2="22" strokeWidth="1.5" {...s} />
    </svg>
  )
}

function ProjectsIcon({ active }) {
  const s = strokeProps(active)
  return (
    <svg width="72" height="72" viewBox="0 0 52 52" aria-hidden style={{ display: 'block' }}>
      <path d="M 6,14 L 6,44 L 46,44 L 46,14 Z" {...s} />
      <path d="M 6,14 L 6,10 L 22,10 L 26,14" {...s} />
      <path d="M 36,14 L 46,14 L 46,24 L 36,24 Z" {...s} />
      <path d="M 36,14 L 46,24" {...s} />
      <line x1="12" y1="28" x2="34" y2="28" {...s} />
      <line x1="12" y1="34" x2="30" y2="34" {...s} />
    </svg>
  )
}

function AthleticsIcon({ active }) {
  const s = strokeProps(active)
  return (
    <svg width="72" height="72" viewBox="0 0 52 52" aria-hidden style={{ display: 'block' }}>
      <circle cx="26" cy="26" r="18" {...s} />
      <path d="M 26,8 Q 18,26 26,44" {...s} />
      <path d="M 26,8 Q 34,26 26,44" {...s} />
      <line x1="8" y1="26" x2="44" y2="26" {...s} />
    </svg>
  )
}

function EntertainmentIcon({ active }) {
  const s = strokeProps(active)
  const holes = [0, 60, 120, 180, 240, 300].map((deg) => {
    const rad = (deg * Math.PI) / 180
    const cx = 26 + 14 * Math.cos(rad)
    const cy = 26 + 14 * Math.sin(rad)
    return <circle key={deg} cx={cx} cy={cy} r="2.5" {...s} />
  })
  return (
    <svg width="72" height="72" viewBox="0 0 52 52" aria-hidden style={{ display: 'block' }}>
      <circle cx="26" cy="26" r="20" {...s} />
      <circle cx="26" cy="26" r="8" {...s} />
      <circle cx="26" cy="26" r="3" {...s} />
      {holes}
      <rect x="0" y="22" width="6" height="8" rx="1" {...s} />
      <rect x="46" y="22" width="6" height="8" rx="1" {...s} />
    </svg>
  )
}

function AboutIcon({ active }) {
  const s = strokeProps(active)
  const c = active ? 'var(--tva-amber)' : 'var(--tva-amber-dim)'
  return (
    <svg width="72" height="72" viewBox="0 0 52 52" aria-hidden style={{ display: 'block', color: c }}>
      <circle cx="26" cy="26" r="20" {...s} />
      <path d="M 19,20 Q 19,12 26,12 Q 33,12 33,20 Q 33,26 26,28 L 26,32" {...s} />
      <circle cx="26" cy="38" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

const ICONS = {
  timedoor: TimeDoorIcon,
  missminutes: MissMinutesIcon,
  projects: ProjectsIcon,
  athletics: AthleticsIcon,
  entertainment: EntertainmentIcon,
  about: AboutIcon,
}

export default function TVAIconGrid({ activeSection, onSelect, onMissMinutes }) {
  return (
    <aside
      style={{
        width: '40vw',
        flexShrink: 0,
        background: 'var(--tva-bg2)',
        borderRight: '2px solid var(--tva-border)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        overflow: 'hidden',
      }}
    >
      {SECTIONS.map((sec) => {
        const active = sec.id !== 'missminutes' && activeSection === sec.id
        const Icon = ICONS[sec.id]
        return (
          <button
            key={sec.id}
            type="button"
            onClick={() =>
              sec.id === 'missminutes' ? onMissMinutes() : onSelect(sec.id)
            }
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '24px 16px',
              cursor: 'pointer',
              background: active ? 'rgba(232,101,26,0.12)' : 'transparent',
              border: active ? '1px solid var(--tva-amber)' : undefined,
              borderRight: active ? undefined : '1px solid var(--tva-border)',
              borderBottom: active ? undefined : '1px solid var(--tva-border)',
              boxSizing: 'border-box',
              transition: 'background 0.2s',
              color: 'inherit',
              font: 'inherit',
              position: 'relative',
              zIndex: active ? 2 : 0,
            }}
            onMouseEnter={(e) => {
              if (!active) e.currentTarget.style.background = 'rgba(232,101,26,0.08)'
            }}
            onMouseLeave={(e) => {
              if (!active) e.currentTarget.style.background = 'transparent'
              else e.currentTarget.style.background = 'rgba(232,101,26,0.12)'
            }}
          >
            <Icon active={active} />
            <span
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '12px',
                letterSpacing: '2px',
                textAlign: 'center',
                color: active ? 'var(--tva-amber)' : 'var(--tva-amber-dim)',
              }}
            >
              {sec.label}
            </span>
          </button>
        )
      })}
    </aside>
  )
}
