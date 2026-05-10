import { config } from '../../content.js'

function statusMeta(status) {
  switch (status) {
    case 'in-production':
      return { color: '#f5c518', label: 'In Production' }
    case 'shipped':
      return { color: '#00e676', label: 'Shipped' }
    case 'classified':
      return { color: '#5a5a5a', label: 'Classified' }
    default:
      return { color: '#5a5a5a', label: String(status ?? '') }
  }
}

function ProjectCardBody({ project, statusColor, statusLabel }) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: statusColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: statusColor,
          }}
        >
          {statusLabel}
        </span>
      </div>
      <h3
        style={{
          fontFamily: '"Unbounded", sans-serif',
          fontSize: '22px',
          letterSpacing: '1px',
          margin: '0 0 8px 0',
          lineHeight: 1,
          color: '#efefef',
        }}
      >
        {project.name}
      </h3>
      <div
        style={{
          height: 1,
          background: '#2a2a2a',
          margin: '10px 0',
        }}
      />
      <p
        style={{
          margin: 0,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
          color: '#888888',
          lineHeight: 1.6,
        }}
      >
        {project.desc}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '10px',
          color: '#5a5a5a',
        }}
      >
        <span>{project.stack}</span>
        <span>{project.meta}</span>
      </div>
    </>
  )
}

export default function ProjectsApp() {
  const projects = config.projects ?? []

  if (!projects.length) {
    return (
      <div
        style={{
          padding: '20px',
          height: '100%',
          minHeight: 0,
          boxSizing: 'border-box',
          overflowY: 'auto',
          background: '#101010',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '12px',
            color: '#5a5a5a',
            textAlign: 'center',
          }}
        >
          No projects yet. Add them to content.js
        </p>
      </div>
    )
  }

  const baseCard = {
    background: '#181818',
    border: '1px solid #2a2a2a',
    borderRadius: '10px',
    padding: '18px',
    transition: 'border-color 0.2s, transform 0.2s',
  }

  return (
    <div
      style={{
        padding: '20px',
        height: '100%',
        minHeight: 0,
        boxSizing: 'border-box',
        overflowY: 'auto',
        background: '#101010',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '14px',
        }}
      >
        {projects.map((project, index) => {
          const { color, label } = statusMeta(project.status)
          const isClassified = project.status === 'classified'
          const canOpen =
            !isClassified && project.link && project.link !== '#'

          if (isClassified) {
            return (
              <div
                key={index}
                style={{
                  ...baseCard,
                  borderStyle: 'dashed',
                  opacity: 0.4,
                  cursor: 'default',
                }}
              >
                <ProjectCardBody
                  project={project}
                  statusColor={color}
                  statusLabel={label}
                />
              </div>
            )
          }

          return (
            <div
              key={index}
              onClick={() => {
                if (canOpen) {
                  window.open(project.link, '_blank', 'noopener,noreferrer')
                }
              }}
              style={{
                ...baseCard,
                cursor: canOpen ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a2a'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <ProjectCardBody
                project={project}
                statusColor={color}
                statusLabel={label}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
