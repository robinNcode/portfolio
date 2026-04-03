import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Wrench, Layers, RefreshCw, Search } from 'lucide-react'

const principles = [
  {
    icon: Search,
    title: 'Debug to the Root',
    body: `Quick patches ship fast and break twice. I trace every issue to its origin — even when the deadline says otherwise. A production fix that prevents recurrence is worth more than five fast ones that don't.`,
    accent: '#22d3ee',
  },
  {
    icon: Layers,
    title: 'Design for Tomorrow\'s Scale',
    body: `The feature request you're building today will be 10x the load in 18 months. I think in data volumes, query costs, and module boundaries before I write the first line.`,
    accent: '#a78bfa',
  },
  {
    icon: Wrench,
    title: 'Clean Code is Infrastructure',
    body: `Code is read 10x more than it's written. Good naming, clear modules, and consistent patterns are operational decisions — not stylistic preferences. Messy code has a runtime cost.`,
    accent: '#f97316',
  },
  {
    icon: RefreshCw,
    title: 'Process Enables Speed',
    body: `Structured SDLC isn't overhead — it's compounding investment. Code reviews, proper documentation, and consistent deployments are how teams ship reliably at scale.`,
    accent: '#34d399',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-surface/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-dim mb-2 flex items-center gap-2">
            <span className="text-cyan-glow">$</span> cat system.profile
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary">
            Engineering Mindset
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Identity narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-24">
              <div className="bg-bg-card border border-bg-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="font-mono text-xs text-text-muted mb-1">PROCESS ID</div>
                    <div className="font-mono text-cyan-glow font-medium">robin.engineer</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-green-400">
                    <div className="status-dot" />
                    ACTIVE
                  </div>
                </div>

                <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
                  <p>
                    I'm a backend-first engineer who works across the full stack. 
                    I'm most at home in the parts of a codebase that are hard to 
                    explain — the domain logic, the query that needed three rewrites, 
                    the architecture decision that had no clean answer.
                  </p>
                  <p>
                    Five years in production has taught me that 
                    <span className="text-cyan-glow"> reliability is a feature</span> — 
                    not a bonus. Systems I work on are built to be debuggable, 
                    not just functional.
                  </p>
                  <p>
                    Outside code: open-source contributor, team mentor, and 
                    the person who reads the EXPLAIN plan before optimizing.
                  </p>
                </div>

                <div className="mt-5 pt-5 border-t border-bg-border grid grid-cols-2 gap-3">
                  {[
                    { label: 'Focus', value: 'Backend / Architecture' },
                    { label: 'Domain', value: 'Fintech / SaaS' },
                    { label: 'Process', value: 'CMMI Level 5' },
                    { label: 'Award', value: 'Best Team Player \'24' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-0.5">{label}</div>
                      <div className="font-mono text-xs text-text-secondary">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="mt-4 bg-bg-card border border-bg-border rounded-lg p-5">
                <div className="font-mono text-xs text-text-muted mb-3">SYSTEM LANGUAGE</div>
                <div className="flex flex-wrap gap-2">
                  {['PHP', 'JavaScript', 'TypeScript', 'SQL', 'Bash'].map(lang => (
                    <span key={lang} className="tag">{lang}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Principles */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            variants={container}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            {principles.map(({ icon: Icon, title, body, accent }) => (
              <motion.div
                key={title}
                variants={item}
                className="group card-hover rounded-lg p-6 bg-bg-card cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${accent}14`, border: `1px solid ${accent}28` }}
                  >
                    <Icon size={16} style={{ color: accent }} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary mb-2 group-hover:text-cyan-glow transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
