import { memo, useEffect, useMemo, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default memo(function ParticleBackground() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setReady(true))
  }, [])

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: '#080808' },
      fpsLimit: 60,
      particles: {
        number: { value: 120 },
        color: { value: '#ffffff' },
        opacity: {
          value: { min: 0.1, max: 0.6 },
        },
        size: {
          value: { min: 1, max: 2 },
        },
        links: { enable: false },
        move: {
          enable: true,
          speed: 0.3,
          direction: 'none',
          random: true,
          straight: false,
          outModes: { default: 'out' },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
        },
      },
      detectRetina: true,
    }),
    [],
  )

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        background: '#080808',
      }}
    >
      {ready && (
        <Particles
          id="ishos-particles"
          className="h-full w-full"
          options={options}
        />
      )}
    </div>
  )
})
