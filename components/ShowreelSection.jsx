"use client"

import { useState, useRef, useEffect, useCallback, Fragment } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatTime = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = Math.floor(s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

const TOTAL = 108 // 1:48

// ── Sub-components ────────────────────────────────────────────────────────────

function CustomCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) }
  const smoothX = useSpring(mouse.x, { stiffness: 500, damping: 40 })
  const smoothY = useSpring(mouse.y, { stiffness: 500, damping: 40 })
  const ringX = useSpring(mouse.x, { stiffness: 120, damping: 20 })
  const ringY = useSpring(mouse.y, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const move = (e) => { mouse.x.set(e.clientX); mouse.y.set(e.clientY) }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <motion.div
        className="cursor"
        style={{ left: smoothX, top: smoothY }}
      />
      <motion.div
        className="cursor-ring"
        style={{ left: ringX, top: ringY }}
      />
    </>
  )
}

function TopBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center mb-12 pb-5"
      style={{ borderBottom: '0.5px solid var(--white-faint)' }}
    >
      <div className="flex items-center gap-4">
        <span
          className="font-mono text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-sm font-bold"
          style={{ background: 'var(--gold)', color: 'var(--bg)' }}
        >
          Showreel 2026
        </span>
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase" style={{ color: 'var(--white-dim)' }}>
          Motion &amp; Identity
        </span>
      </div>
      <div className="font-mono text-[10px] tracking-[0.08em]" style={{ color: 'var(--white-muted)' }}>
        [04]&nbsp; FILE_SIZE:&nbsp;
        <span style={{ color: 'var(--gold)' }}>2.4 GB</span>
        &nbsp;·&nbsp; RES:&nbsp;
        <span style={{ color: 'var(--gold)' }}>4K</span>
        &nbsp;·&nbsp;
        <span style={{ color: 'var(--gold)' }}>01:48</span>
      </div>
    </motion.div>
  )
}

function HeroTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.1 }}
      className="flex items-baseline mb-10 overflow-hidden"
    >
      <span
        className="font-display leading-none tracking-tight select-none"
        style={{ fontSize: 'clamp(72px, 9vw, 112px)', color: 'var(--white)' }}
      >
        The&nbsp;
      </span>
      <span
        className="font-display leading-none tracking-tight gold-shimmer select-none"
        style={{ fontSize: 'clamp(72px, 9vw, 112px)' }}
      >
        Portfolio
      </span>
      <span
        className="font-display leading-none tracking-tight select-none"
        style={{ fontSize: 'clamp(72px, 9vw, 112px)', color: 'var(--white-muted)' }}
      >
        .mp4
      </span>
    </motion.div>
  )
}

function PlayerBlobs() {
  return (
    <>
      <div
        className="blob-1 absolute rounded-full pointer-events-none"
        style={{
          width: '55%', height: '130%',
          top: '-20%', left: '5%',
          background: 'radial-gradient(circle, rgba(42,31,0,0.9) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.5,
        }}
      />
      <div
        className="blob-2 absolute rounded-full pointer-events-none"
        style={{
          width: '45%', height: '110%',
          top: '-5%', right: '3%',
          background: 'radial-gradient(circle, rgba(10,26,58,0.9) 0%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.45,
        }}
      />
    </>
  )
}

