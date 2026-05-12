import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Sticky({ label, position, text, rotation }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      initial={{ rotate: rotation, scale: 1 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={
        hover
          ? { rotate: 0, scale: 1.03 }
          : { rotate: rotation, scale: 1 }
      }
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        ...position,
        background: '#f5c518',
        color: '#111',
        padding: '14px 16px',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '11px',
        lineHeight: 1.8,
        boxShadow: '3px 4px 16px rgba(0,0,0,0.5)',
        zIndex: 50,
      }}
    >
      <div
        style={{
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '2px',
          opacity: 0.5,
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}
      >
        {label}
      </div>
      <div
        style={{
          width: '160px',
          minHeight: '80px',
          color: '#111',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '11px',
          lineHeight: 1.8,
        }}
      >
        {text}
      </div>
    </motion.div>
  )
}
