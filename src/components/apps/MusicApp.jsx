import { config } from '../../content.js'

const mono = '"JetBrains Mono", monospace'

export default function MusicApp() {
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
        .music-app-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .music-app-scroll::-webkit-scrollbar-thumb {
          background: #0f2f0f;
          border-radius: 2px;
        }
      `}</style>
      <div
        style={{
          height: '100%',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0f0a',
          overflow: 'hidden',
          fontFamily: mono,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            padding: '20px',
            borderBottom: '1px solid #0f1f0f',
            background: '#060f06',
          }}
        >
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
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #0f2f0f, #1a4f1a)',
                border: '1px solid #1a3a1a',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                color: '#1db954',
              }}
            >
              ♪
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '8px',
                  letterSpacing: '3px',
                  color: '#1db954',
                  marginBottom: '6px',
                }}
              >
                NOW PLAYING
              </div>
              <div
                style={{
                  fontFamily: '"Unbounded", sans-serif',
                  fontSize: '14px',
                  color: '#5a5a5a',
                  marginBottom: '4px',
                }}
              >
                — connect spotify to display —
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: '11px',
                  color: '#3a3a3a',
                }}
              >
                spotify integration coming soon
              </div>
              <div
                style={{
                  width: '100%',
                  height: '2px',
                  background: '#1a2a1a',
                  borderRadius: '1px',
                  marginTop: '10px',
                }}
              >
                <div
                  style={{
                    width: '0%',
                    height: '100%',
                    background: '#1db954',
                    borderRadius: '1px',
                  }}
                />
              </div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: '9px',
                  color: '#3a3a3a',
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
                  color: '#3a3a3a',
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
                fontFamily: mono,
                fontSize: '10px',
                color: '#1db954',
                border: '1px solid #1a3a1a',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                background: 'transparent',
                flexShrink: 0,
                alignSelf: 'flex-start',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(29,185,84,0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
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
            borderTop: '1px solid #0f1f0f',
          }}
        >
          <div
            style={{
              width: '50%',
              borderRight: '1px solid #0f1f0f',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '14px 16px',
                background: '#060f06',
                borderBottom: '1px solid #0f1f0f',
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
                FAVORITE ARTISTS
              </span>
            </div>
            <div
              className="music-app-scroll"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '8px 16px',
                minHeight: 0,
              }}
            >
              {!artists.length ? (
                <div style={{ padding: '16px' }}>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: '10px',
                      color: '#333',
                    }}
                  >
                    No artists added yet.
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: '10px',
                      color: '#333',
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
                      borderBottom: '1px solid #0a1a0a',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: '10px',
                        color: '#3a3a3a',
                        width: '16px',
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: mono,
                        fontSize: '12px',
                        color: '#efefef',
                        minWidth: 0,
                      }}
                    >
                      {name}
                    </span>
                    <span
                      style={{
                        color: '#1db954',
                        fontSize: '12px',
                        flexShrink: 0,
                      }}
                    >
                      ♪
                    </span>
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
                background: '#060f06',
                borderBottom: '1px solid #0f1f0f',
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
                FAVORITE TRACKS
              </span>
            </div>
            <div
              className="music-app-scroll"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '8px 16px',
                minHeight: 0,
              }}
            >
              {!tracks.length ? (
                <div style={{ padding: '16px' }}>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: '10px',
                      color: '#333',
                    }}
                  >
                    No tracks added yet.
                  </div>
                  <div
                    style={{
                      fontFamily: mono,
                      fontSize: '10px',
                      color: '#333',
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
                      borderBottom: '1px solid #0a1a0a',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: mono,
                        fontSize: '10px',
                        color: '#3a3a3a',
                        width: '16px',
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontFamily: mono,
                        fontSize: '12px',
                        color: '#efefef',
                        minWidth: 0,
                      }}
                    >
                      {name}
                    </span>
                    <span
                      style={{
                        color: '#1db954',
                        fontSize: '10px',
                        flexShrink: 0,
                      }}
                    >
                      ▶
                    </span>
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