function PlayButton({ isPlaying, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={isPlaying ? 'Pause' : 'Play showreel'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      className="relative flex items-center justify-center rounded-full outline-none border-none"
      style={{
        width: 'clamp(60px, 6vw, 76px)',
        height: 'clamp(60px, 6vw, 76px)',
        background: isPlaying ? 'var(--white)' : 'var(--gold)',
        boxShadow: isPlaying
          ? '0 0 0 12px rgba(245,244,240,0.06), 0 0 40px rgba(245,244,240,0.08)'
          : '0 0 0 12px rgba(240,201,58,0.1), 0 0 40px rgba(240,201,58,0.15)',
        cursor: 'none',
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="pause"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1"
          >
            <div className="w-1 h-5 rounded-sm" style={{ background: 'var(--bg)' }} />
            <div className="w-1 h-5 rounded-sm" style={{ background: 'var(--bg)' }} />
          </motion.div>
        ) : (
          <motion.div
            key="play"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              width: 0, height: 0,
              borderStyle: 'solid',
              borderWidth: '10px 0 10px 18px',
              borderColor: `transparent transparent transparent var(--bg)`,
              marginLeft: '3px',
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  )
}

function WaveIndicator({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex items-end gap-[3px]"
          style={{ height: '18px' }}
        >
          {[1,2,3,4,5].map(i => (
            <div key={i} className="wave-bar" />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PlayerHUD({ elapsed, total }) {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 pt-4 z-10">
      <div className="flex items-center gap-2">
        <div
          className="rec-dot w-2 h-2 rounded-full"
          style={{ background: 'var(--gold)' }}
        />
        <span className="font-mono text-[9px] tracking-[0.1em] uppercase" style={{ color: 'rgba(245,244,240,0.35)' }}>
          REC&nbsp;&nbsp;CAM_01&nbsp;·&nbsp;24.976 FPS
        </span>
      </div>
      <span className="font-mono text-[9px] tracking-[0.08em]" style={{ color: 'rgba(245,244,240,0.35)' }}>
        {formatTime(elapsed)}&nbsp;/&nbsp;{formatTime(total)}
      </span>
    </div>
  )
}

function PlayerCenter({ isPlaying, onToggle }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-4 text-center select-none">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="font-mono text-[9px] tracking-[0.28em] uppercase flex items-center gap-2"
        style={{ color: 'var(--white-dim)' }}
      >
        <span style={{ color: 'var(--gold)', fontSize: '6px' }}>◆</span>
        Reworks Showreel
        <span style={{ color: 'var(--gold)', fontSize: '6px' }}>◆</span>
      </motion.div>

      {/* 2 ◉ 26 */}
      <div className="flex items-center" style={{ gap: 0, lineHeight: 1 }}>
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
          className="font-display"
          style={{
            fontSize: 'clamp(72px, 9vw, 100px)',
            color: 'var(--white)',
            textShadow: '0 0 60px rgba(240,201,58,0.1)',
            letterSpacing: '-0.02em',
          }}
        >
          2
        </motion.span>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.75, type: 'spring', stiffness: 200 }}
        >
          <PlayButton isPlaying={isPlaying} onClick={onToggle} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 120 }}
          className="font-display"
          style={{
            fontSize: 'clamp(72px, 9vw, 100px)',
            color: 'var(--white)',
            textShadow: '0 0 60px rgba(240,201,58,0.1)',
            letterSpacing: '-0.02em',
          }}
        >
          26
        </motion.span>
      </div>

      {/* Stats line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="font-mono text-[9px] tracking-[0.2em] uppercase flex items-center gap-3"
        style={{ color: 'rgba(245,244,240,0.3)' }}
      >
        <span style={{ color: 'rgba(245,244,240,0.5)' }}>24 Works</span>
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(245,244,240,0.2)', display: 'inline-block' }} />
        <span style={{ color: 'rgba(245,244,240,0.5)' }}>12 Clients</span>
        <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(245,244,240,0.2)', display: 'inline-block' }} />
        <span style={{ color: 'rgba(245,244,240,0.5)' }}>4 Continents</span>
      </motion.div>
    </div>
  )
}

function ControlsBar({ isPlaying, elapsed, progress, onToggle, onSeek }) {
  const trackRef = useRef(null)

  const handleTrackClick = (e) => {
    const rect = trackRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    onSeek(pct)
  }

  return (
    <div
      className="px-5 pb-4 pt-3 flex flex-col gap-3"
      style={{ background: 'var(--surface2)', borderTop: '0.5px solid rgba(245,244,240,0.07)' }}
    >
      {/* Progress */}
      <div className="progress-track" ref={trackRef} onClick={handleTrackClick}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggle}
            className="flex items-center p-1 transition-colors outline-none"
            style={{ background: 'none', border: 'none', cursor: 'none', color: 'var(--white-dim)' }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          <span className="font-mono text-[10px]" style={{ color: 'var(--white-dim)', letterSpacing: '0.06em' }}>
            {formatTime(elapsed)}&nbsp;
            <span style={{ color: 'rgba(245,244,240,0.25)' }}>/&nbsp;01:48</span>
          </span>

          <WaveIndicator visible={isPlaying} />
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            className="p-1 outline-none"
            style={{ background: 'none', border: 'none', cursor: 'none', color: 'var(--white-muted)' }}
            aria-label="Volume"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M19.07 4.93a10 10 0 010 14.14"/>
              <path d="M15.54 8.46a5 5 0 010 7.07"/>
            </svg>
          </button>
          {['CC', 'HD'].map(label => (
            <span
              key={label}
              className="font-mono text-[9px] tracking-[0.12em] px-2 py-1 rounded-sm"
              style={{
                border: label === 'HD'
                  ? '0.5px solid rgba(240,201,58,0.3)'
                  : '0.5px solid rgba(245,244,240,0.07)',
                color: label === 'HD' ? 'var(--gold)' : 'var(--white-muted)',
              }}
            >
              {label}
            </span>
          ))}
          <button
            className="p-1 outline-none"
            style={{ background: 'none', border: 'none', cursor: 'none', color: 'var(--white-muted)' }}
            aria-label="Fullscreen"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function StatsStrip() {
  const stats = [
    { num: '24', label: 'Works Delivered' },
    { num: '12', label: 'Global Clients' },
    { num: '04', label: 'Continents Active' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="grid"
      style={{
        gridTemplateColumns: '1fr 1px 1fr 1px 1fr',
        border: '0.5px solid rgba(245,244,240,0.07)',
        borderTop: 'none',
        borderRadius: '0 0 4px 4px',
        overflow: 'hidden',
        marginTop: '1.5px',
      }}
    >
      {stats.map((s, i) => (
        <Fragment key={s.label}>
          <motion.div
            className="flex flex-col gap-1 px-6 py-4"
            style={{ background: 'var(--surface2)' }}
            whileHover={{ background: '#1e1e1d' }}
            transition={{ duration: 0.2 }}
          >
            <span
              className="font-display"
              style={{ fontSize: 30, color: 'var(--gold)', lineHeight: 1, letterSpacing: '0.02em' }}
            >
              {s.num}
            </span>
            <span className="font-mono text-[9px] tracking-[0.14em] uppercase" style={{ color: 'var(--white-muted)' }}>
              {s.label}
            </span>
          </motion.div>
          {i < 2 && (
            <div style={{ background: 'rgba(245,244,240,0.07)', width: 1 }} />
          )}
        </Fragment>
      ))}
    </motion.div>
  )
}

function TickerBar() {
  const items = ['Motion Design', '·', 'Brand Identity', '·', 'Digital Experiences', '·', 'Art Direction', '·', 'Campaign Films', '·']
  const repeated = [...items, ...items]

  return (
    <div
      className="overflow-hidden py-3 mt-px"
      style={{ borderTop: '0.5px solid rgba(245,244,240,0.07)', borderBottom: '0.5px solid rgba(245,244,240,0.07)' }}
    >
      <div className="ticker-track flex items-center gap-6 whitespace-nowrap" style={{ width: 'max-content' }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[9px] tracking-[0.16em] uppercase"
            style={{ color: item === '·' ? 'var(--gold)' : 'var(--white-muted)' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

function CTARow() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.6 }}
      className="flex justify-between items-center mt-8"
    >
      <p className="font-body text-sm" style={{ color: 'var(--white-muted)', letterSpacing: '0.02em' }}>
        Est. 2019 — Award-winning creative studio
      </p>

      <motion.button
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase px-5 py-3 rounded-sm outline-none"
        style={{
          background: hovered ? 'var(--gold)' : 'transparent',
          border: '0.5px solid rgba(240,201,58,0.35)',
          color: hovered ? 'var(--bg)' : 'var(--gold)',
          transition: 'background 0.25s, color 0.25s',
          cursor: 'none',
        }}
      >
        View All Work
        <motion.svg
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
          width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </motion.svg>
      </motion.button>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ShowreelSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(19)
  const intervalRef = useRef(null)

  const progress = (elapsed / TOTAL) * 100

  const togglePlay = useCallback(() => {
    setIsPlaying(p => !p)
  }, [])

  const handleSeek = useCallback((pct) => {
    setElapsed(Math.round(pct * TOTAL))
  }, [])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setElapsed(e => {
          if (e >= TOTAL) { setIsPlaying(false); return 0 }
          return e + 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPlaying])

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-8 py-12"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <CustomCursor />
      <TopBar />
      <HeroTitle />

      {/* Player */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <div
          className="scanlines relative overflow-hidden"
          style={{
            border: '0.5px solid rgba(245,244,240,0.07)',
            borderRadius: '4px 4px 0 0',
            background: 'var(--surface)',
          }}
        >
          {/* Gold right accent */}
          <div
            className="absolute right-0 top-0 bottom-0 w-0.5 z-20"
            style={{ background: 'var(--gold)', opacity: 0.6 }}
          />

          {/* Video area */}
          <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{ aspectRatio: '16/8.2', background: '#0c0c0b' }}
          >
            <PlayerBlobs />
            <PlayerHUD elapsed={elapsed} total={TOTAL} />
            <PlayerCenter isPlaying={isPlaying} onToggle={togglePlay} />
          </div>

          {/* Controls */}
          <ControlsBar
            isPlaying={isPlaying}
            elapsed={elapsed}
            progress={progress}
            onToggle={togglePlay}
            onSeek={handleSeek}
          />
        </div>

        <StatsStrip />
        <TickerBar />
      </motion.div>

      <CTARow />
    </div>
  )
}
