import { useCallback, useState } from 'react'
import TVATopBar from './TVATopBar'
import TVABottomBar from './TVABottomBar'
import TVAIconGrid from './TVAIconGrid'
import TVAActionList from './TVAActionList'
import TVACaseFile from './TVACaseFile'
import MissMinutesPanel from './MissMinutesPanel'

export default function Desktop() {
  const [activeSection, setActiveSection] = useState(null)
  const [activeAction, setActiveAction] = useState(null)
  const [showMissMinutes, setShowMissMinutes] = useState(false)
  const [missMinutesOpen, setMissMinutesOpen] = useState(false)

  const handleAction = useCallback((section, action) => {
    setActiveAction({ section, action })
    if (section !== 'missminutes') {
      setShowMissMinutes(false)
    }
  }, [])

  const showMissMinutesPanel =
    showMissMinutes &&
    missMinutesOpen &&
    (activeAction == null || activeAction.section === 'missminutes')

  const showCaseFile =
    activeAction != null && (!showMissMinutes || activeAction.section === 'missminutes')

  const caseFileZ =
    activeAction != null && activeAction.section === 'missminutes' ? 600 : 500

  return (
    <div
      aria-label="TemPad OS"
      style={{
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--tva-bg)',
      }}
    >
      <TVATopBar />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        <TVAIconGrid
          activeSection={activeSection}
          onSelect={setActiveSection}
          onMissMinutes={() => {
            setShowMissMinutes(true)
            setMissMinutesOpen(true)
            setActiveSection(null)
          }}
        />
        <TVAActionList activeSection={activeSection} onAction={handleAction} />
      </div>
      <TVABottomBar />

      {showCaseFile ? (
        <TVACaseFile
          action={activeAction}
          overlayZIndex={caseFileZ}
          onClose={() => {
            if (activeAction?.section === 'missminutes') {
              setActiveAction(null)
              setShowMissMinutes(true)
            } else {
              setActiveAction(null)
            }
          }}
        />
      ) : null}

      {showMissMinutesPanel ? (
        <MissMinutesPanel
          action={activeAction}
          onAction={handleAction}
          onClose={() => {
            setShowMissMinutes(false)
            setMissMinutesOpen(false)
            setActiveAction(null)
            setActiveSection(null)
          }}
        />
      ) : null}
    </div>
  )
}
