import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Terminal } from 'lucide-react'
import { profile } from '../data'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production: hook up to EmailJS / Formspree / your own API
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref} className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-cyan-900/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-dim mb-2 flex items-center gap-2">
            <span className="text-cyan-glow">$</span> ssh robin@dev --port 443
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary">
            Initialize Connection
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="bg-bg-card border border-bg-border rounded-xl p-6">
              <div className="font-mono text-xs text-cyan-glow mb-5 flex items-center gap-2">
                <Terminal size={12} /> CONNECTION ENDPOINTS
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
                  { icon: Phone, label: 'PHONE', value: profile.phone, href: `tel:${profile.phone}` },
                  { icon: MapPin, label: 'LOCATION', value: profile.location, href: '#' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-cyan-glow/20 hover:bg-cyan-faint transition-all group"
                  >
                    <div className="w-8 h-8 rounded bg-bg-surface border border-bg-border flex items-center justify-center flex-shrink-0 group-hover:border-cyan-glow/30 transition-colors">
                      <Icon size={14} className="text-cyan-glow" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-text-muted">{label}</div>
                      <div className="font-mono text-sm text-text-secondary group-hover:text-cyan-glow transition-colors">
                        {value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-bg-border">
                <div className="font-mono text-[10px] text-text-muted mb-3">PROFILES</div>
                <div className="flex gap-3">
                  {[
                    { icon: Github, label: 'GitHub', href: profile.github },
                    { icon: Linkedin, label: 'LinkedIn', href: profile.linkedin },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-bg-border rounded-lg hover:border-cyan-glow/30 hover:text-cyan-glow text-text-muted text-sm font-mono transition-all"
                    >
                      <Icon size={14} />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability indicator */}
            <div className="bg-bg-card border border-bg-border rounded-xl p-5 flex items-center gap-4">
              <div className="status-dot" />
              <div>
                <div className="font-display font-semibold text-text-primary text-sm">
                  Open to Opportunities
                </div>
                <div className="font-mono text-xs text-text-muted mt-0.5">
                  Interested in senior backend / full-stack roles
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <div className="terminal-window h-full flex flex-col justify-center">
                <div className="terminal-titlebar">
                  <div className="terminal-dot bg-red-500/70" />
                  <div className="terminal-dot bg-yellow-500/70" />
                  <div className="terminal-dot bg-green-500/70" />
                  <span className="ml-2 font-mono text-xs text-text-muted">response.log</span>
                </div>
                <div className="p-8 font-mono text-sm space-y-2">
                  <div className="text-green-400">✓ Connection established</div>
                  <div className="text-text-secondary">{'> Message received'}</div>
                  <div className="text-text-secondary">{'> Queuing response...'}</div>
                  <div className="text-cyan-glow mt-4">
                    Thank you for reaching out. I'll get back to you soon.
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-cyan-glow">robin@dev:~$</span>
                    <span className="animate-blink text-cyan-glow">▋</span>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: 'name', label: 'YOUR NAME', placeholder: 'Enter your name', type: 'text' },
                  { id: 'email', label: 'EMAIL ADDRESS', placeholder: 'your@email.com', type: 'email' },
                ].map(field => (
                  <div key={field.id}>
                    <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={formState[field.id as keyof typeof formState]}
                      onChange={e =>
                        setFormState(s => ({ ...s, [field.id]: e.target.value }))
                      }
                      className="w-full bg-bg-card border border-bg-border rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-glow/40 focus:bg-bg-surface transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest block mb-1.5">
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="What are you building? How can I help?"
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full bg-bg-card border border-bg-border rounded-lg px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-glow/40 focus:bg-bg-surface transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-glow text-bg-base font-display font-semibold text-sm rounded-lg hover:bg-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-glow/20 active:scale-[0.98]"
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-8 border-t border-bg-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="font-mono text-xs text-text-muted">
            © {new Date().getFullYear()} MD Shahin Mia Robin · Built with React + TypeScript + Tailwind
          </div>
          <div className="font-mono text-xs text-text-muted flex items-center gap-2">
            <div className="status-dot w-1.5 h-1.5" />
            All systems operational
          </div>
        </motion.div>
      </div>
    </section>
  )
}
