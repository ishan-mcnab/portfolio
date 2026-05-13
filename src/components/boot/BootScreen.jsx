import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINE1 = 'Well, hey there, sugar!'
const LINE2 = "Looks like you've been cleared to access Ishan's TemPad."
const LINE3 = "Tickety-tock — let's get to it!"
const INIT_LABEL = '[ INITIALIZING... ]'

const TYPE_MS = 40

export default function BootScreen({ onComplete }) {
  const [finishedLines, setFinishedLines] = useState([])
  const [typingLine, setTypingLine] = useState('')
  const [showInit, setShowInit] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const [barFilled, setBarFilled] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const ids = []
    const track = (id) => {
      ids.push(id)
      return id
    }
    const q = (fn, delay) => track(window.setTimeout(fn, delay))

    const clearAll = () => {
      ids.forEach((id) => window.clearTimeout(id))
    }

    const typeWriter = (full, onDone) => {
      let i = 0
      const step = () => {
        i += 1
        setTypingLine(full.slice(0, i))
        if (i >= full.length) {
          onDone()
          return
        }
        track(window.setTimeout(step, TYPE_MS))
      }
      step()
    }

    q(() => {
      typeWriter(LINE1, () => {
        setFinishedLines([LINE1])
        setTypingLine('')
        q(() => {
          typeWriter(LINE2, () => {
            setFinishedLines([LINE1, LINE2])
            setTypingLine('')
            q(() => {
              typeWriter(LINE3, () => {
                setFinishedLines([LINE1, LINE2, LINE3])
                setTypingLine('')
                q(() => {
                  setShowInit(true)
                  q(() => {
                    setShowBar(true)
                    q(() => setBarFilled(true), 60)
                    q(() => {
                      setFadeOut(true)
                      q(() => {
                        onComplete()
                      }, 600)
                    }, 60 + 1200 + 400)
                  }, 600)
                }, 800)
              })
            }, 400)
          }, 400)
        }, 400)
      })
    }, 800)

    return () => clearAll()
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'var(--tva-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        padding: '40px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,101,26,0.2) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <img
          src="/miss-minutes.gif"
          alt="Miss Minutes"
          style={{
            width: '280px',
            height: 'auto',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 0 20px rgba(232,101,26,0.4))',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          maxWidth: '500px',
        }}
      >
        {finishedLines.map((line, idx) => (
          <div
            key={`done-${idx}`}
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '22px',
              color: 'var(--tva-amber)',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            {line}
          </div>
        ))}
        {typingLine ? (
          <div
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '22px',
              color: 'var(--tva-amber)',
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            {typingLine}
          </div>
        ) : null}
        {showInit ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '12px',
              letterSpacing: '3px',
              color: 'var(--tva-amber-dim)',
              textAlign: 'center',
              marginTop: '4px',
            }}
          >
            {INIT_LABEL}
          </motion.div>
        ) : null}
      </div>

      {showBar ? (
        <div
          style={{
            width: '280px',
            height: '2px',
            background: 'var(--tva-border)',
            overflow: 'hidden',
            borderRadius: '1px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: barFilled ? '100%' : '0%',
              background: 'var(--tva-amber)',
              transition: 'width 1200ms ease',
            }}
          />
        </div>
      ) : null}
    </motion.div>
  )
}
