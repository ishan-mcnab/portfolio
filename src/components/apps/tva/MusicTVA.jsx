import { useEffect, useState } from 'react'
import { config } from '../../../content.js'

export default function MusicTVA() {
  const [nowPlaying, setNowPlaying] = useState(null)
  const [loading, setLoading] = useState(true)

  const music = config.music ?? {
    favoriteArtists: [],
    favoriteTracks: [],
    spotifyUrl: '',
  }
  const artists = music.favoriteArtists ?? []
  const tracks = music.favoriteTracks ?? []

  useEffect(() => {
    async function fetchNowPlaying() {
      try {
        const res = await fetch('/api/spotify')
        const data = await res.json()
        setNowPlaying(data)
      } catch (e) {
        setNowPlaying(null)
      } finally {
        setLoading(false)
      }
    }
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => clearInterval(interval)
  }, [])

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
            // NOW PLAYING //
          </div>
          {loading ? (
            <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '12px',
              color: 'var(--tva-amber-dim)', padding: '20px' }}>
              // ACCESSING SPOTIFY...
            </div>
          ) : nowPlaying?.title ? (
            <div style={{
              display: 'flex', gap: '16px', alignItems: 'center',
              padding: '16px', border: '1px solid var(--tva-border)',
              background: 'var(--tva-bg3)', marginBottom: '20px',
            }}>
              {nowPlaying.albumArt && (
                <img
                  src={nowPlaying.albumArt}
                  alt="album art"
                  style={{ width: '64px', height: '64px', objectFit: 'cover',
                    border: '1px solid var(--tva-border)', flexShrink: 0 }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '9px',
                  color: 'var(--tva-amber-dim)', letterSpacing: '3px', marginBottom: '6px' }}>
                  {nowPlaying.isPlaying ? '// NOW PLAYING //' : '// LAST PLAYED //'}
                </div>
                <div style={{ fontFamily: 'var(--tva-display)', fontSize: '20px',
                  color: 'var(--tva-amber)', letterSpacing: '1px', marginBottom: '4px',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {nowPlaying.title}
                </div>
                <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '12px',
                  color: 'var(--tva-amber-dim)', marginBottom: '4px' }}>
                  {nowPlaying.artist}
                </div>
                <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px',
                  color: 'var(--tva-amber-dim)', opacity: 0.6 }}>
                  {nowPlaying.album}
                </div>
              </div>
              <a
                href={nowPlaying.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px',
                  color: 'var(--tva-amber-dim)', textDecoration: 'none',
                  border: '1px solid var(--tva-border)', padding: '4px 8px',
                  flexShrink: 0 }}
              >
                [ → OPEN ]
              </a>
            </div>
          ) : (
            <div style={{ fontFamily: 'var(--tva-mono)', fontSize: '12px',
              color: 'var(--tva-amber-dim)', padding: '20px',
              border: '1px solid var(--tva-border)', marginBottom: '20px' }}>
              // NO RECENT ACTIVITY DETECTED
            </div>
          )}
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
