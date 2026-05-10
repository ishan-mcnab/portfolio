import { useMemo } from 'react'
import { config } from '../../content.js'

const mono = '"JetBrains Mono", monospace'

function ratingNumberColor(r) {
  if (r >= 8) return '#00e676'
  if (r >= 6) return '#f5c518'
  return '#ff3d00'
}

function rankStyle(rank) {
  if (rank === 1)
    return { color: '#f5c518', fontFamily: '"Unbounded", sans-serif', fontSize: '12px' }
  if (rank === 2)
    return { color: '#aaaaaa', fontFamily: '"Unbounded", sans-serif', fontSize: '12px' }
  if (rank === 3)
    return { color: '#cd7f32', fontFamily: '"Unbounded", sans-serif', fontSize: '12px' }
  return { color: '#3a3a3a', fontFamily: mono, fontSize: '10px' }
}

function Stars({ rating }) {
  const halfStars = Math.round((rating / 2) * 2) / 2
  const slots = []
  for (let i = 0; i < 5; i++) {
    const rem = halfStars - i
    if (rem >= 1) {
      slots.push(
        <span key={i} style={{ color: '#f5c518' }}>
          ★
        </span>,
      )
    } else if (rem >= 0.5) {
      slots.push(
        <span
          key={i}
          style={{
            fontSize: '9px',
            display: 'inline-block',
            position: 'relative',
            width: '0.65em',
            verticalAlign: 'middle',
          }}
        >
          <span style={{ color: '#333' }}>☆</span>
          <span
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '50%',
              overflow: 'hidden',
              color: '#f5c518',
            }}
          >
            ★
          </span>
        </span>,
      )
    } else {
      slots.push(
        <span key={i} style={{ color: '#333' }}>
          ☆
        </span>,
      )
    }
  }
  return (
    <div style={{ fontSize: '9px', lineHeight: 1.2, marginTop: '2px' }}>{slots}</div>
  )
}

