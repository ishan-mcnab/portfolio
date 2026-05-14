export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env

  try {
    // Get fresh access token using refresh token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      }),
    })

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    if (!accessToken) {
      return res.status(500).json({ error: 'Failed to get access token' })
    }

    // Try currently playing first
    const currentlyPlayingRes = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    if (currentlyPlayingRes.status === 200) {
      const data = await currentlyPlayingRes.json()
      if (data && data.item) {
        return res.status(200).json({
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists.map(a => a.name).join(', '),
          album: data.item.album.name,
          albumArt: data.item.album.images[0]?.url || null,
          songUrl: data.item.external_urls.spotify,
        })
      }
    }

    // Fall back to recently played
    const recentRes = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )

    const recentData = await recentRes.json()
    const track = recentData.items?.[0]?.track

    if (track) {
      return res.status(200).json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || null,
        songUrl: track.external_urls.spotify,
      })
    }

    return res.status(200).json({ isPlaying: false, title: null })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
