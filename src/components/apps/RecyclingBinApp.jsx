import { config } from '../../content.js'

const mono = '"JetBrains Mono", monospace'

export default function RecyclingBinApp() {
  const failures = config.failures ?? []
  const count = failures.length

  return (
    <div
      style={{
        padding: '24px',
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        overflowY: 'auto',
        background: '#0a0000',
        fontFamily: mono,
      }}
    >
      {!failures.length ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: '0 0 8px 0',
              fontFamily: mono,
              fontSize: '12px',
              color: '#3a3a3a',
            }}
          >
            No failures logged yet.
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: mono,
              fontSize: '12px',
              color: '#3a3a3a',
            }}
          >
            // Add them to content.js
          </p>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontFamily: '"Unbounded", sans-serif',
                fontSize: '11px',
                letterSpacing: '3px',
                color: '#5a5a5a',
              }}
            >
              🗑️ DELETED ITEMS
            </div>
            <div
              style={{
                fontFamily: mono,
                fontSize: '10px',
                color: '#3a3a3a',
              }}
            >
              {count} items · Last emptied: never
            </div>
          </div>

          <div
            style={{
              height: '1px',
              background: '#1a0000',
              marginTop: '14px',
              marginBottom: '20px',
            }}
          />

          {failures.map((failure) => (
            <div
              key={failure.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px 0',
                borderBottom: '1px solid #1a0000',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.85'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1'
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  color: '#3a3a3a',
                  width: '24px',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {failure.id}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#cc3300',
                    marginBottom: '4px',
                    lineHeight: 1.4,
                  }}
                >
                  {failure.title}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#5a5a5a',
                    lineHeight: 1.6,
                  }}
                >
                  {failure.desc}
                </div>
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#3a3a3a',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {failure.year}
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: '24px',
              fontSize: '10px',
              color: '#2a2a2a',
              fontStyle: 'italic',
            }}
          >
            {
              "// Failures aren't deleted. They're just filed differently."
            }
          </div>
        </>
      )}
    </div>
  )
}
