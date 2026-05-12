import { useCallback, useMemo, useRef, useState } from 'react'
import { config } from '../../content.js'
import ParticleBackground from './ParticleBackground'
import Menubar from './Menubar'
import Dock from './Dock'
import Sticky from './Sticky'
import Notification from './Notification'
import Window from '../ui/Window'
import ProjectsApp from '../apps/ProjectsApp'
import ReadmeApp from '../apps/ReadmeApp'
import RecyclingBinApp from '../apps/RecyclingBinApp'
import TerminalApp from '../apps/TerminalApp'
import AthleticsApp from '../apps/AthleticsApp'
import CinemaApp from '../apps/CinemaApp'
import MusicApp from '../apps/MusicApp'
import BucketApp from '../apps/BucketApp'
import BookLogApp from '../apps/BookLogApp'

function RetroFileIcon({ fill, size }) {
  const s = size ?? 46
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 46 46"
      aria-hidden
      style={{ display: 'block' }}
    >
      <path fill={fill} d="M12 7h17l9 9v25H12V7z" />
      <path fill={fill} opacity={0.72} d="M29 7v9h8L29 7z" />
    </svg>
  )
}

const GRID_ICONS = [
  { app: 'bucket', label: 'BUCKET.list', fill: '#ff3d00' },
  { app: 'projects', label: 'PROJECTS.app', fill: '#ff7700' },
  { app: 'readme', label: 'README.txt', fill: '#aaaaaa' },
  { app: 'athletics', label: 'ATHLETICS.app', fill: '#2979ff' },
  { app: 'music', label: 'MUSIC.app', fill: '#1db954' },
  { app: 'cinema', label: 'CINEMA.app', fill: '#9c27b0' },
  { app: 'bin', label: 'RECYCLING.bin', fill: '#ff4444' },
  { app: 'terminal', label: 'TERMINAL.exe', fill: '#00e676' },
]

const APP_CONFIG = {
  bucket: {
    title: 'BUCKET.list',
    defaultPosition: { x: 110, y: 55 },
    defaultSize: { width: 540, height: 460 },
  },
  readme: {
    title: 'README.txt',
    defaultPosition: { x: 120, y: 60 },
    defaultSize: { width: 500, height: 420 },
  },
  bin: {
    title: 'RECYCLING.bin',
    defaultPosition: { x: 110, y: 55 },
    defaultSize: { width: 500, height: 460 },
  },
  terminal: {
    title: 'TERMINAL.exe',
    defaultPosition: { x: 130, y: 65 },
    defaultSize: { width: 520, height: 400 },
  },
  cinema: {
    title: 'CINEMA.app',
    defaultPosition: { x: 140, y: 60 },
    defaultSize: { width: 540, height: 460 },
  },
  athletics: {
    title: 'ATHLETICS.app',
    defaultPosition: { x: 120, y: 55 },
    defaultSize: { width: 520, height: 460 },
  },
  music: {
    title: 'MUSIC.app',
    defaultPosition: { x: 130, y: 60 },
    defaultSize: { width: 500, height: 460 },
  },
  projects: {
    title: 'PROJECTS.app',
    defaultPosition: { x: 100, y: 50 },
    defaultSize: { width: 580, height: 460 },
  },
  booklog: {
    title: 'BOOKLOG',
    defaultPosition: { x: 150, y: 60 },
    defaultSize: { width: 520, height: 500 },
  },
}

const CONTACT_EMAIL = 'mcnabtg@gmail.com'

