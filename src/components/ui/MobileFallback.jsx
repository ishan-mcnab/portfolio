export default function MobileFallback() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'var(--tva-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      gap: '24px',
      fontFamily: 'var(--tva-mono)',
      textAlign: 'center',
    }}>
      {/* TVA header */}
      <div style={{
        fontFamily: 'var(--tva-display)',
        fontSize: '14px',
        letterSpacing: '6px',
        color: 'var(--tva-amber-dim)',
      }}>
        TIME VARIANCE AUTHORITY
      </div>

      {/* Big TVA stamp */}
      <div style={{
        fontFamily: 'var(--tva-display)',
        fontSize: '72px',
        color: 'var(--tva-amber)',
        letterSpacing: '8px',
        lineHeight: 1,
        textShadow: '0 0 30px rgba(232,101,26,0.4)',
      }}>
        TVA
      </div>

      {/* Divider */}
      <div style={{
        width: '200px',
        height: '1px',
        background: 'var(--tva-border)',
      }} />

      {/* Main message */}
      <div style={{
        fontFamily: 'var(--tva-display)',
        fontSize: '22px',
        color: 'var(--tva-amber)',
        letterSpacing: '2px',
        lineHeight: 1.5,
      }}>
        DESKTOP ACCESS ONLY
      </div>

      {/* Sub message */}
      <div style={{
        fontSize: '13px',
        color: 'var(--tva-amber-dim)',
        lineHeight: 1.8,
        maxWidth: '280px',
        letterSpacing: '1px',
      }}>
        This TemPad is not optimized for mobile devices.
        Please access from a desktop or laptop for the
        full TVA experience.
      </div>

      {/* Miss Minutes note */}
      <div style={{
        fontSize: '11px',
        color: 'var(--tva-amber-dim)',
        opacity: 0.5,
        letterSpacing: '2px',
        marginTop: '8px',
      }}>
        "Sorry sugar, rules are rules." — Miss Minutes
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '10px',
        color: 'var(--tva-amber-dim)',
        opacity: 0.4,
        letterSpacing: '2px',
        whiteSpace: 'nowrap',
      }}>
        TVA // TIME VARIANCE AUTHORITY // EST. BEFORE TIME ITSELF
      </div>
    </div>
  )
}
