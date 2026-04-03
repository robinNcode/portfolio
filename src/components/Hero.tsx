import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Cpu, Database, Globe } from 'lucide-react'
import { bootSequence, profile } from '../data'

const BOOT_SPEED = 35

export default function Hero() {
  const [lines, setLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [bootDone, setBootDone] = useState(false)
  const [showMain, setShowMain] = useState(false)

  useEffect(() => {
    if (currentLine >= bootSequence.length) {
      setTimeout(() => setBootDone(true), 400)
      setTimeout(() => setShowMain(true), 900)
      return
    }

    const line = bootSequence[currentLine]
    if (currentChar < line.length) {
      const t = setTimeout(() => {
        setLines(prev => {
          const next = [...prev]
          next[currentLine] = (next[currentLine] ?? '') + line[currentChar]
          return next
        })
        setCurrentChar(c => c + 1)
      }, BOOT_SPEED)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, 120)
      return () => clearTimeout(t)
    }
  }, [currentLine, currentChar])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-900/10 via-transparent to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-900/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Terminal */}
          <div className="order-2 lg:order-1">
            <div className="terminal-window">
              {/* Title bar */}
              <div className="terminal-titlebar">
                <div className="terminal-dot bg-red-500/70" />
                <div className="terminal-dot bg-yellow-500/70" />
                <div className="terminal-dot bg-green-500/70" />
                <span className="ml-2 font-mono text-xs text-text-muted">
                  system-boot.log
                </span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-xs leading-relaxed min-h-[280px]">
                {lines.map((line, i) => (
                  <div key={i} className="mb-1">
                    <span
                      className={
                        line?.includes('✓')
                          ? 'text-green-400'
                          : line?.includes('Welcome')
                          ? 'text-cyan-glow font-medium'
                          : 'text-text-secondary'
                      }
                    >
                      {line}
                    </span>
                    {i === currentLine && !bootDone && (
                      <span className="animate-blink text-cyan-glow ml-0.5">▋</span>
                    )}
                  </div>
                ))}

                {bootDone && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-cyan-glow">robin@prod:~$</span>
                    <span className="animate-blink text-cyan-glow">▋</span>
                  </div>
                )}
              </div>
            </div>

            {/* System status indicators */}
            {bootDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex items-center gap-4"
              >
                {[
                  { icon: Cpu, label: 'Backend', color: '#22d3ee' },
                  { icon: Database, label: 'Data Layer', color: '#a78bfa' },
                  { icon: Globe, label: 'Frontend', color: '#34d399' },
                ].map(({ icon: Icon, label, color }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 text-xs font-mono text-text-muted"
                  >
                    <div className="status-dot" style={{ background: color, boxShadow: `0 0 8px ${color}80` }} />
                    <span>{label}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right: Identity */}
          <div className="order-1 lg:order-2">
            {showMain ? (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="font-mono text-sm text-cyan-dim mb-3 flex items-center gap-2">
                  <span className="text-cyan-glow">//</span>
                  <span className="text-text-muted">software-engineer.profile</span>
                </div>

                <h1 className="font-display text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-2">
                  MD Shahin Mia
                  <br />
                  <span className="gradient-text">Robin</span>
                </h1>

                <p className="font-body text-lg text-text-secondary mt-5 leading-relaxed border-l-2 border-cyan-glow/30 pl-4 italic">
                  "{profile.tagline}"
                </p>

                <p className="font-body text-text-secondary text-sm mt-5 leading-relaxed max-w-md">
                  Full-stack engineer with <span className="text-cyan-glow font-medium">5+ years</span> building
                  production systems in microfinance, HR SaaS, and fintech. 
                  Strong in backend architecture, database performance, and cross-team ownership.
                </p>

                <div className="flex flex-wrap gap-3 mt-7">
                  <a
                    href={`mailto:${profile.email}`}
                    className="px-5 py-2.5 bg-cyan-glow text-bg-base font-display font-semibold text-sm rounded hover:bg-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-glow/20"
                  >
                    Initialize Contact
                  </a>
                  <a
                    href="#projects"
                    onClick={e => {
                      e.preventDefault()
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="px-5 py-2.5 border border-bg-border text-text-secondary font-display font-medium text-sm rounded hover:border-cyan-glow/40 hover:text-cyan-glow transition-all"
                  >
                    View Systems
                  </a>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-bg-border">
                  {[
                    { value: '5+', label: 'Years' },
                    { value: '3', label: 'Products' },
                    { value: '3.7k+', label: 'OSS Installs' },
                  ].map(({ value, label }) => (
                    <div key={label} className="text-center">
                      <div className="font-display font-bold text-2xl text-cyan-glow">{value}</div>
                      <div className="font-mono text-xs text-text-muted mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="h-72 flex items-center justify-center">
                <div className="text-text-muted font-mono text-xs animate-pulse">
                  Booting system...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {showMain && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="font-mono text-xs">scroll to explore</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      )}
    </section>
  )
}
