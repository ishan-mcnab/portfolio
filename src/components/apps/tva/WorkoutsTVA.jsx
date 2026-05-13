import { useMemo } from 'react'
import { config } from '../../../content.js'

function todayWorkoutIndex() {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
}

export default function WorkoutsTVA() {
  const workouts = config.athletics?.workouts ?? []
  const todayIdx = todayWorkoutIndex()
  const today = workouts[todayIdx]

  const rows = useMemo(() => workouts.map((w, i) => ({ ...w, i })), [workouts])

  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
          letterSpacing: '3px',
          marginBottom: '20px',
        }}
      >
        // PHYSICAL CONDITIONING PROGRAM //
      </div>

      {today ? (
        <div
          style={{
            border: '1px solid var(--tva-amber)',
            padding: '16px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '9px',
              color: 'var(--tva-amber-dim)',
              marginBottom: '6px',
            }}
          >
            TODAY //
          </div>
          <div
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '24px',
              color: 'var(--tva-amber)',
            }}
          >
            {today.day} — {today.type}
          </div>
          <ul style={{ margin: '12px 0 0 0', padding: 0, listStyle: 'none' }}>
            {(today.exercises ?? []).map((ex, j) => (
              <li
                key={j}
                style={{
                  fontFamily: 'var(--tva-mono)',
                  fontSize: '11px',
                  color: 'var(--tva-amber)',
                  lineHeight: 2,
                }}
              >
                → {ex}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '9px',
          color: 'var(--tva-amber-dim)',
          letterSpacing: '2px',
          marginBottom: '12px',
        }}
      >
        FULL PROGRAM //
      </div>
      {rows.map(({ day, type, exercises, i }) => {
        const isToday = i === todayIdx
        const c = isToday ? 'var(--tva-amber)' : 'var(--tva-amber-dim)'
        const count = exercises?.length ?? 0
        return (
          <div
            key={`${day}-${i}`}
            style={{
              display: 'flex',
              gap: '16px',
              padding: '8px 0',
              borderBottom: '1px solid var(--tva-border)',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--tva-display)',
                fontSize: '16px',
                width: '100px',
                flexShrink: 0,
                color: c,
              }}
            >
              {day}
            </div>
            <span
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '9px',
                padding: '1px 6px',
                ...(isToday
                  ? {
                      color: 'var(--tva-amber)',
                      border: '1px solid var(--tva-amber)',
                      background: 'transparent',
                    }
                  : {
                      color: 'var(--tva-bg)',
                      background: 'var(--tva-amber-dim)',
                      border: 'none',
                    }),
              }}
            >
              {type}
            </span>
            <span
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                color: c,
              }}
            >
              // {count} EXERCISES
            </span>
          </div>
        )
      })}
    </div>
  )
}
