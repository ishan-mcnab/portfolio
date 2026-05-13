import { useState } from 'react'
import WordleScreen from './components/boot/WordleScreen'
import BootScreen from './components/boot/BootScreen'
import Desktop from './components/desktop/Desktop'
import CRTOverlay from './components/ui/CRTOverlay'
import MobileFallback from './components/ui/MobileFallback'

function OSController() {
  const [phase, setPhase] = useState('wordle')

  const isMobile = window.innerWidth < 768
  if (isMobile) return <MobileFallback />

  if (phase === 'wordle') {
    return (
      <>
        <CRTOverlay />
        <WordleScreen onSuccess={() => setPhase('boot')} />
      </>
    )
  }
  if (phase === 'boot') {
    return (
      <>
        <CRTOverlay />
        <BootScreen onComplete={() => setPhase('desktop')} />
      </>
    )
  }
  return (
    <>
      <CRTOverlay />
      <Desktop />
    </>
  )
}

export default function App() {
  return <OSController />
}
