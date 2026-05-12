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
        .ishos-window-scroll::-webkit-scrollbar { width: 4px; }
        .ishos-window-scroll::-webkit-scrollbar-thumb { background: #383838; border-radius: 2px; }
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
        whileTap={undefined}
        onPointerDown={(e) => {
          onFocus()
        }}
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
        {/* TITLEBAR */}
        <div
          style={{
            height: '38px',
            flexShrink: 0,
            background: '#181818',
            borderBottom: '1px solid #2a2a2a',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '8px',
            position: 'relative',
          }}
        >
          {/* TRAFFIC LIGHTS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
              position: 'relative',
              zIndex: 10,
            }}
          >
            <button
              onPointerDown={(e) => {
                e.stopPropagation()
              }}
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#ff5f57',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#febc2e',
                flexShrink: 0,
              }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#28c840',
                flexShrink: 0,
              }}
            />
          </div>

          {/* DRAG HANDLE — title area only */}
          <div
            onPointerDown={(e) => {
              e.stopPropagation()
              dragControls.start(e)
            }}
            style={{
              flex: 1,
              alignSelf: 'stretch',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'grab',
            }}
          >
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                color: '#5a5a5a',
                pointerEvents: 'none',
              }}
            >
              {title}
            </span>
          </div>

          {/* SPACER to balance traffic lights */}
          <div style={{ width: '52px', flexShrink: 0 }} />
        </div>

        {/* CONTENT */}
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
