const P = {
  fontFamily: 'var(--tva-mono)',
  fontSize: '13px',
  color: 'var(--tva-amber)',
  lineHeight: 1.9,
  borderLeft: '2px solid var(--tva-border)',
  paddingLeft: '16px',
  marginBottom: '28px',
  whiteSpace: 'pre-line',
}

const STAMP = {
  fontFamily: 'var(--tva-mono)',
  fontSize: '9px',
  color: 'var(--tva-amber-dim)',
  letterSpacing: '3px',
  marginBottom: '12px',
}

const DIVIDER = { borderTop: '1px solid var(--tva-border)', margin: '20px 0' }

export default function AboutSite() {
  return (
    <div
      style={{
        padding: '8px',
        overflowY: 'auto',
        height: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '10px',
          color: 'var(--tva-amber-dim)',
          letterSpacing: '3px',
          marginBottom: '24px',
        }}
      >
        // SITE DOCUMENTATION // ABOUT THIS TEMPAD //
      </div>

      <div
        style={{
          fontFamily: 'var(--tva-display)',
          fontSize: '72px',
          color: 'var(--tva-amber)',
          opacity: 0.08,
          position: 'absolute',
          top: '20px',
          right: '24px',
          pointerEvents: 'none',
          letterSpacing: '8px',
        }}
      >
        TVA
      </div>

      <div style={STAMP}>// INSPIRATION //</div>
      <div style={P}>
        {`Loki is, no glaze, one of my favorite shows ever made. Elite world-building,
elite aesthetic, and elite character arcs in both seasons. The whole retro-futurist
bureaucratic-world style was already the theme of my phone, so...

When it came time to build a portfolio, I kept coming back to that
aesthetic. Why make something generic when you can make something impressive AND that
actually means something to you? So here we are.`}
      </div>

      <div style={DIVIDER} />

      <div style={STAMP}>// TECHNICAL NOTES //</div>
      <div style={P}>
        {`Built with React, Vite, and a lot of stubbornness. Every component,
every animation, every TVA amber pixel was deliberately chosen.
No templates. No themes. Just a vision and a late night sprint.`}
      </div>

      <div style={DIVIDER} />

      <div style={STAMP}>// CREDITS //</div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '12px',
          color: 'var(--tva-amber-dim)',
          lineHeight: 1.8,
          whiteSpace: 'pre-line',
        }}
      >
        {`Concept & Development: Ishan McNab
Inspired by: Loki (Marvel Studios / Disney+)
Miss Minutes: The real MVP`}
      </div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '9px',
          color: 'var(--tva-amber-dim)',
          opacity: 0.4,
          marginTop: '16px',
          letterSpacing: '1px',
        }}
      >
        // THIS SITE IS NOT AFFILIATED WITH MARVEL OR DISNEY. //
      </div>
    </div>
  )
}
