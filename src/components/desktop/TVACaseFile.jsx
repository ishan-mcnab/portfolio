import { useEffect, useState } from 'react'
import AboutMe from '../apps/tva/AboutMe.jsx'
import AboutSite from '../apps/tva/AboutSite.jsx'
import BasketballTVA from '../apps/tva/BasketballTVA.jsx'
import BookLogTVA from '../apps/tva/BookLogTVA'
import BucketListTVA from '../apps/tva/BucketListTVA.jsx'
import CinemaTVA from '../apps/tva/CinemaTVA.jsx'
import LinksTVA from '../apps/tva/LinksTVA.jsx'
import MusicTVA from '../apps/tva/MusicTVA.jsx'
import ProjectsFeatured from '../apps/tva/ProjectsFeatured.jsx'
import ProjectsSide from '../apps/tva/ProjectsSide.jsx'
import RecyclingBinTVA from '../apps/tva/RecyclingBinTVA.jsx'
import StatusTVA from '../apps/tva/StatusTVA.jsx'
import UpdatesTVA from '../apps/tva/UpdatesTVA.jsx'
import WinsLog from '../apps/tva/WinsLog.jsx'
import WorkoutsTVA from '../apps/tva/WorkoutsTVA.jsx'

function displayActionName(actionId) {
  if (!actionId) return ''
  return actionId.replace(/_/g, ' ').toUpperCase()
}

function CaseFilePlaceholder() {
  return (
    <>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '12px',
          color: 'var(--tva-amber-dim)',
        }}
      >
        // ACCESSING FILE...
      </div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '11px',
          color: 'var(--tva-amber-dim)',
        }}
      >
        CONTENT LOADING — PHASE 5
      </div>
    </>
  )
}

export default function TVACaseFile({ action, onClose, overlayZIndex = 500 }) {
  const [displayAction, setDisplayAction] = useState(action)

  useEffect(() => {
    if (action) setDisplayAction(action)
  }, [action])

  if (!action) return null

  const section = displayAction.section
  const act = displayAction.action
  const title = displayActionName(act)
  const caseSuffix = act.toUpperCase().replace(/[^A-Z0-9]/g, '-')

  function renderBody() {
    const key = `${section}:${act}`

    switch (key) {
      case 'missminutes:status':
        return <StatusTVA />
      case 'missminutes:updates':
        return <UpdatesTVA />
      case 'missminutes:bucket_list':
        return <BucketListTVA />
      case 'timedoor:wins_log':
        return <WinsLog />
      case 'timedoor:recycling_bin':
        return <RecyclingBinTVA />
      case 'projects:tinkren_inhabit':
        return <ProjectsFeatured />
      case 'projects:side_projects':
        return <ProjectsSide />
      case 'athletics:basketball':
        return <BasketballTVA />
      case 'athletics:lifting_workouts':
        return <WorkoutsTVA />
      case 'entertainment:cinema':
        return <CinemaTVA />
      case 'entertainment:music':
        return <MusicTVA />
      case 'entertainment:book_log':
        return <BookLogTVA />
      case 'about:about_me':
        return <AboutMe />
      case 'about:links':
        return (
          <LinksTVA
            onOpenBookLog={() => setDisplayAction({ section: 'entertainment', action: 'book_log' })}
          />
        )
      case 'about:about_this_site':
        return <AboutSite />
      default:
        return <CaseFilePlaceholder />
    }
  }

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: overlayZIndex,
        background: 'rgba(6,13,15,0.92)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="tva-reveal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(860px, 90vw)',
          height: 'min(600px, 85vh)',
          background: 'var(--tva-bg2)',
          border: '2px solid var(--tva-amber)',
          borderRadius: '2px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow:
            '0 0 40px rgba(232,101,26,0.2), 0 0 80px rgba(232,101,26,0.1)',
        }}
      >
        <div
          style={{
            height: '48px',
            flexShrink: 0,
            background: 'var(--tva-bg3)',
            borderBottom: '1px solid var(--tva-border)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '10px',
                color: 'var(--tva-amber-dim)',
              }}
            >
              TVA // CASE FILE //
            </span>
            <span
              style={{
                fontFamily: 'var(--tva-display)',
                fontSize: '20px',
                color: 'var(--tva-amber)',
                letterSpacing: '2px',
              }}
            >
              {title}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '11px',
                color: 'var(--tva-amber-dim)',
              }}
            >
              CASE NO. 7742-{caseSuffix}
            </span>
            <button
              type="button"
              onClick={onClose}
              style={{
                fontFamily: 'var(--tva-mono)',
                fontSize: '12px',
                color: 'var(--tva-amber-dim)',
                cursor: 'pointer',
                marginLeft: '20px',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--tva-amber)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--tva-amber-dim)'
              }}
            >
              [ × CLOSE FILE ]
            </button>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--tva-display)',
              fontSize: '32px',
              color: 'var(--tva-amber)',
              flexShrink: 0,
            }}
          >
            {title}
          </div>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
            }}
          >
            {renderBody()}
          </div>
        </div>
      </div>
    </div>
  )
}
