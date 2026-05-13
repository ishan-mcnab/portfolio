import { useCallback, useEffect, useRef, useState } from 'react'

const DREAMS = [
  'Direct, produce, and/or write a short film\nand arrange the soundtrack',
  'Write and record a full-length\n9/10+ concept album',
  'Author a sci-fi, fantasy,\nand/or drama novel',
  'Direct a\nmusic video',
  'Solo travel to a country and\nphotograph a full photo album',
  'Forbes\n30 Under 30',
  'Dunk a\nbasketball',
  '1,000 lb\nclub',
]

const BG = '#060d0f'
const ROW0 = '#E8651A'
const ROW1 = '#A84010'
const BALL = '#F5923A'
const PADDLE = '#E8651A'
const AMBER = '#E8651A'
const AMBER_DIM = '#A84010'

function createBricks(canvas) {
  const bw = Math.max(24, (canvas.width - 60) / 4 - 8)
  const bh = 48
  const gap = 8
  const bricks = []
  for (let i = 0; i < 8; i++) {
    const col = i % 4
    const row = (i / 4) | 0
    bricks.push({
      x: 30 + col * (bw + gap),
      y: 40 + row * (bh + gap),
      w: bw,
      h: bh,
      alive: true,
      dream: DREAMS[i],
      color: row === 0 ? ROW0 : ROW1,
    })
  }
  return bricks
}

function relayoutBricks(canvas, prev) {
  const bw = Math.max(24, (canvas.width - 60) / 4 - 8)
  const bh = 48
  const gap = 8
  return prev.map((b, i) => {
    const col = i % 4
    const row = (i / 4) | 0
    return {
      ...b,
      x: 30 + col * (bw + gap),
      y: 40 + row * (bh + gap),
      w: bw,
      h: bh,
    }
  })
}

function fillRoundRect(ctx, x, y, w, h, rad) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath()
    ctx.roundRect(x, y, w, h, rad)
    ctx.fill()
  } else {
    ctx.fillRect(x, y, w, h)
  }
}

