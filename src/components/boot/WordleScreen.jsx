import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { config } from '../../content.js'

const ROWS = 6
const COLS = 5

const FLIP_MS = 500
const STAGGER_MS = 80

const WRONG_MESSAGES = [
  'DESIGNATION INCORRECT. TRY AGAIN, VARIANT.',
  'NEGATIVE. THE SACRED TIMELINE DISAPPROVES.',
  'INCORRECT. THE TIME-KEEPERS ARE WATCHING.',
  'STILL WRONG. THIS IS YOUR FINAL WARNING.',
  'LAST CHANCE, VARIANT. DO NOT PRUNE YOURSELF.',
]

const WIN_MESSAGE = 'VARIANT CONFIRMED. CLEARANCE GRANTED.'
const INVALID_MESSAGE = 'INSUFFICIENT CHARACTERS. INPUT COMPLETE DESIGNATION.'

function emptyGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ letter: '', state: 'empty' })),
  )
}

function scoreGuess(guess, secret) {
  const guessArr = guess.split('')
  const secretArr = secret.split('')
  const result = Array(COLS).fill('absent')

  for (let i = 0; i < COLS; i++) {
    if (guessArr[i] === secretArr[i]) {
      result[i] = 'correct'
    }
  }

  const remaining = {}
  for (let i = 0; i < COLS; i++) {
    if (result[i] !== 'correct') {
      const c = secretArr[i]
      remaining[c] = (remaining[c] || 0) + 1
    }
  }

  for (let i = 0; i < COLS; i++) {
    if (result[i] === 'correct') continue
    const c = guessArr[i]
    if (remaining[c] > 0) {
      result[i] = 'present'
      remaining[c]--
    }
  }

  return result
}

const rank = { absent: 0, present: 1, correct: 2 }

function mergeKeyboard(prev, guess, results) {
  const next = { ...prev }
  for (let i = 0; i < COLS; i++) {
    const L = guess[i]
    const r = results[i]
    if (!next[L] || rank[r] > rank[next[L]]) {
      next[L] = r
    }
  }
  return next
}

const ROW1 = 'QWERTYUIOP'.split('')
const ROW2 = 'ASDFGHJKL'.split('')
const ROW3 = ['ENTER', ...'ZXCVBNM'.split(''), 'BACK']

function flipMidVars(st) {
  if (st === 'correct') {
    return {
      '--flip-mid-bg': 'var(--tva-amber)',
      '--flip-mid-border': 'var(--tva-amber)',
      '--flip-mid-color': 'var(--tva-bg)',
    }
  }
  if (st === 'present') {
    return {
      '--flip-mid-bg': 'var(--tva-amber-dim)',
      '--flip-mid-border': 'var(--tva-amber-dim)',
      '--flip-mid-color': 'var(--tva-amber-bright)',
    }
  }
  return {
    '--flip-mid-bg': 'var(--tva-bg3)',
    '--flip-mid-border': 'var(--tva-bg3)',
    '--flip-mid-color': 'var(--tva-amber-dim)',
  }
}