function FilmLeaderboard({ items, emptyLine1, emptyLine2 }) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => b.rating - a.rating),
    [items],
  )

  return (
    <div
      style={{
        width: '33.33%',
        borderRight: '1px solid #1a001a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 16px',
          background: '#0d000d',
          borderBottom: '1px solid #1a001a',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"Unbounded", sans-serif',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#5a5a5a',
          }}
        >
          FILMS
        </span>
        <span style={{ fontFamily: mono, fontSize: '9px', color: '#3a3a3a' }}>
          {sorted.length} rated
        </span>
      </div>
      <div
        className="cinema-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 16px',
          minHeight: 0,
        }}
      >
        {!sorted.length ? (
          <div style={{ padding: '16px' }}>
            <div style={{ fontFamily: mono, fontSize: '10px', color: '#333' }}>
              {emptyLine1}
            </div>
            <div
              style={{
                fontFamily: mono,
                fontSize: '10px',
                color: '#333',
                marginTop: '4px',
              }}
            >
              {emptyLine2}
            </div>
          </div>
        ) : (
          sorted.map((item, idx) => {
            const rank = idx + 1
            const rs = rankStyle(rank)
            return (
              <div
                key={`film-${rank}-${item.title}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 0',
                  borderBottom: '1px solid #110011',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    flexShrink: 0,
                    ...rs,
                  }}
                >
                  {rank}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontFamily: mono,
                    fontSize: '11px',
                    color: '#efefef',
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Unbounded", sans-serif',
                      fontSize: '13px',
                      color: ratingNumberColor(item.rating),
                    }}
                  >
                    {item.rating}
                  </span>
                  <Stars rating={item.rating} />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

function TvLeaderboard({ items, emptyLine1, emptyLine2 }) {
  const sorted = useMemo(
    () => [...items].sort((a, b) => b.rating - a.rating),
    [items],
  )

  return (
    <div
      style={{
        width: '33.33%',
        borderRight: '1px solid #1a001a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 16px',
          background: '#0d000d',
          borderBottom: '1px solid #1a001a',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: '"Unbounded", sans-serif',
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#5a5a5a',
          }}
        >
          TV SHOWS
        </span>
        <span style={{ fontFamily: mono, fontSize: '9px', color: '#3a3a3a' }}>
          {sorted.length} rated
        </span>
      </div>
      <div
        className="cinema-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 16px',
          minHeight: 0,
        }}
      >
        {!sorted.length ? (
          <div style={{ padding: '16px' }}>
            <div style={{ fontFamily: mono, fontSize: '10px', color: '#333' }}>
              {emptyLine1}
            </div>
            <div
              style={{
                fontFamily: mono,
                fontSize: '10px',
                color: '#333',
                marginTop: '4px',
              }}
            >
              {emptyLine2}
            </div>
          </div>
        ) : (
          sorted.map((item, idx) => {
            const rank = idx + 1
            const rs = rankStyle(rank)
            return (
              <div
                key={`tv-${rank}-${item.title}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 0',
                  borderBottom: '1px solid #110011',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    flexShrink: 0,
                    ...rs,
                  }}
                >
                  {rank}
                </div>
                <div
                  style={{
                    flex: 1,
                    fontFamily: mono,
                    fontSize: '11px',
                    color: '#efefef',
                    lineHeight: 1.4,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Unbounded", sans-serif',
                      fontSize: '13px',
                      color: ratingNumberColor(item.rating),
                    }}
                  >
                    {item.rating}
                  </span>
                  <Stars rating={item.rating} />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default function CinemaApp() {
  const cinema = config.cinema ?? { watchlist: [], rated: [] }
  const rated = cinema.rated ?? []
  const watchlist = cinema.watchlist ?? []

  const films = useMemo(
    () => rated.filter((r) => r.type === 'Film'),
    [rated],
  )
  const tvShows = useMemo(
    () => rated.filter((r) => r.type === 'TV'),
    [rated],
  )

  return (
    <>
      <style>{`
        .cinema-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .cinema-scroll::-webkit-scrollbar-thumb {
          background: #1a001a;
          border-radius: 2px;
        }
      `}</style>
      <div
        style={{
          height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'row',
          background: '#0a000f',
          overflow: 'hidden',
        }}
      >
        <FilmLeaderboard
          items={films}
          emptyLine1="No films rated yet."
          emptyLine2="Add them to content.js to display here."
        />
        <TvLeaderboard
          items={tvShows}
          emptyLine1="No shows rated yet."
          emptyLine2="Add them to content.js to display here."
        />

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 16px',
              background: '#0d000d',
              borderBottom: '1px solid #1a001a',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: '"Unbounded", sans-serif',
                fontSize: '9px',
                letterSpacing: '3px',
                color: '#5a5a5a',
              }}
            >
              WATCHLIST
            </span>
            <span style={{ fontFamily: mono, fontSize: '9px', color: '#3a3a3a' }}>
              {watchlist.length} titles
            </span>
          </div>

          <div
            className="cinema-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '8px 12px',
              minHeight: 0,
            }}
          >
            {!watchlist.length ? (
              <div style={{ padding: '16px' }}>
                <div style={{ fontFamily: mono, fontSize: '10px', color: '#333' }}>
                  Nothing in the queue.
                </div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: '10px',
                    color: '#333',
                    marginTop: '4px',
                  }}
                >
                  Add titles to content.js to display here.
                </div>
              </div>
            ) : (
              watchlist.map((item, idx) => (
                <div
                  key={`wl-${idx}-${item.title}-${item.type}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 0',
                    borderBottom: '1px solid #110011',
                  }}
                >
                  <span
                    style={{
                      fontFamily: mono,
                      fontSize: '8px',
                      background: '#1a001a',
                      color: '#9c27b0',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      flexShrink: 0,
                    }}
                  >
                    {item.type}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: mono,
                      fontSize: '11px',
                      color: '#efefef',
                      lineHeight: 1.4,
                    }}
                  >
                    {item.title}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  )
}
