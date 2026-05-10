import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BOOT_LINES = [
  'Initializing Sports Module............. ✓',
  'Loading Music Production............... ✓',
  'Mounting Projects Directory............ ✓',
  'Importing Film Database................ ✓',
  'Calibrating Everything Else............ ✓',
]

export default function BootScreen({ onComplete }) {
  const [fillProgress, setFillProgress] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fillTimer = window.setTimeout(() => setFillProgress(true), 1800)
    const fadeTimer = window.setTimeout(() => setFadeOut(true), 2800)
    const completeTimer = window.setTimeout(() => {
      onComplete()
    }, 3400)

    return () => {
      window.clearTimeout(fillTimer)
      window.clearTimeout(fadeTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{
        minHeight: '100vh',
        width: '100%',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <div
          style={{
            fontFamily: '"Unbounded", sans-serif',
            fontSize: '72px',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1,
            marginBottom: '28px',
          }}
        >
          Ish<span style={{ color: '#ff3d00' }}>OS</span>
        </div>

        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            lineHeight: 1.5,
            marginBottom: '24px',
            textAlign: 'left',
          }}
        >
          {BOOT_LINES.map((line, i) => {
            const checkIdx = line.lastIndexOf('✓')
            const textPart = checkIdx >= 0 ? line.slice(0, checkIdx) : line
            return (
              <motion.div
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.3 * (i + 1),
                  duration: 0.15,
                  ease: 'easeOut',
                }}
                style={{ whiteSpace: 'pre' }}
              >
                <span style={{ color: '#444' }}>{textPart}</span>
                <span style={{ color: '#00e676' }}>✓</span>
              </motion.div>
            )
          })}
        </div>

        <div
          style={{
            width: '320px',
            alignSelf: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#1a1a1a',
              overflow: 'hidden',
              marginBottom: '16px',
            }}
          >
            <div
              style={{
                height: '100%',
                width: fillProgress ? '100%' : '0%',
                background: '#ff3d00',
                transition: 'width 900ms ease',
              }}
            />
          </div>

          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              color: '#444',
              letterSpacing: '0.35em',
              textAlign: 'center',
            }}
          >
            v1.0
          </div>
        </div>
      </div>
    </motion.div>
  )
}
