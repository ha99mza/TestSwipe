import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

const pages = [
  { title: '', background: '#2563eb' },
  { title: '', background: '#16a34a' },
  { title: '', background: '#a31645' },
  { title: '', background: '#fdee15' }
]

function App(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const [counts, setCounts] = useState<number[]>(pages.map(() => 0))

  const handleCount = (pageIndex: number): void => {
    setCounts((prev) => prev.map((c, i) => (i === pageIndex ? c + 1 : c)))
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Swiper
        slidesPerView={1}
        style={{ width: '100%', height: '100%' }}
        onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.activeIndex)}
      >
        {pages.map((page, i) => (
          <SwiperSlide key={i}>
            <div
              style={{
                width: '100%',
                height: '100%',
                background: page.background,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px'
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
              <button
                onClick={() => handleCount(i)}
                style={{
                  padding: '14px 32px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.6)',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)'
                }}
              >
                Cliqué {counts[i]} fois
              </button>
              <button
                onClick={() => alert(`Action page ${i + 1}`)}
                style={{
                  padding: '14px 32px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.6)',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)'
                }}
              >
                Action
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 10,
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
