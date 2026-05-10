import { config } from '../../content.js'

const mono = '"JetBrains Mono", monospace'

function SectionLabel({ children }) {
  return (
    <div
      style={{
        color: '#00e676',
        fontFamily: mono,
        fontSize: '12px',
        marginBottom: '8px',
      }}
    >
      {children}
    </div>
  )
}

function EmptyLine() {
  return (
    <p
      style={{
        margin: 0,
        color: '#333',
        fontFamily: mono,
        fontSize: '12px',
        lineHeight: 1.9,
      }}
    >
      # not yet written
    </p>
  )
}

export default function ReadmeApp() {
  const readme = config.readme

  return (
    <>
      <style>{`
        .readme-app-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .readme-app-scroll::-webkit-scrollbar-thumb {
          background: #2a2a2a;
          border-radius: 2px;
        }
      `}</style>
      <div
        className="readme-app-scroll"
        style={{
          padding: '26px',
          minHeight: '100%',
          boxSizing: 'border-box',
          background: '#030303',
          overflowY: 'auto',
          textAlign: 'left',
          fontFamily: mono,
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              color: '#f5c518',
              fontSize: '16px',
              fontFamily: '"Unbounded", sans-serif',
            }}
          >
            # ISH — README.txt
          </div>
          <div
            style={{
              color: '#333',
              fontFamily: mono,
              fontSize: '11px',
              marginTop: '6px',
            }}
          >
            # Always a work in progress.
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <SectionLabel>## whoami</SectionLabel>
          {readme.whoami ? (
            <p
              style={{
                margin: 0,
                color: '#999',
                fontFamily: mono,
                fontSize: '12px',
                lineHeight: 1.9,
              }}
            >
              {readme.whoami}
            </p>
          ) : (
            <EmptyLine />
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <SectionLabel>## passions</SectionLabel>
          {readme.passions?.length ? (
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: 'none',
              }}
            >
              {readme.passions.map((item, i) => (
                <li
                  key={i}
                  style={{
                    color: '#999',
                    fontFamily: mono,
                    fontSize: '12px',
                    lineHeight: 1.9,
                  }}
                >
                  <span style={{ color: '#ff3d00' }}>— </span>
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p
              style={{
                margin: 0,
                color: '#333',
                fontFamily: mono,
                fontSize: '12px',
                lineHeight: 1.9,
              }}
            >
              # none listed yet
            </p>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <SectionLabel>## deeper_insights</SectionLabel>
          {readme.insight ? (
            <p
              style={{
                margin: 0,
                color: '#999',
                fontFamily: mono,
                fontSize: '12px',
                lineHeight: 1.9,
              }}
            >
              {readme.insight}
            </p>
          ) : (
            <EmptyLine />
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <SectionLabel>## philosophy</SectionLabel>
          {readme.philosophy ? (
            <p
              style={{
                margin: 0,
                color: '#999',
                fontFamily: mono,
                fontSize: '12px',
                lineHeight: 1.9,
              }}
            >
              {readme.philosophy}
            </p>
          ) : (
            <EmptyLine />
          )}
        </div>

        <div style={{ marginBottom: 0 }}>
          <SectionLabel>## goals</SectionLabel>
          {readme.goals ? (
            <p
              style={{
                margin: 0,
                color: '#999',
                fontFamily: mono,
                fontSize: '12px',
                lineHeight: 1.9,
              }}
            >
              {readme.goals}
            </p>
          ) : (
            <EmptyLine />
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = 'mailto:mcnabtg@gmail.com'
          }}
          style={{
            margin: 0,
            marginTop: '32px',
            padding: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#333',
            fontFamily: mono,
            fontSize: '11px',
            textAlign: 'left',
            display: 'block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#555'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#333'
          }}
        >
          # Contact: mcnabtg@gmail.com
        </button>
      </div>
    </>
  )
}
