import { useState } from 'react'
import WordleScreen from './components/boot/WordleScreen'
import BootScreen from './components/boot/BootScreen'
import Desktop from './components/desktop/Desktop'

function OSController() {
  const [phase, setPhase] = useState('wordle')

  if (phase === 'wordle') {
    return <WordleScreen onSuccess={() => setPhase('boot')} />
  }
  if (phase === 'boot') {
    return <BootScreen onComplete={() => setPhase('desktop')} />
  }
  return <Desktop />
}

export default function App() {
  return <OSController />
}