export default function Desktop() {
  const constraintsRef = useRef(null)
  const zSeq = useRef(100)
  const [openApps, setOpenApps] = useState([])
  const [zIndexMap, setZIndexMap] = useState({})
  const [showContact, setShowContact] = useState(false)
  const [contactCopied, setContactCopied] = useState(false)

  const particleBackground = useMemo(() => <ParticleBackground />, [])

  const focusApp = useCallback((name) => {
    zSeq.current += 1
    const z = zSeq.current
    setZIndexMap((m) => ({ ...m, [name]: z }))
  }, [])

  const openApp = useCallback(
    (name) => {
      setOpenApps((prev) => (prev.includes(name) ? prev : [...prev, name]))
      focusApp(name)
    },
    [focusApp],
  )

  const closeApp = useCallback((name) => {
    setOpenApps((prev) => prev.filter((n) => n !== name))
    setZIndexMap((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  const copyContactEmail = useCallback(() => {
    const write = async () => {
      try {
        await navigator.clipboard.writeText(CONTACT_EMAIL)
      } catch {
        const ta = document.createElement('textarea')
        ta.value = CONTACT_EMAIL
        ta.style.position = 'fixed'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setContactCopied(true)
      window.setTimeout(() => setContactCopied(false), 2000)
    }
    void write()
  }, [])

  return (
    <div
      aria-label={config.meta.os}
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        background: '#080808',
      }}
    >
      {particleBackground}
      <Menubar />
      <div
        ref={constraintsRef}
        style={{
          flex: 1,
          position: 'relative',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            display: 'grid',
            gridTemplateColumns: '72px 72px',
            gap: '8px',
            zIndex: 10,
          }}
        >
          {GRID_ICONS.map(({ app, label, fill }) => (
            <button
              key={app}
              type="button"
              onClick={() => openApp(app)}
              style={{
                width: '72px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                padding: '7px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <RetroFileIcon fill={fill} size={46} />
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '10px',
                  color: '#efefef',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                  wordBreak: 'break-word',
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        <Sticky
          label="📌 status"
          position={{ top: 20, right: 20 }}
          text={config.status.text}
          rotation={-1.5}
        />

        {openApps.map((name) => {
          const cfg = APP_CONFIG[name]
          if (!cfg) return null
          return (
            <Window
              key={name}
              title={cfg.title}
              defaultPosition={cfg.defaultPosition}
              defaultSize={cfg.defaultSize}
              zIndex={zIndexMap[name] ?? 100}
              onFocus={() => focusApp(name)}
              onClose={() => closeApp(name)}
              dragConstraintsRef={constraintsRef}
            >
              {name === 'projects' ? (
                <ProjectsApp />
              ) : name === 'readme' ? (
                <ReadmeApp />
              ) : name === 'bin' ? (
                <RecyclingBinApp />
              ) : name === 'terminal' ? (
                <TerminalApp />
              ) : name === 'athletics' ? (
                <AthleticsApp />
              ) : name === 'cinema' ? (
                <CinemaApp />
              ) : name === 'music' ? (
                <MusicApp />
              ) : name === 'bucket' ? (
                <BucketApp />
              ) : name === 'booklog' ? (
                <BookLogApp />
              ) : (
                <div
                  style={{
                    padding: '16px',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '12px',
                    color: '#efefef',
                  }}
                >
                  {name}
                </div>
              )}
            </Window>
          )
        })}
      </div>
      <Dock
        openApp={openApp}
        onContactClick={() => setShowContact(true)}
      />
      <Notification message={config.updates.message} />

      {showContact ? (
        <div
          role="presentation"
          onClick={() => setShowContact(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 500,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#101010',
              border: '1px solid #383838',
              borderRadius: '12px',
              padding: '32px 40px',
              textAlign: 'center',
              minWidth: '320px',
            }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowContact(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                fontSize: '18px',
                color: '#5a5a5a',
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
                lineHeight: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#efefef'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#5a5a5a'
              }}
            >
              ×
            </button>
            <div
              style={{
                fontFamily: '"Unbounded", sans-serif',
                fontSize: '16px',
                color: '#efefef',
                marginBottom: '10px',
              }}
            >
              Always open for a convo.
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={copyContactEmail}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  copyContactEmail()
                }
              }}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '13px',
                color: '#ff3d00',
                marginBottom: '6px',
                cursor: 'pointer',
              }}
            >
              {CONTACT_EMAIL}
            </div>
            <div
              onClick={copyContactEmail}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px',
                color: contactCopied ? '#00e676' : '#5a5a5a',
                cursor: 'pointer',
              }}
            >
              {contactCopied ? 'copied ✓' : 'click to copy'}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
