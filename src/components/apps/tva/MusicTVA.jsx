import { config } from '../../../content.js'

export default function MusicTVA() {
  const music = config.music ?? {
    favoriteArtists: [],
    favoriteTracks: [],
    spotifyUrl: '',
  }
  const artists = music.favoriteArtists ?? []
  const tracks = music.favoriteTracks ?? []
  const spotifyUrl = music.spotifyUrl ?? ''

  return (
    <>
      <style>{`
        .tva-music-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .tva-music-scroll::-webkit-scrollbar-thumb {
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
            borderBottom: '1px solid var(--tva-border)',
            background: 'var(--tva-bg3)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '9px',
              letterSpacing: '3px',
              color: 'var(--tva-amber-dim)',
              marginBottom: '12px',
            }}
          >
            // NOW PLAYING // SPOTIFY INTEGRATION PENDING //
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                background: 'var(--tva-bg2)',
                border: '1px solid var(--tva-border)',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                color: 'var(--tva-amber)',
              }}
            >
              ♪
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: 'var(--tva-display)',
                  fontSize: '14px',
                  color: 'var(--tva-amber-dim)',
                  marginBottom: '4px',
                }}
              >
                — connect spotify to display —
              </div>
              <div
                style={{
                  fontFamily: 'var(--tva-mono)',
                  fontSize: '11px',
                  color: 'var(--tva-amber-dim)',
                }}
              >
                spotify integration coming soon
              </div>
              <div
                style={{
                  width: '100%',
                  height: '2px',
                  background: 'var(--tva-border)',
                  marginTop: '10px',
                }}
              >
                <div
                  style={{
                    width: '0%',
                    height: '100%',
                    background: 'var(--tva-amber)',
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: 'var(--tva-mono)',
                  fontSize: '9px',
                  color: 'var(--tva-amber-dim)',
                  marginTop: '4px',
                }}
              >
                0:00 / 0:00
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  marginTop: '8px',
                  fontSize: '16px',
                  color: 'var(--tva-amber-dim)',
                }}
              >
                <span>⏮</span>
                <span>▶</span>
                <span>⏭</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (spotifyUrl) {
                  window.open(spotifyUrl, '_blank', 'noopener,noreferrer')
                }
              }}
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                color: 'var(--tva-bg)',
                border: '1px solid var(--tva-border)',
                padding: '6px 12px',
                cursor: 'pointer',
                background: 'var(--tva-amber)',
                flexShrink: 0,
                alignSelf: 'flex-start',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              Open Spotify →
            </button>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            borderTop: '1px solid var(--tva-border)',
          }}
        >
          <div
            style={{
              width: '50%',
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
                // FAVORITE ARTISTS //
              </span>
            </div>
            <div
              className="tva-music-scroll"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '8px 16px',
                minHeight: 0,
              }}
            >
              {!artists.length ? (
                <div style={{ padding: '16px' }}>
                  <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px', color: 'var(--tva-amber-dim)' }}>
                    No artists added yet.
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--tva-mono)',
                      fontSize: '10px',
                      color: 'var(--tva-amber-dim)',
                      marginTop: '4px',
                    }}
                  >
                    Add them to content.js
                  </div>
                </div>
              ) : (
                artists.map((name, i) => (
                  <div
                    key={`${i}-${name}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--tva-border)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--tva-mono)',
                        fontSize: '10px',
                        color: 'var(--tva-amber-dim)',
                        width: '16px',
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: 'var(--tva-mono)',
                        fontSize: '12px',
                        color: 'var(--tva-amber)',
                        minWidth: 0,
                      }}
                    >
                      {name}
                    </span>
                    <span style={{ color: 'var(--tva-amber)', fontSize: '12px', flexShrink: 0 }}>♪</span>
                  </div>
                ))
              )}
            </div>
          </div>

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
                // FAVORITE TRACKS //
              </span>
            </div>
            <div
              className="tva-music-scroll"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '8px 16px',
                minHeight: 0,
              }}
            >
              {!tracks.length ? (
                <div style={{ padding: '16px' }}>
                  <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px', color: 'var(--tva-amber-dim)' }}>
                    No tracks added yet.
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--tva-mono)',
                      fontSize: '10px',
                      color: 'var(--tva-amber-dim)',
                      marginTop: '4px',
                    }}
                  >
                    Add them to content.js
                  </div>
                </div>
              ) : (
                tracks.map((name, i) => (
                  <div
                    key={`${i}-${name}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--tva-border)',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--tva-mono)',
                        fontSize: '10px',
                        color: 'var(--tva-amber-dim)',
                        width: '16px',
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: 'var(--tva-mono)',
                        fontSize: '12px',
                        color: 'var(--tva-amber)',
                        minWidth: 0,
                      }}
                    >
                      {name}
                    </span>
                    <span style={{ color: 'var(--tva-amber)', fontSize: '10px', flexShrink: 0 }}>▶</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