export default function WordleScreen({ onSuccess }) {
  const secret = useMemo(
    () => config.meta.wordle_word.toUpperCase(),
    [],
  )

  const [grid, setGrid] = useState(emptyGrid)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)
  const [keyboardColors, setKeyboardColors] = useState({})
  const [message, setMessage] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [flippingRow, setFlippingRow] = useState(null)
  const [pendingFlipResults, setPendingFlipResults] = useState(null)
  const [screenFadeOut, setScreenFadeOut] = useState(false)

  const timeoutsRef = useRef([])
  const rowAnimatingRef = useRef(false)
  const fadeExitPendingRef = useRef(false)
  const screenFadeOutRef = useRef(false)

  const pushTimeout = useCallback((fn, ms) => {
    const id = window.setTimeout(fn, ms)
    timeoutsRef.current.push(id)
    return id
  }, [])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  useEffect(() => {
    screenFadeOutRef.current = screenFadeOut
  }, [screenFadeOut])

  const flipEndDelay = (COLS - 1) * STAGGER_MS + FLIP_MS

  const completeRowAfterFlip = useCallback(
    (guess, results, rowIdx, isWin) => {
      rowAnimatingRef.current = false

      setGrid((prev) =>
        prev.map((r, ri) =>
          ri === rowIdx
            ? r.map((cell, ci) => ({
                letter: cell.letter,
                state: results[ci],
              }))
            : r.map((cell) => ({ ...cell })),
        ),
      )
      setKeyboardColors((prev) => mergeKeyboard(prev, guess, results))
      setFlippingRow(null)
      setPendingFlipResults(null)

      if (isWin) {
        setGameOver(true)
        setMessage(WIN_MESSAGE)
        fadeExitPendingRef.current = true
        pushTimeout(() => setScreenFadeOut(true), 1200)
        return
      }

      if (rowIdx === ROWS - 1) {
        setGameOver(true)
        setMessage(`DESIGNATION WAS: ${secret} // GRANTING ACCESS ANYWAY.`)
        pushTimeout(() => {
          onSuccess()
        }, 1500)
        return
      }

      setMessage(WRONG_MESSAGES[rowIdx])
      pushTimeout(() => setMessage(''), 2000)

      setCurrentRow(rowIdx + 1)
      setCurrentCol(0)
    },
    [onSuccess, pushTimeout, secret],
  )

  const submitGuess = useCallback(() => {
    if (gameOver || screenFadeOut || rowAnimatingRef.current || flippingRow !== null)
      return

    const rowIdx = currentRow
    const row = grid[rowIdx]
    const guess = row.map((c) => c.letter).join('')

    if (guess.length < COLS) {
      setIsShaking(true)
      setMessage(INVALID_MESSAGE)
      pushTimeout(() => setIsShaking(false), 400)
      pushTimeout(() => setMessage(''), 2000)
      return
    }

    const results = scoreGuess(guess, secret)
    const isWin = results.every((s) => s === 'correct')

    rowAnimatingRef.current = true
    setPendingFlipResults(results)
    setFlippingRow(rowIdx)

    pushTimeout(() => {
      completeRowAfterFlip(guess, results, rowIdx, isWin)
    }, flipEndDelay)
  }, [
    completeRowAfterFlip,
    currentRow,
    flipEndDelay,
    flippingRow,
    gameOver,
    grid,
    pushTimeout,
    screenFadeOut,
    secret,
  ])

  const addLetter = useCallback(
    (ch) => {
      if (gameOver || screenFadeOut || rowAnimatingRef.current || flippingRow !== null)
        return
      if (currentCol >= COLS) return
      setGrid((prev) =>
        prev.map((row, ri) =>
          row.map((cell, ci) => {
            if (ri !== currentRow || ci !== currentCol) return cell
            return { letter: ch, state: 'filled' }
          }),
        ),
      )
      setCurrentCol((c) => c + 1)
    },
    [currentCol, currentRow, flippingRow, gameOver, screenFadeOut],
  )

  const backspace = useCallback(() => {
    if (gameOver || screenFadeOut || rowAnimatingRef.current || flippingRow !== null)
      return
    if (currentCol === 0) return
    const col = currentCol - 1
    setGrid((prev) =>
      prev.map((row, ri) =>
        row.map((cell, ci) => {
          if (ri !== currentRow || ci !== col) return cell
          return { letter: '', state: 'empty' }
        }),
      ),
    )
    setCurrentCol(col)
  }, [currentCol, currentRow, flippingRow, gameOver, screenFadeOut])

  useEffect(() => {
    const onKey = (e) => {
      if (gameOver || screenFadeOut) return
      if (e.ctrlKey || e.metaKey || e.altKey) return

      if (e.key === 'Enter') {
        e.preventDefault()
        submitGuess()
        return
      }
      if (e.key === 'Backspace') {
        e.preventDefault()
        backspace()
        return
      }
      const k = e.key.toUpperCase()
      if (k.length === 1 && k >= 'A' && k <= 'Z') {
        e.preventDefault()
        addLetter(k)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [addLetter, backspace, gameOver, screenFadeOut, submitGuess])

  const keyStyle = (key) => {
    const st = keyboardColors[key]
    if (st === 'correct') {
      return {
        background: 'var(--tva-amber)',
        color: 'var(--tva-bg)',
        borderColor: 'var(--tva-amber)',
      }
    }
    if (st === 'present') {
      return {
        background: 'var(--tva-amber-dim)',
        color: 'var(--tva-amber-bright)',
        borderColor: 'var(--tva-amber-dim)',
      }
    }
    if (st === 'absent') {
      return {
        background: 'var(--tva-bg)',
        color: 'var(--tva-amber-dim)',
        borderColor: 'var(--tva-bg3)',
      }
    }
    return {
      background: 'var(--tva-bg3)',
      color: 'var(--tva-amber)',
      borderColor: 'var(--tva-border)',
    }
  }

  const onKeyClick = (key) => {
    if (gameOver || screenFadeOut) return
    if (key === 'ENTER') {
      submitGuess()
      return
    }
    if (key === 'BACK') {
      backspace()
      return
    }
    addLetter(key)
  }

  const tileStyle = (cell) => {
    if (cell.state === 'correct') {
      return {
        borderColor: 'var(--tva-amber)',
        backgroundColor: 'var(--tva-amber)',
        color: 'var(--tva-bg)',
      }
    }
    if (cell.state === 'present') {
      return {
        borderColor: 'var(--tva-amber-dim)',
        backgroundColor: 'var(--tva-amber-dim)',
        color: 'var(--tva-amber-bright)',
      }
    }
    if (cell.state === 'absent') {
      return {
        borderColor: 'var(--tva-bg3)',
        backgroundColor: 'var(--tva-bg3)',
        color: 'var(--tva-amber-dim)',
      }
    }

    if (cell.letter && cell.state === 'filled') {
      return {
        borderColor: 'var(--tva-amber-dim)',
        backgroundColor: 'rgba(232,101,26,0.08)',
        color: 'var(--tva-amber)',
      }
    }

    return {
      borderColor: 'var(--tva-border)',
      backgroundColor: 'transparent',
      color: 'var(--tva-amber)',
    }
  }

  const tileFlipClass = (ri) => {
    if (flippingRow !== ri || !pendingFlipResults) return ''
    return 'wordle-tile-flipping'
  }

  const tileCssVars = (ri, ci) => {
    if (flippingRow !== ri || !pendingFlipResults) return {}
    return flipMidVars(pendingFlipResults[ci])
  }

  const isWinGlowMessage = message === WIN_MESSAGE

  const handleMotionComplete = useCallback(() => {
    if (fadeExitPendingRef.current && screenFadeOutRef.current) {
      fadeExitPendingRef.current = false
      onSuccess()
    }
  }, [onSuccess])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={screenFadeOut ? { opacity: 0 } : { opacity: 1 }}
      transition={
        screenFadeOut
          ? { duration: 0.6, ease: 'easeInOut' }
          : { duration: 0.4, ease: 'easeOut' }
      }
      onAnimationComplete={handleMotionComplete}
      style={{
        height: '100vh',
        width: '100%',
        background: 'var(--tva-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        padding: '12px 16px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        fontFamily: 'var(--tva-mono)',
        color: 'var(--tva-amber)',
      }}
    >
      <style>{`
        @keyframes wordle-tile-flip {
          0% {
            transform: rotateX(0deg);
            background-color: transparent;
            border-color: var(--tva-border);
            color: var(--tva-amber);
          }
          49.99% {
            background-color: transparent;
            border-color: var(--tva-amber-dim);
            color: var(--tva-amber);
          }
          50% {
            transform: rotateX(-90deg);
          }
          50.01% {
            transform: rotateX(-90deg);
            background-color: var(--flip-mid-bg);
            border-color: var(--flip-mid-border);
            color: var(--flip-mid-color);
          }
          100% {
            transform: rotateX(0deg);
            background-color: var(--flip-mid-bg);
            border-color: var(--flip-mid-border);
            color: var(--flip-mid-color);
          }
        }
        .wordle-tile-inner.wordle-tile-flipping {
          animation: wordle-tile-flip ${FLIP_MS}ms ease-in-out forwards;
          transform-style: preserve-3d;
        }
        .wordle-tile-wrap {
          perspective: 1000px;
          width: 46px;
          height: 46px;
        }
        .wordle-tile-inner {
          width: 46px;
          height: 46px;
          border-width: 2px;
          border-style: solid;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--tva-display);
          font-size: 24px;
          text-transform: uppercase;
          box-sizing: border-box;
        }
      `}</style>

      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          maxWidth: '520px',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--tva-display)',
            fontSize: '14px',
            letterSpacing: '6px',
            color: 'var(--tva-amber-dim)',
            textAlign: 'center',
          }}
        >
          TIME VARIANCE AUTHORITY
        </div>
        <div
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '11px',
            letterSpacing: '4px',
            color: 'var(--tva-amber-dim)',
            textAlign: 'center',
          }}
        >
          // TEMPORAL SECURITY CLEARANCE //
        </div>
        <div
          style={{
            width: '320px',
            height: '1px',
            background: 'var(--tva-border)',
            margin: '0 auto',
          }}
        />
        <div
          className="tva-glow"
          style={{
            fontFamily: 'var(--tva-display)',
            fontSize: '28px',
            letterSpacing: '3px',
            textAlign: 'center',
            color: 'var(--tva-amber)',
          }}
        >
          ENTER VARIANT DESIGNATION TO PROCEED
        </div>
        <div
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '10px',
            letterSpacing: '2px',
            color: 'var(--tva-amber-dim)',
            textAlign: 'center',
          }}
        >
          HINT: THE VARIANT WHO BUILT THIS DEVICE
        </div>
      </header>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
      >
        {grid.map((row, ri) => (
          <motion.div
            key={`row-${ri}`}
            animate={
              isShaking && ri === currentRow
                ? { x: [0, -6, 6, -6, 6, -4, 4, 0] }
                : { x: 0 }
            }
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ display: 'flex', gap: '5px' }}
          >
            {row.map((cell, ci) => (
              <div key={`cell-${ri}-${ci}`} className="wordle-tile-wrap">
                <div
                  className={`wordle-tile-inner ${tileFlipClass(ri)}`}
                  style={{
                    ...tileCssVars(ri, ci),
                    ...tileStyle(cell),
                    animationDelay:
                      flippingRow === ri && pendingFlipResults
                        ? `${ci * STAGGER_MS}ms`
                        : undefined,
                  }}
                >
                  {cell.letter}
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <div
        style={{
          minHeight: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontFamily: 'var(--tva-mono)',
          fontSize: '11px',
          letterSpacing: '2px',
          color: isWinGlowMessage ? 'var(--tva-amber)' : 'var(--tva-amber-dim)',
          maxWidth: '480px',
        }}
        className={isWinGlowMessage ? 'tva-glow' : undefined}
      >
        {message}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {[ROW1, ROW2, ROW3].map((row, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: '4px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {row.map((key) => {
              const wide = key === 'ENTER' || key === 'BACK'
              const label = key === 'BACK' ? '⌫' : key
              const base = keyStyle(key)
              return (
                <button
                  key={key + idx}
                  type="button"
                  onClick={() => onKeyClick(key)}
                  onMouseEnter={(e) => {
                    if (keyboardColors[key]) return
                    e.currentTarget.style.background = 'var(--tva-bg2)'
                    e.currentTarget.style.borderColor = 'var(--tva-amber-dim)'
                  }}
                  onMouseLeave={(e) => {
                    const s = keyStyle(key)
                    e.currentTarget.style.background = s.background
                    e.currentTarget.style.borderColor = s.borderColor
                  }}
                  style={{
                    fontFamily: 'var(--tva-mono)',
                    fontSize: wide ? '10px' : '12px',
                    height: '34px',
                    minWidth: wide ? '56px' : '36px',
                    padding: wide ? '0 10px' : '0 6px',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    ...base,
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          marginTop: '8px',
        }}
      >
        <div
          style={{
            width: '320px',
            height: '1px',
            background: 'var(--tva-border)',
            margin: '0 auto',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--tva-mono)',
            fontSize: '9px',
            letterSpacing: '3px',
            color: 'var(--tva-amber-dim)',
            textAlign: 'center',
          }}
        >
          TVA // TIME VARIANCE AUTHORITY // EST. BEFORE TIME ITSELF
        </div>
      </footer>
    </motion.div>
  )
}
