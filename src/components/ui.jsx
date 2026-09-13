import { useEffect } from 'react'

// SVG progress ring. Children render in the centre.
export function Ring({ pct, size = 64, stroke = 7, color, bg, children }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const p = Math.max(0, Math.min(100, pct || 0))
  const off = c - (p / 100) * c
  return (
    <span
      className="ring-wrap"
      style={{
        '--ring-size': `${size}px`,
        width: size,
        height: size,
      }}
    >
      <svg className="ring-svg" width={size} height={size} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg || 'var(--border)'} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color || 'var(--accent)'}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="ring-label">{children}</span>
    </span>
  )
}

// Horizontal progress bar
export function Bar({ pct, color }) {
  const p = Math.max(0, Math.min(100, pct || 0))
  return (
    <div className="bar">
      <div className="fill" style={{ width: `${p}%`, background: color || 'var(--accent)' }} />
    </div>
  )
}

export function EmptyState({ icon, title, hint, children }) {
  return (
    <div className="empty">
      <span className="empty-ico">{icon}</span>
      <p className="empty-title">{title}</p>
      {hint && <p className="empty-hint">{hint}</p>}
      {children}
    </div>
  )
}

export function Modal({ open, onClose, title, children, wide }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal" style={wide ? { maxWidth: 700 } : undefined} role="dialog" aria-modal="true">
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// Simple auto-hiding toast
export function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => onDone && onDone(), 2200)
    return () => clearTimeout(t)
  }, [message, onDone])
  if (!message) return null
  return <div className="toast">{message}</div>
}