const STAMP = {
  fontFamily: 'var(--tva-mono)',
  fontSize: '10px',
  color: 'var(--tva-amber-dim)',
  letterSpacing: '3px',
  marginBottom: '16px',
}

const DIVIDER = { borderTop: '1px solid var(--tva-border)', margin: '24px 0' }

export default function AboutMe() {
  return (
    <div style={{ padding: '8px', overflowY: 'auto', height: '100%' }}>
      <div style={STAMP}>// VARIANT PROFILE // WHO AM I //</div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '15px',
          color: 'var(--tva-amber)',
          lineHeight: 1.9,
          borderLeft: '2px solid var(--tva-border)',
          paddingLeft: '16px',
          marginBottom: '32px',
        }}
      >
        I&apos;m Ishan, an aspiring engineer-entrepreneur interested in building products, concepts, and services for the
        common benefit; My strengths are in technical building, product development, and team management, and I intend to
        major in engineering with a business focus at the next level.
      </div>

      <div style={DIVIDER} />

      <div style={STAMP}>// VARIANT INTERESTS // PASSIONS //</div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '15px',
          color: 'var(--tva-amber-dim)',
          lineHeight: 1.8,
          marginBottom: '16px',
        }}
      >
        My biggest passion in life is chasing things that are exciting and rewarding. You know, those ideas and
        opportunities that you love so much that they don&apos;t even feel like &apos;work&apos; or &apos;being
        productive.&apos; For me, those are:
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {[
          'Basketball (organized and rec)',
          "Product development (see 'Projects' tab)",
          'Reading self-help & productivity books',
          'Constantly consuming sports, TV, movies, and music',
          'Weightlifting',
          "Coding projects I'll only use once",
          'Occasional doomscrolling',
        ].map((line) => (
          <li
            key={line}
            style={{
              fontFamily: 'var(--tva-mono)',
              fontSize: '14px',
              color: 'var(--tva-amber)',
              lineHeight: 2.2,
              paddingLeft: '8px',
            }}
          >
            * {line}
          </li>
        ))}
      </ul>

      <div style={DIVIDER} />

      <div style={STAMP}>// VARIANT DIRECTIVES // PERSONAL FRAMEWORKS //</div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '12px',
          color: 'var(--tva-amber-dim)',
          marginBottom: '16px',
        }}
      >
        A few values and ideas I try to live by:
      </div>

      <Framework
        title="Trust in God's path."
        body="Understand that life is about ups and downs, and it's important to celebrate the wins He helps us achieve and embrace the challenges He helps us overcome."
      />
      <Framework
        title="Forward-focus."
        body="I tend to heavily overthink mistakes and lost opportunities from the past, but it's best to learn from your missed steps and then move on so you can climb the next ones. What's the phrase... crying over spilled milk?"
      />
      <Framework
        title="Health is a web."
        body="Physical, mental, and social well-being are always interconnected, so try to build strong strands: Stay active to release stress, seek challenges to be brighter in social contexts, keep a productive community to stay motivated, etc."
      />
      <Framework
        title="Impermanence."
        body="Life is too short to miss out on things you have a chance at. I don't believe in 'treating every day like our last' (we'd all be in jail with 3 hours), but I strongly believe in putting life into my years, not years into my life."
      />
      <Framework
        title="Impulsiveness."
        body="This one's still a work-in-progress for me, but I'm trying to act more off intuition to encourage mistakes and efficient decision-making. Decision paralysis exists to steal your time in exchange for 'thinking it over.' Don't overthink it!"
      />
      <Framework
        title="Existentialism (kinda)."
        body="At the end of the day, nobody will ever want you to succeed as badly as you do, and more importantly, nobody can do more to help you succeed than you can. At the same time, I believe that the vast majority of 'success' can be attributed to our environment and our relationships with them, so you need to find and use your advantages in the world whenever possible."
      />
    </div>
  )
}

function Framework({ title, body }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          fontFamily: 'var(--tva-display)',
          fontSize: '18px',
          color: 'var(--tva-amber)',
          marginBottom: '6px',
        }}
      >
        * {title}
      </div>
      <div
        style={{
          fontFamily: 'var(--tva-mono)',
          fontSize: '13px',
          color: 'var(--tva-amber-dim)',
          lineHeight: 1.8,
          borderLeft: '1px solid var(--tva-border)',
          paddingLeft: '12px',
        }}
      >
        {body}
      </div>
    </div>
  )
}
