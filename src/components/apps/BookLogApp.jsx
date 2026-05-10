import { useMemo } from 'react'
import { config } from '../../content.js'

const mono = '"JetBrains Mono", monospace'

function StarRating({ rating }) {
  if (rating === null || rating === undefined) {
    return (
      <div style={{ textAlign: 'right' }}>
        <span style={{ fontFamily: mono, fontSize: '12px', color: '#333' }}>—</span>
      </div>
    )
  }
  const r = Math.max(1, Math.min(5, Math.round(Number(rating))))
  const stars = []
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} style={{ color: i < r ? '#f5c518' : '#333', fontSize: '13px' }}>
        {i < r ? '★' : '☆'}
      </span>,
    )
  }
  return (
    <div style={{ textAlign: 'right' }}>
      <div>{stars}</div>
      <div
        style={{
          fontFamily: mono,
          fontSize: '9px',
          color: '#5a5a5a',
          marginTop: '2px',
        }}
      >
        {r}/5
      </div>
    </div>
  )
}

export default function BookLogApp() {
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
        .booklog-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .booklog-scroll::-webkit-scrollbar-thumb {
          background: #2a0028;
          border-radius: 2px;
        }
      `}</style>
      <div
        style={{
          height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0005',
          overflow: 'hidden',
          fontFamily: mono,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            padding: '20px',
            background: '#0d0008',
            borderBottom: '1px solid #1a0018',
            textAlign: 'left',
          }}
        >
          <p
            style={{
              margin: '0 0 8px 0',
              fontFamily: mono,
              fontSize: '12px',
              color: '#efefef',
            }}
          >
            No Instagram. Never had one. Probably never will.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: mono,
              fontSize: '11px',
              color: '#5a5a5a',
            }}
          >
            Here&apos;s what I&apos;m actually consuming instead:
          </p>
        </div>

        <div
          className="booklog-scroll"
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
              <div
                style={{
                  fontFamily: mono,
                  fontSize: '11px',
                  color: '#333',
                }}
              >
                No books logged yet.
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: '11px',
                  color: '#333',
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
                      fontFamily: '"Unbounded", sans-serif',
                      fontSize: '9px',
                      letterSpacing: '3px',
                      color: '#5a5a5a',
                      marginBottom: '12px',
                    }}
                  >
                    CURRENTLY READING
                  </div>
                  {reading.map((book, i) => (
                    <div
                      key={`r-${i}-${book.title}`}
                      style={{
                        background: '#110010',
                        border: '1px solid #2a0028',
                        borderRadius: '8px',
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
                              fontFamily: '"Unbounded", sans-serif',
                              fontSize: '13px',
                              color: '#efefef',
                              marginBottom: '3px',
                            }}
                          >
                            {book.title}
                          </div>
                          <div
                            style={{
                              fontFamily: mono,
                              fontSize: '10px',
                              color: '#5a5a5a',
                            }}
                          >
                            {book.author}
                          </div>
                        </div>
                        <span
                          style={{
                            fontFamily: mono,
                            fontSize: '8px',
                            letterSpacing: '2px',
                            background: '#1a0028',
                            color: '#9c27b0',
                            padding: '3px 8px',
                            borderRadius: '3px',
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
                              fontFamily: mono,
                              fontSize: '9px',
                              color: '#5a5a5a',
                            }}
                          >
                            Progress
                          </span>
                          <span
                            style={{
                              fontFamily: mono,
                              fontSize: '9px',
                              color: '#9c27b0',
                            }}
                          >
                            {book.progress}%
                          </span>
                        </div>
                        <div
                          style={{
                            height: '3px',
                            background: '#1a0018',
                            borderRadius: '2px',
                            marginTop: '4px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${Math.min(100, Math.max(0, book.progress))}%`,
                              height: '100%',
                              background:
                                'linear-gradient(90deg, #9c27b0, #ce93d8)',
                              borderRadius: '2px',
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
                    background: '#1a0018',
                    margin: '16px 0',
                  }}
                />
              )}

              {showFinished && (
                <>
                  <div
                    style={{
                      fontFamily: '"Unbounded", sans-serif',
                      fontSize: '9px',
                      letterSpacing: '3px',
                      color: '#5a5a5a',
                      marginBottom: '12px',
                    }}
                  >
                    FINISHED
                  </div>
                  {finished.map((book, i) => (
                    <div
                      key={`f-${i}-${book.title}`}
                      style={{
                        background: '#0d000d',
                        border: '1px solid #1a0018',
                        borderRadius: '8px',
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
                          background:
                            'linear-gradient(180deg, #9c27b0, #4a0080)',
                          borderRadius: '2px',
                          minHeight: '48px',
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: '"Unbounded", sans-serif',
                            fontSize: '12px',
                            color: '#efefef',
                            marginBottom: '2px',
                          }}
                        >
                          {book.title}
                        </div>
                        <div
                          style={{
                            fontFamily: mono,
                            fontSize: '10px',
                            color: '#5a5a5a',
                            marginBottom: '6px',
                          }}
                        >
                          {book.author}
                        </div>
                        {book.finished ? (
                          <div
                            style={{
                              fontFamily: mono,
                              fontSize: '9px',
                              color: '#3a3a3a',
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
