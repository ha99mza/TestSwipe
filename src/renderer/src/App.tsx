import { useState, useRef } from 'react'

const pages = [
  { title: 'Page 1', background: '#2563eb' },
  { title: 'Page 2', background: '#16a34a' }
]

const SWIPE_THRESHOLD = 50

function App(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
    isDragging.current = true
    startX.current = e.clientX
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (!isDragging.current) return
    const delta = e.clientX - startX.current
    const clamped =
      (activeIndex === 0 && delta > 0) || (activeIndex === pages.length - 1 && delta < 0)
        ? delta * 0.2
        : delta
    setDragOffset(clamped)
  }

  const handlePointerUp = (): void => {
    if (!isDragging.current) return
    isDragging.current = false

    if (dragOffset < -SWIPE_THRESHOLD && activeIndex < pages.length - 1) {
      setActiveIndex((i) => i + 1)
    } else if (dragOffset > SWIPE_THRESHOLD && activeIndex > 0) {
      setActiveIndex((i) => i - 1)
    }

    setDragOffset(0)
  }

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none'
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Slide strip */}
      <div
        style={{
          display: 'flex',
          width: `${pages.length * 100}vw`,
          height: '100%',
          transform: `translateX(calc(${-activeIndex * 100}vw + ${dragOffset}px))`,
          transition: isDragging.current ? 'none' : 'transform 0.3s ease'
        }}
      >
        {pages.map((page, i) => (
          <div
            key={i}
            style={{
              width: '100vw',
              height: '100%',
              background: page.background,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <h1
              style={{
                color: '#ffffff',
                fontSize: '3rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                margin: 0
              }}
            >
              {page.title}
            </h1>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          pointerEvents: 'none'
        }}
      >
        {pages.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === activeIndex ? '24px' : '10px',
              height: '10px',
              borderRadius: '5px',
              background: i === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.45)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default App