export default function BucketListTVA() {
  const [gamePhase, setGamePhase] = useState('start')
  const [dreamText, setDreamText] = useState('')
  const [showReveal, setShowReveal] = useState(false)
  const [, setUiNonce] = useState(0)
  const bumpUi = useCallback(() => setUiNonce((n) => n + 1), [])

  const scoreRef = useRef(0)
  const revealedRef = useRef(0)

  const gamePhaseRef = useRef(gamePhase)
  useEffect(() => {
    gamePhaseRef.current = gamePhase
  }, [gamePhase])

  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const isPausedRef = useRef(false)
  const bricksRef = useRef([])
  const ballRef = useRef({ x: 0, y: 0, r: 7, dx: 5.5, dy: -6.5 })
  const paddleRef = useRef({ x: 0, w: 100, h: 10 })
  const revealTimeoutRef = useRef(0)
  const completeTimeoutRef = useRef(0)
  const pendingCompleteRef = useRef(false)

  const resetBall = useCallback((canvas) => {
    const b = ballRef.current
    b.x = canvas.width / 2
    b.y = canvas.height * 0.75
    b.dx = 5.5
    b.dy = -6.5
  }, [])

  const syncPaddleY = useCallback((canvas) => {
    paddleRef.current.y = canvas.height - 40
  }, [])

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (const brick of bricksRef.current) {
      if (!brick.alive) continue
      ctx.fillStyle = brick.color
      ctx.fillRect(brick.x, brick.y, brick.w, brick.h)
      ctx.font = '13px "Share Tech Mono", monospace'
      ctx.fillStyle = 'rgba(0,0,0,0.4)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('▓ ▓ ▓', brick.x + brick.w / 2, brick.y + brick.h / 2)
    }

    const p = paddleRef.current
    const py = canvas.height - 40
    ctx.fillStyle = PADDLE
    const r = 5
    const px = Math.max(0, Math.min(p.x, canvas.width - p.w))
    p.x = px
    fillRoundRect(ctx, px, py, p.w, p.h, r)

    const ball = ballRef.current
    ctx.fillStyle = BALL
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  const drawComplete = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.fillStyle = BG
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const cy = canvas.height / 2
    const line1Y = cy - 16
    const line2Y = line1Y + 32
    ctx.fillStyle = AMBER
    ctx.font = '18px "VT323", monospace'
    ctx.fillText('TIMELINE FULLY REVEALED', canvas.width / 2, line1Y)
    ctx.fillStyle = AMBER_DIM
    ctx.font = '12px "Share Tech Mono", monospace'
    ctx.fillText('Thanks for playing.', canvas.width / 2, line2Y)
  }, [])

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [])

  const runLoop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || gamePhaseRef.current !== 'playing') return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ball = ballRef.current
    const paddle = paddleRef.current
    const py = canvas.height - 40

    if (!isPausedRef.current && !pendingCompleteRef.current) {
      ball.x += ball.dx
      ball.y += ball.dy

      if (ball.x - ball.r <= 0) {
        ball.x = ball.r
        ball.dx *= -1
      } else if (ball.x + ball.r >= canvas.width) {
        ball.x = canvas.width - ball.r
        ball.dx *= -1
      }

      if (ball.y - ball.r <= 0) {
        ball.y = ball.r
        ball.dy *= -1
      }

      if (
        ball.dy > 0 &&
        ball.y + ball.r >= py &&
        ball.y + ball.r <= py + paddle.h + ball.r &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.w
      ) {
        ball.dy = -Math.abs(ball.dy)
        ball.dx = ((ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2)) * 5
        ball.y = py - ball.r
      }

      if (ball.y > canvas.height + 20) {
        resetBall(canvas)
      }

      for (const brick of bricksRef.current) {
        if (!brick.alive) continue
        if (
          ball.x + ball.r > brick.x &&
          ball.x - ball.r < brick.x + brick.w &&
          ball.y + ball.r > brick.y &&
          ball.y - ball.r < brick.y + brick.h
        ) {
          brick.alive = false
          ball.dy *= -1
          if (ball.y < brick.y + brick.h / 2) {
            ball.y = brick.y - ball.r - 0.5
          } else {
            ball.y = brick.y + brick.h + ball.r + 0.5
          }

          scoreRef.current += 100
          revealedRef.current += 1
          setDreamText(brick.dream)
          setShowReveal(true)
          isPausedRef.current = true
          stopLoop()

          const allDead = bricksRef.current.every((b) => !b.alive)
          if (allDead) {
            pendingCompleteRef.current = true
          }
          bumpUi()

          window.clearTimeout(revealTimeoutRef.current)
          revealTimeoutRef.current = window.setTimeout(() => {
            setShowReveal(false)
            isPausedRef.current = false
            if (pendingCompleteRef.current) {
              pendingCompleteRef.current = false
              gamePhaseRef.current = 'complete'
              drawComplete()
              setGamePhase('complete')
              window.clearTimeout(completeTimeoutRef.current)
              completeTimeoutRef.current = window.setTimeout(() => {
                gamePhaseRef.current = 'start'
                scoreRef.current = 0
                revealedRef.current = 0
                setDreamText('')
                setShowReveal(false)
                isPausedRef.current = false
                bricksRef.current = createBricks(canvas)
                resetBall(canvas)
                syncPaddleY(canvas)
                bumpUi()
                setGamePhase('start')
              }, 3000)
            } else if (gamePhaseRef.current === 'playing') {
              rafRef.current = requestAnimationFrame(runLoop)
            }
          }, 2000)
          break
        }
      }
    }

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (const brick of bricksRef.current) {
      if (!brick.alive) continue
      ctx.fillStyle = brick.color
      ctx.fillRect(brick.x, brick.y, brick.w, brick.h)
      ctx.font = '13px "Share Tech Mono", monospace'
      ctx.fillStyle = 'rgba(0,0,0,0.4)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('▓ ▓ ▓', brick.x + brick.w / 2, brick.y + brick.h / 2)
    }

    ctx.fillStyle = PADDLE
    const pr = 5
    const px = Math.max(0, Math.min(paddle.x, canvas.width - paddle.w))
    paddle.x = px
    fillRoundRect(ctx, px, py, paddle.w, paddle.h, pr)

    ctx.fillStyle = BALL
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2)
    ctx.fill()

    if (!isPausedRef.current && gamePhaseRef.current === 'playing') {
      rafRef.current = requestAnimationFrame(runLoop)
    }
  }, [bumpUi, drawComplete, resetBall, stopLoop, syncPaddleY])

  useEffect(() => {
    const el = containerRef.current
    const canvas = canvasRef.current
    if (!el || !canvas) return

    const ro = new ResizeObserver(() => {
      const w = Math.floor(el.clientWidth)
      const h = Math.floor(el.clientHeight)
      if (w <= 0 || h <= 0) return
      canvas.width = w
      canvas.height = h
      if (bricksRef.current.length === 8) {
        bricksRef.current = relayoutBricks(canvas, bricksRef.current)
      }
      syncPaddleY(canvas)
      if (gamePhaseRef.current === 'playing' || gamePhaseRef.current === 'start') {
        resetBall(canvas)
      }
      if (gamePhaseRef.current === 'complete') {
        drawComplete()
      } else {
        drawFrame()
      }
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [drawComplete, drawFrame, resetBall, syncPaddleY])

  useEffect(() => {
    return () => {
      stopLoop()
      window.clearTimeout(revealTimeoutRef.current)
      window.clearTimeout(completeTimeoutRef.current)
    }
  }, [stopLoop])

  useEffect(() => {
    if (gamePhase !== 'playing') {
      stopLoop()
      return
    }
    const canvas = canvasRef.current
    if (!canvas || canvas.width === 0) return

    bricksRef.current = createBricks(canvas)
    resetBall(canvas)
    syncPaddleY(canvas)
    paddleRef.current.x = canvas.width / 2 - paddleRef.current.w / 2
    isPausedRef.current = false

    rafRef.current = requestAnimationFrame(runLoop)
    return () => {
      stopLoop()
    }
  }, [gamePhase, resetBall, runLoop, stopLoop, syncPaddleY])

  const onMouseMove = (e) => {
    const canvas = canvasRef.current
    const el = containerRef.current
    if (!canvas || !el || gamePhaseRef.current !== 'playing') return
    const rect = el.getBoundingClientRect()
    const paddle = paddleRef.current
    paddle.x = e.clientX - rect.left - paddle.w / 2
    paddle.x = Math.max(0, Math.min(paddle.x, canvas.width - paddle.w))
  }

  const launch = () => {
    window.clearTimeout(completeTimeoutRef.current)
    scoreRef.current = 0
    revealedRef.current = 0
    setDreamText('')
    setShowReveal(false)
    isPausedRef.current = false
    const canvas = canvasRef.current
    const el = containerRef.current
    if (canvas && el) {
      canvas.width = Math.floor(el.clientWidth)
      canvas.height = Math.floor(el.clientHeight)
      bricksRef.current = createBricks(canvas)
      resetBall(canvas)
      syncPaddleY(canvas)
      paddleRef.current.x = canvas.width / 2 - paddleRef.current.w / 2
    }
    bumpUi()
    gamePhaseRef.current = 'playing'
    setGamePhase('playing')
  }

  return (
    <div
      style={{
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--tva-bg)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: '12px 20px',
          background: 'var(--tva-bg2)',
          borderBottom: '1px solid var(--tva-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            letterSpacing: '3px',
            color: 'var(--tva-amber-dim)',
          }}
        >
          // VARIANT ASPIRATIONS // BREAK THE TIMELINE //
        </span>
        <span
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            color: 'var(--tva-amber-dim)',
            flexShrink: 0,
          }}
        >
          Dreams revealed: {revealedRef.current} / 8
        </span>
      </div>

      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        style={{
          flex: 1,
          position: 'relative',
          background: 'var(--tva-bg)',
          minHeight: 0,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />

        {gamePhase === 'start' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              background: 'var(--tva-bg)',
              zIndex: 10,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                letterSpacing: '3px',
                color: 'var(--tva-amber-dim)',
                textAlign: 'center',
              }}
            >
              // VARIANT ASPIRATIONS // BREAK THE TIMELINE //
            </span>
            <button
              type="button"
              onClick={launch}
              style={{
                background: 'var(--tva-amber)',
                color: 'var(--tva-bg)',
                border: 'none',
                padding: '10px 28px',
                fontFamily: 'var(--tva-display)',
                fontSize: '14px',
                letterSpacing: '3px',
                borderRadius: 0,
                cursor: 'pointer',
              }}
            >
              LAUNCH ▶
            </button>
            <span
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                color: 'var(--tva-amber-dim)',
                textAlign: 'center',
              }}
            >
              Break every brick to reveal what&apos;s being chased.
            </span>
          </div>
        )}

        {showReveal && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(6,13,15,0.94)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
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
              DREAM UNLOCKED
            </span>
            <span
              style={{
                fontFamily: 'var(--tva-display)',
                fontSize: '22px',
                color: 'var(--tva-amber)',
                textAlign: 'center',
                lineHeight: 1.6,
                padding: '0 40px',
                whiteSpace: 'pre-line',
              }}
            >
              {dreamText}
            </span>
            <span style={{ fontSize: '24px', color: 'var(--tva-amber-bright)' }}>✓</span>
          </div>
        )}
      </div>

      <div
        style={{
          flexShrink: 0,
          padding: '8px 20px',
          background: 'var(--tva-bg2)',
          borderTop: '1px solid var(--tva-border)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px', color: 'var(--tva-amber-dim)' }}>
          Score: {scoreRef.current}
        </span>
        <span style={{ fontFamily: 'var(--tva-mono)', fontSize: '10px', color: 'var(--tva-amber-dim)' }}>
          Use mouse to control paddle
        </span>
      </div>
    </div>
  )
}
