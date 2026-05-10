import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { config } from '../../content.js'

const ROWS = 6
const COLS = 5

const GREEN = '#538d4e'
const YELLOW = '#b59f3b'
const GRAY = '#3a3a3c'

const FLIP_MS = 500
const STAGGER_MS = 80

const WRONG_MESSAGES = [
  'Not quite.',
  'Try again.',
  'Getting warmer...',
  'So close.',
  'One more chance.',
]

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
        setMessage('Access granted. Welcome.')
        fadeExitPendingRef.current = true
        pushTimeout(() => setScreenFadeOut(true), 1200)
        return
      }

      if (rowIdx === ROWS - 1) {
        setGameOver(true)
        setMessage(`It was ${secret}.`)
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
      setMessage('Not enough letters')
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

  const keyBg = (key) => {
    const st = keyboardColors[key]
    if (st === 'correct') return GREEN
    if (st === 'present') return YELLOW
    if (st === 'absent') return GRAY
    return '#818384'
  }

  const keyColorForRender = (key) => {
    if (key === 'ENTER' || key === 'BACK') return '#818384'
    return keyBg(key)
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
        borderColor: GREEN,
        backgroundColor: GREEN,
        color: '#fff',
      }
    }
    if (cell.state === 'present') {
      return {
        borderColor: YELLOW,
        backgroundColor: YELLOW,
        color: '#fff',
      }
    }
    if (cell.state === 'absent') {
      return {
        borderColor: GRAY,
        backgroundColor: GRAY,
        color: '#fff',
      }
    }

    if (cell.letter && cell.state === 'filled') {
      return {
        borderColor: '#666',
        backgroundColor: 'transparent',
        color: '#fff',
      }
    }

    return {
      borderColor: '#333',
      backgroundColor: 'transparent',
      color: '#fff',
    }
  }

  const tileFlipClass = (ri) => {
    if (flippingRow !== ri || !pendingFlipResults) return ''
    return 'wordle-tile-flipping'
  }

  const tileCssVars = (ri, ci) => {
    if (flippingRow !== ri || !pendingFlipResults) return {}
    const st = pendingFlipResults[ci]
    const bg = st === 'correct' ? GREEN : st === 'present' ? YELLOW : GRAY
    return {
      '--flip-mid-bg': bg,
      '--flip-mid-border': bg,
    }
  }

  const winMessageGreen = message === 'Access granted. Welcome.'

  const handleMotionComplete = useCallback(() => {
    if (fadeExitPendingRef.current && screenFadeOutRef.current) {
      fadeExitPendingRef.current = false
      onSuccess()
    }
  }, [onSuccess])

  return (
    <motion.div
      className="wordle-screen"
      initial={{ opacity: 0 }}
      animate={screenFadeOut ? { opacity: 0 } : { opacity: 1 }}
      transition={
        screenFadeOut
          ? { duration: 0.6, ease: 'easeInOut' }
          : { duration: 0.4, ease: 'easeOut' }
      }
      onAnimationComplete={handleMotionComplete}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '24px 16px 48px',
        boxSizing: 'border-box',
        fontFamily: '"JetBrains Mono", monospace',
      }}
    >
      <style>{`
        @keyframes wordle-tile-flip {
          0% {
            transform: rotateX(0deg);
            background-color: transparent;
            border-color: #666;
          }
          49.99% {
            background-color: transparent;
            border-color: #666;
          }
          50% {
            transform: rotateX(-90deg);
          }
          50.01% {
            transform: rotateX(-90deg);
            background-color: var(--flip-mid-bg);
            border-color: var(--flip-mid-border);
          }
          100% {
            transform: rotateX(0deg);
            background-color: var(--flip-mid-bg);
            border-color: var(--flip-mid-border);
          }
        }
        .wordle-tile-inner.wordle-tile-flipping {
          animation: wordle-tile-flip ${FLIP_MS}ms ease-in-out forwards;
          transform-style: preserve-3d;
        }
        .wordle-tile-wrap {
          perspective: 1000px;
          width: 52px;
          height: 52px;
        }
        .wordle-tile-inner {
          width: 52px;
          height: 52px;
          border-width: 2px;
          border-style: solid;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Unbounded", sans-serif;
          font-weight: 700;
          font-size: 1.35rem;
          text-transform: uppercase;
          box-sizing: border-box;
        }
      `}</style>

      <div
        style={{
          fontSize: '10px',
          color: '#5a5a5a',
          marginBottom: '6px',
        }}
      >
        — solve puzzle to continue —
      </div>
      <div
        style={{
          fontSize: '9px',
          color: '#4a4a4a',
          marginBottom: '28px',
          fontFamily: '"JetBrains Mono", monospace',
        }}
      >
        hint: it&apos;s the guy who built this
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          marginBottom: '16px',
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
            style={{ display: 'flex', gap: '6px' }}
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
          minHeight: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: '12px',
          marginBottom: '14px',
          color: winMessageGreen ? GREEN : '#c9c9c9',
        }}
      >
        {message}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[ROW1, ROW2, ROW3].map((row, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              gap: '6px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {row.map((key) => {
              const wide = key === 'ENTER' || key === 'BACK'
              const label = key === 'BACK' ? '⌫' : key
              return (
                <button
                  key={key + idx}
                  type="button"
                  onClick={() => onKeyClick(key)}
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    background: keyColorForRender(key),
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    height: '52px',
                    minWidth: wide ? '56px' : '36px',
                    padding: wide ? '0 14px' : '0 8px',
                    fontSize: key === 'ENTER' ? '11px' : '14px',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
