import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { leadership } from '../data'
import { Award } from 'lucide-react'

export default function Leadership() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <section id="leadership" ref={ref} className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-surface/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-dim mb-2 flex items-center gap-2">
            <span className="text-cyan-glow">$</span> cat team.operations
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary">
            Team Operations
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Award + Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Award */}
            <div className="bg-gradient-to-br from-amber-900/20 to-bg-card border border-amber-500/25 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                  <Award size={22} className="text-amber-400" />
                </div>
                <div>
                  <div className="font-mono text-xs text-amber-400/70 mb-1">RECOGNITION</div>
                  <h3 className="font-display font-bold text-xl text-amber-400">
                    Best Team Player – 2024
                  </h3>
                  <p className="text-sm text-text-secondary mt-2 leading-relaxed">
                    Awarded at DataSoft for cross-team collaboration, ownership during production incidents, 
                    and consistent support of junior engineers throughout the year.
                  </p>
                </div>
              </div>
            </div>

            {/* Team philosophy */}
            <div className="bg-bg-card border border-bg-border rounded-xl p-6">
              <div className="font-mono text-xs text-cyan-glow mb-4 flex items-center gap-2">
                // how I work in teams
              </div>
              <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
                <p>
                  I've learned that the most important thing in a team isn't who writes 
                  the most elegant code — it's who shows up consistently, who doesn't 
                  let things fall through the gaps, and who makes the people around 
                  them better.
                </p>
                <p>
                  When the lead is unavailable and something needs to ship or something 
                  is on fire, I take the call. Not because I like stress, but because 
                  <span className="text-cyan-glow"> reliability is a team sport</span>.
                </p>
                <p>
                  My favorite reviews to write aren't the ones that catch bugs — 
                  they're the ones that change how a junior developer thinks about a problem.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Principles */}
          <motion.div className="space-y-4">
            {leadership.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="group card-hover bg-bg-card rounded-lg p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="text-cyan-glow/60 text-xl flex-shrink-0 group-hover:text-cyan-glow transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text-primary mb-2 group-hover:text-cyan-glow transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
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
