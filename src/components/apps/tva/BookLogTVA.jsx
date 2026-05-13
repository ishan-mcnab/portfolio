import { useMemo } from 'react'
import { config } from '../../../content.js'

function StarRating({ rating }) {
  if (rating === null || rating === undefined) {
    return (
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontFamily: 'var(--tva-mono)', fontSize: '12px', color: 'var(--tva-amber-dim)' }}>—</span>
      </div>
    )
  }
  const r = Math.max(1, Math.min(5, Math.round(Number(rating))))
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} style={{ color: i < r ? 'var(--tva-amber)' : 'var(--tva-amber-dim)', fontSize: '13px' }}>
        {i < r ? '★' : '☆'}
      </span>,
    )
  }
  return (
    <div style={{ textAlign: 'right' }}>
      <div>{stars}</div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '9px',
          color: 'var(--tva-amber-dim)',
          marginTop: '2px',
        }}
      >
        {r}/5
      </div>
    </div>
  )
}

export default function BookLogTVA() {
  const books = config.books ?? []

  const { reading, finished } = useMemo(() => {
    const r = books.filter((b) => b.status === 'reading')
    const f = books.filter((b) => b.status === 'finished')
    return { reading: r, finished: [...f].reverse() }
  }, [books])

  const showReading = reading.length > 0
  const showFinished = finished.length > 0
  const emptyAll = books.length === 0

  return (
    <>
      <style>{`
        .tva-booklog-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .tva-booklog-scroll::-webkit-scrollbar-thumb {
          background: var(--tva-border);
        }
      `}</style>
      <div
        style={{
          flex: 1,
          minHeight: 'min(420px, 50vh)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--tva-bg2)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flexShrink: 0,
            padding: '20px',
            background: 'var(--tva-bg3)',
            borderBottom: '1px solid var(--tva-border)',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              margin: '0 0 8px 0',
              fontFamily: 'var(--tva-display)',
              fontSize: '18px',
              color: 'var(--tva-amber)',
            }}
          >
            No Instagram. Never had one. Probably never will.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--tva-mono)',
              fontSize: '11px',
              color: 'var(--tva-amber-dim)',
              marginBottom: '20px',
            }}
          >
            Here&apos;s what I&apos;m actually consuming instead:
          </p>
        </div>

        <div
          className="tva-booklog-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            minHeight: 0,
            ...(emptyAll
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : {}),
          }}
        >
          {emptyAll ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '11px', color: 'var(--tva-amber-dim)' }}>
                No books logged yet.
              </div>
              <div
                style={{
                  fontFamily: 'var(--tva-mono)',
                  fontSize: '11px',
                  color: 'var(--tva-amber-dim)',
                  marginTop: '4px',
                }}
              >
                Add them to content.js
              </div>
            </div>
          ) : (
            <>
              {showReading && (
                <>
                  <div
                    style={{
                      fontFamily: 'var(--tva-mono)',
                      fontSize: '9px',
                      letterSpacing: '3px',
                      color: 'var(--tva-amber-dim)',
                      marginBottom: '12px',
                    }}
                  >
                    // CURRENTLY READING //
                  </div>
                  {reading.map((book, i) => (
                    <div
                      key={`r-${i}-${book.title}`}
                      style={{
                        background: 'var(--tva-bg2)',
                        border: '1px solid var(--tva-border)',
                        padding: '14px 16px',
                        marginBottom: '10px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontFamily: 'var(--tva-display)',
                              fontSize: '13px',
                              color: 'var(--tva-amber)',
                              marginBottom: '3px',
                            }}
                          >
                            {book.title}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--tva-mono)',
                              fontSize: '10px',
                              color: 'var(--tva-amber-dim)',
                            }}
                          >
                            {book.author}
                          </div>
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--tva-mono)',
                            fontSize: '8px',
                            letterSpacing: '2px',
                            border: '1px solid var(--tva-amber)',
                            color: 'var(--tva-amber)',
                            padding: '3px 8px',
                            flexShrink: 0,
                          }}
                        >
                          READING
                        </span>
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--tva-mono)',
                              fontSize: '9px',
                              color: 'var(--tva-amber-dim)',
                            }}
                          >
                            Progress
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--tva-mono)',
                              fontSize: '9px',
                              color: 'var(--tva-amber)',
                            }}
                          >
                            {book.progress}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: '3px',
                            background: 'var(--tva-bg3)',
                            marginTop: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.min(100, Math.max(0, book.progress))}%`,
                              height: '100%',
                              background: 'var(--tva-amber)',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {showReading && showFinished && (
                <div
                  style={{
                    height: '1px',
                    background: 'var(--tva-border)',
                    margin: '16px 0',
                  }}
                />
              )}

              {showFinished && (
                <>
                  <div
                    style={{
                      fontFamily: 'var(--tva-mono)',
                      fontSize: '9px',
                      letterSpacing: '3px',
                      color: 'var(--tva-amber-dim)',
                      marginBottom: '12px',
                    }}
                  >
                    // FINISHED //
                  </div>
                  {finished.map((book, i) => (
                    <div
                      key={`f-${i}-${book.title}`}
                      style={{
                        background: 'var(--tva-bg2)',
                        border: '1px solid var(--tva-border)',
                        padding: '14px 16px',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <div
                        style={{
                          width: '4px',
                          alignSelf: 'stretch',
                          flexShrink: 0,
                          background: 'var(--tva-amber-dim)',
                          minHeight: '48px',
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: 'var(--tva-display)',
                            fontSize: '12px',
                            color: 'var(--tva-amber)',
                            marginBottom: '2px',
                          }}
                        >
                          {book.title}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--tva-mono)',
                            fontSize: '10px',
                            color: 'var(--tva-amber-dim)',
                            marginBottom: '6px',
                          }}
                        >
                          {book.author}
                        </div>
                        {book.finished ? (
                          <div
                            style={{
                              fontFamily: 'var(--tva-mono)',
                              fontSize: '9px',
                              color: 'var(--tva-amber-dim)',
                            }}
                          >
                            Finished {book.finished}
                          </div>
                        ) : null}
                      </div>
                      <StarRating rating={book.rating} />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
