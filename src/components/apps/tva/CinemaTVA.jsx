import { useMemo } from 'react'
import { config } from '../../../content.js'

function rankStyle(rank) {
  if (rank === 1)
    return {
      color: 'var(--tva-amber)',
      fontFamily: 'var(--tva-display)',
      fontSize: '12px',
    }
  if (rank === 2 || rank === 3)
    return {
      color: 'var(--tva-amber-dim)',
      fontFamily: 'var(--tva-display)',
      fontSize: '12px',
    }
  return {
    color: 'var(--tva-amber-dim)',
    fontFamily: 'var(--tva-mono)',
    fontSize: '10px',
  }
}

function Stars({ rating }) {
  const halfStars = Math.round((rating / 2) * 2) / 2
  const slots = []
  for (let i = 0; i < 5; i++) {
    const rem = halfStars - i
    if (rem >= 1) {
      slots.push(
        <span key={i} style={{ color: 'var(--tva-amber)' }}>
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
          <span style={{ color: 'var(--tva-amber-dim)' }}>☆</span>
          <span
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '50%',
              overflow: 'hidden',
              color: 'var(--tva-amber)',
            }}
          >
            ★
          </span>
        </span>,
      )
    } else {
      slots.push(
        <span key={i} style={{ color: 'var(--tva-amber-dim)' }}>
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
        borderRight: '1px solid var(--tva-border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 16px',
          background: 'var(--tva-bg3)',
          borderBottom: '1px solid var(--tva-border)',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '9px',
            letterSpacing: '3px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          // FILMS //
        </span>
        <span style={{ fontFamily: 'var(--tva-mono)', fontSize: '9px', color: 'var(--tva-amber-dim)' }}>
          {sorted.length} rated
        </span>
      </div>
      <div
        className="tva-cinema-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 16px',
          minHeight: 0,
        }}
      >
        {!sorted.length ? (
          <div style={{ padding: '16px' }}>
            <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px', color: 'var(--tva-amber-dim)' }}>
              {emptyLine1}
            </div>
            <div
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                color: 'var(--tva-amber-dim)',
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
                  borderBottom: '1px solid var(--tva-border)',
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
                    fontFamily: 'var(--tva-mono)',
                    fontSize: '11px',
                    color: 'var(--tva-amber)',
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
                      fontFamily: 'var(--tva-display)',
                      fontSize: '13px',
                      color: 'var(--tva-amber)',
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
        borderRight: '1px solid var(--tva-border)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '14px 16px',
          background: 'var(--tva-bg3)',
          borderBottom: '1px solid var(--tva-border)',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '9px',
            letterSpacing: '3px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          // TV SHOWS //
        </span>
        <span style={{ fontFamily: 'var(--tva-mono)', fontSize: '9px', color: 'var(--tva-amber-dim)' }}>
          {sorted.length} rated
        </span>
      </div>
      <div
        className="tva-cinema-scroll"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 16px',
          minHeight: 0,
        }}
      >
        {!sorted.length ? (
          <div style={{ padding: '16px' }}>
            <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px', color: 'var(--tva-amber-dim)' }}>
              {emptyLine1}
            </div>
            <div
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                color: 'var(--tva-amber-dim)',
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
                  borderBottom: '1px solid var(--tva-border)',
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
                    fontFamily: 'var(--tva-mono)',
                    fontSize: '11px',
                    color: 'var(--tva-amber)',
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
                      fontFamily: 'var(--tva-display)',
                      fontSize: '13px',
                      color: 'var(--tva-amber)',
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

export default function CinemaTVA() {
  const cinema = config.cinema ?? { watchlist: [], rated: [] }
  const rated = cinema.rated ?? []
  const watchlist = cinema.watchlist ?? []

  const films = useMemo(() => rated.filter((r) => r.type === 'Film'), [rated])
  const tvShows = useMemo(() => rated.filter((r) => r.type === 'TV'), [rated])

  return (
    <>
      <style>{`
        .tva-cinema-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .tva-cinema-scroll::-webkit-scrollbar-thumb {
          background: var(--tva-border);
        }
      `}</style>
      <div
        style={{
          flex: 1,
          minHeight: 'min(420px, 50vh)',
          display: 'flex',
          flexDirection: 'row',
          background: 'var(--tva-bg2)',
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
              background: 'var(--tva-bg3)',
              borderBottom: '1px solid var(--tva-border)',
              flexShrink: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '9px',
                letterSpacing: '3px',
                color: 'var(--tva-amber-dim)',
              }}
            >
              // WATCHLIST //
            </span>
            <span style={{ fontFamily: 'var(--tva-mono)', fontSize: '9px', color: 'var(--tva-amber-dim)' }}>
              {watchlist.length} titles
            </span>
          </div>

          <div
            className="tva-cinema-scroll"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '8px 12px',
              minHeight: 0,
            }}
          >
            {!watchlist.length ? (
              <div style={{ padding: '16px' }}>
                <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px', color: 'var(--tva-amber-dim)' }}>
                  Nothing in the queue.
                </div>
                <div
                  style={{
                    fontFamily: 'var(--tva-mono)',
                    fontSize: '10px',
                    color: 'var(--tva-amber-dim)',
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
                    borderBottom: '1px solid var(--tva-border)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--tva-mono)',
                      fontSize: '8px',
                      border: '1px solid var(--tva-border)',
                      color: 'var(--tva-amber-dim)',
                      padding: '2px 6px',
                      flexShrink: 0,
                    }}
                  >
                    {item.type}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily: 'var(--tva-mono)',
                      fontSize: '11px',
                      color: 'var(--tva-amber)',
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
