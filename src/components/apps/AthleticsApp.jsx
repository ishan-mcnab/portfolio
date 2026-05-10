import { useMemo, useState } from 'react'
import { config } from '../../content.js'

const mono = '"JetBrains Mono", monospace'

function getTodayWorkoutIndex() {
  const d = new Date().getDay()
  return d === 0 ? 6 : d - 1
}

export default function AthleticsApp() {
  const athletics = config.athletics
  const basketball = athletics.basketball
  const workouts = athletics.workouts ?? []

  const todayIndex = useMemo(() => getTodayWorkoutIndex(), [])
  const [currentIndex, setCurrentIndex] = useState(todayIndex)

  const workout = workouts[currentIndex]
  const isToday = currentIndex === todayIndex

  const statusUpper = (basketball.status || '').toUpperCase()
  const isOffseason = basketball.status === 'offseason'

  const stats = basketball.stats || {}
  const statDefs = [
    { key: 'ppg', label: 'PPG' },
    { key: 'rpg', label: 'RPG' },
    { key: 'apg', label: 'APG' },
    { key: 'fg', label: 'FG%' },
    { key: 'threep', label: '3P%' },
  ]

  const isRest = workout?.type === 'Rest'
  const badgeColor = isRest ? '#ff3d00' : '#2979ff'
  const arrowColor = isRest ? '#ff3d00' : '#2979ff'

  const goPrev = () => {
    setCurrentIndex((i) => (i === 0 ? 6 : i - 1))
  }

  const goNext = () => {
    setCurrentIndex((i) => (i === 6 ? 0 : i + 1))
  }

  return (
    <>
      <style>{`
        @keyframes athletics-glitch {
          0% {
            transform: translate(2px, 0) skewX(0.5deg);
          }
          20% {
            transform: translate(-2px, 0) skewX(-0.5deg);
          }
          40% {
            transform: translate(0);
          }
          60% {
            transform: translate(3px, 1px) skewX(1deg);
          }
          80% {
            transform: translate(-1px, 0);
          }
          100% {
            transform: translate(0);
          }
        }
        .athletics-glitch-img {
          animation: athletics-glitch 4s step-end infinite;
        }
        .athletics-workout-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .athletics-workout-scroll::-webkit-scrollbar-thumb {
          background: #1a1a3a;
          border-radius: 2px;
        }
      `}</style>
      <div
        style={{
          height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'row',
          background: '#0a0a14',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '50%',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #1a1a2a',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              background: '#0d0d1a',
              borderBottom: '1px solid #1a1a2a',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: '"Unbounded", sans-serif',
                  fontSize: '9px',
                  letterSpacing: '3px',
                  color: '#5a5a5a',
                }}
              >
                SEASON STATUS
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: isOffseason ? '#ff3d00' : '#00e676',
                }}
              >
                {statusUpper}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '10px',
                flexWrap: 'wrap',
              }}
            >
              {statDefs.map(({ key, label }) => {
                const val = stats[key]
                const display =
                  val === null || val === undefined ? null : String(val)
                return (
                  <div key={key}>
                    <div
                      style={{
                        fontSize: '8px',
                        color: '#5a5a5a',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontFamily: mono,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: '16px',
                        fontFamily: '"Unbounded", sans-serif',
                        color: display ? '#efefef' : '#333',
                      }}
                    >
                      {display ?? '--'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 0,
            }}
          >
            <img
              className="athletics-glitch-img"
              src="/ishanbasketball2.JPG"
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,61,0,0.08)',
                mixBlendMode: 'overlay',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,230,118,0.04)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                background:
                  'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            padding: '16px',
          }}
        >
          <div
            style={{
              fontFamily: '"Unbounded", sans-serif',
              fontSize: '9px',
              letterSpacing: '3px',
              color: '#5a5a5a',
              marginBottom: '14px',
            }}
          >
            WORKOUT SPLIT
          </div>

          {isToday && (
            <div
              style={{
                fontFamily: '"Unbounded", sans-serif',
                fontSize: '9px',
                letterSpacing: '3px',
                color: '#00e676',
                marginBottom: '6px',
              }}
            >
              TODAY
            </div>
          )}

          <div
            className="athletics-workout-scroll"
            style={{
              background: '#101020',
              border: '1px solid #1a1a3a',
              borderRadius: '10px',
              padding: '18px',
              flex: 1,
              overflowY: 'auto',
              marginBottom: '12px',
              minHeight: 0,
            }}
          >
            {workout && (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Unbounded", sans-serif',
                      fontSize: '18px',
                      color: '#efefef',
                      letterSpacing: '1px',
                    }}
                  >
                    {workout.day}
                  </span>
                  <span
                    style={{
                      background: '#1a1a3a',
                      color: badgeColor,
                      fontSize: '9px',
                      fontFamily: mono,
                      letterSpacing: '2px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      marginLeft: '10px',
                    }}
                  >
                    {workout.type}
                  </span>
                </div>
                <div style={{ marginTop: '14px' }}>
                  {workout.exercises.map((ex, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '11px',
                        color: '#888',
                        fontFamily: mono,
                        lineHeight: 2,
                      }}
                    >
                      <span style={{ color: arrowColor }}>→ </span>
                      {ex}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              onClick={goPrev}
              style={{
                fontFamily: mono,
                fontSize: '18px',
                color: '#5a5a5a',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#efefef'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#5a5a5a'
              }}
            >
              ←
            </button>
            <span
              style={{
                fontSize: '10px',
                color: '#5a5a5a',
                fontFamily: mono,
              }}
            >
              {currentIndex + 1} / 7
            </span>
            <button
              type="button"
              onClick={goNext}
              style={{
                fontFamily: mono,
                fontSize: '18px',
                color: '#5a5a5a',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#efefef'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#5a5a5a'
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
