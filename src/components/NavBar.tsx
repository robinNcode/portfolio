import { useState, useEffect } from 'react'
import { useScrollProgress, useActiveSection } from '../hooks'
import { Terminal, Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'hero', label: 'init' },
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'log' },
  { id: 'projects', label: 'services' },
  { id: 'skills', label: 'stack' },
  { id: 'opensource', label: 'pkg' },
  { id: 'contact', label: 'connect' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const progress = useScrollProgress()
  const activeSection = useActiveSection(NAV_ITEMS.map(n => n.id))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] z-50 transition-all duration-100"
        style={{
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-base/90 backdrop-blur-md border-b border-bg-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 text-cyan-glow hover:opacity-80 transition-opacity"
          >
            <Terminal size={16} />
            <span className="font-mono text-sm font-medium">robin@dev</span>
            <span className="font-mono text-text-muted text-sm">:~$</span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1.5 font-mono text-xs transition-all duration-200 rounded ${
                    activeSection === item.id
                      ? 'text-cyan-glow bg-cyan-faint'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  ./{item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-text-secondary hover:text-cyan-glow transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-bg-surface border-b border-bg-border px-6 py-4">
            <ul className="flex flex-col gap-2">
              {NAV_ITEMS.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-3 py-2 font-mono text-sm rounded transition-all ${
                      activeSection === item.id
                        ? 'text-cyan-glow bg-cyan-faint'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span className="text-text-muted">$ </span>./{item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}
