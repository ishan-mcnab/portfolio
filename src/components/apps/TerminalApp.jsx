import { config } from '../../content.js'

const mono = '"JetBrains Mono", monospace'

export default function TerminalApp() {
  const wins = config.wins ?? []

  return (
    <>
      <style>{`
        .terminal-app-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-app-scroll::-webkit-scrollbar-thumb {
          background: #1a1a1a;
        }
        @keyframes terminal-cursor-blink {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          50.01% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .terminal-cursor-block {
          display: inline-block;
          width: 8px;
          height: 13px;
          background: #00e676;
          vertical-align: middle;
          margin-left: 2px;
          animation: terminal-cursor-blink 1s step-end infinite;
        }
      `}</style>
      <div
        className="terminal-app-scroll"
        style={{
          height: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
          background: '#030303',
          overflowY: 'auto',
          padding: '20px 24px',
          fontFamily: mono,
          fontSize: '12px',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <div style={{ color: '#00e676', fontSize: '12px' }}>
            // TERMINAL.exe — MAJOR WINS LOG
          </div>
          <div style={{ color: '#333', fontSize: '11px' }}>
            // Failures are in the Recycling Bin. This is for the Ws.
          </div>
        </div>

        {!wins.length ? (
          <div>
            <div style={{ color: '#333' }}>// No wins logged yet.</div>
            <div style={{ color: '#333', marginTop: '8px' }}>
              // Add them to content.js to display here.
            </div>
          </div>
        ) : (
          wins.map((win, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <span
                style={{
                  color: '#f5c518',
                  flexShrink: 0,
                }}
              >
                [{win.year}]
              </span>
              <span style={{ color: '#efefef', lineHeight: 1.7 }}>
                {win.text}
              </span>
            </div>
          ))
        )}

        <div style={{ marginTop: '24px', color: '#efefef' }}>
          <span>&gt; _</span>
          <span className="terminal-cursor-block" aria-hidden />
        </div>
      </div>
    </>
  )
}
