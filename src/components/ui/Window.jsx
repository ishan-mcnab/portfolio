import { motion, useDragControls } from 'framer-motion'

export default function Window({
  title,
  children,
  onClose,
  defaultPosition,
  defaultSize,
  zIndex,
  onFocus,
  dragConstraintsRef,
}) {
  const dragControls = useDragControls()

  return (
    <>
      <style>{`
        .ishos-window-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .ishos-window-scroll::-webkit-scrollbar-thumb {
          background: #383838;
          border-radius: 2px;
        }
      `}</style>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        drag
        dragListener={false}
        dragControls={dragControls}
        dragConstraints={dragConstraintsRef}
        dragMomentum={false}
        onPointerDown={() => onFocus()}
        style={{
          position: 'absolute',
          left: defaultPosition.x,
          top: defaultPosition.y,
          width: defaultSize.width,
          height: defaultSize.height,
          zIndex,
          background: '#101010',
          border: '1px solid #383838',
          borderRadius: '12px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          resize: 'both',
          minWidth: 200,
          minHeight: 120,
        }}
      >
        <div
          onPointerDown={(e) => {
            dragControls.start(e)
          }}
          style={{
            height: '38px',
            flexShrink: 0,
            background: '#181818',
            borderBottom: '1px solid #2a2a2a',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '10px',
            cursor: 'grab',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              aria-label="Close"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                padding: 0,
                background: '#ff5f57',
                cursor: 'pointer',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#febc2e',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#28c840',
                display: 'inline-block',
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              color: '#5a5a5a',
              pointerEvents: 'none',
            }}
          >
            {title}
          </div>
          <div style={{ width: '52px', flexShrink: 0 }} aria-hidden />
        </div>
        <div
          className="ishos-window-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            minHeight: 0,
          }}
        >
          {children}
        </div>
      </motion.div>
    </>
  )
}
