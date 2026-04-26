import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

const LAYER_COLORS: Record<string, { border: string; bg: string; label: string }> = {
  'Frontend Systems': {
    border: 'rgba(34,211,238,0.3)',
    bg: 'rgba(34,211,238,0.05)',
    label: '#22d3ee',
  },
  'Backend Engineering': {
    border: 'rgba(167,139,250,0.3)',
    bg: 'rgba(167,139,250,0.05)',
    label: '#a78bfa',
  },
  'Data Layer': {
    border: 'rgba(249,115,22,0.3)',
    bg: 'rgba(249,115,22,0.05)',
    label: '#f97316',
  },
  'DevOps & Tools': {
    border: 'rgba(52,211,153,0.3)',
    bg: 'rgba(52,211,153,0.05)',
    label: '#34d399',
  },
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })
  const [skills, setSkills] = useState<any[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/skills`).then(res => {
      let data = [];
      if (res.data && res.data.data) data = res.data.data;
      else if (Array.isArray(res.data)) data = res.data;
      data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      setSkills(data);
    }).catch(console.error);
  }, []);

  return (
    <section id="skills" ref={ref} className="py-28 relative overflow-hidden">
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
            <span className="text-cyan-glow">$</span> lsblk --output SYSTEM,LAYER,TECH
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary">
            System Architecture
          </h2>
          <p className="text-text-secondary text-sm mt-3 max-w-lg">
            Skills organized as system layers — the way they actually interact in production.
          </p>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent" />
        </motion.div>

        {/* Architecture stack */}
        <div className="space-y-3 max-w-4xl mx-auto">
          {/* Decorative connector top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-2"
          >
            <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
              <div className="w-px h-6 bg-gradient-to-b from-transparent to-text-muted/30" />
              <span>REQUEST FLOW ↓</span>
              <div className="w-px h-6 bg-gradient-to-b from-transparent to-text-muted/30" />
            </div>
          </motion.div>

          {skills.map((data, layerIdx) => {
            const category = data.category

            const colors = LAYER_COLORS[category] || {
              border: 'rgba(255,255,255,0.3)',
              bg: 'rgba(255,255,255,0.05)',
              label: '#ffffff'
            }
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + layerIdx * 0.1 }}
              >
                <div
                  className="rounded-xl border overflow-hidden"
                  style={{ borderColor: colors.border, background: colors.bg }}
                >
                  {/* Layer header */}
                  <div
                    className="px-5 py-3 border-b flex items-center gap-3"
                    style={{ borderColor: colors.border, background: `${colors.bg}` }}
                  >
                    <span className="font-mono text-lg" style={{ color: colors.label }}>
                      {data.icon}
                    </span>
                    <span
                      className="font-mono text-xs font-semibold uppercase tracking-widest"
                      style={{ color: colors.label }}
                    >
                      {category}
                    </span>
                    <div className="flex-1 h-px" style={{ background: colors.border }} />
                    <span className="font-mono text-[10px] text-text-muted">
                      Layer {layerIdx + 1}
                    </span>
                  </div>

                  {/* Skills grid */}
                  <div className="p-5 flex flex-wrap gap-2">
                    {(data.items || []).map((skill: string, i: number) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + layerIdx * 0.1 + i * 0.04 }}
                        className="group relative"
                      >
                        <div
                          className="px-4 py-2 rounded-lg font-mono text-sm font-medium transition-all duration-200 cursor-default"
                          style={{
                            color: colors.label,
                            background: `${colors.bg}`,
                            border: `1px solid ${colors.border}`,
                          }}
                          onMouseEnter={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = `${colors.bg}`.replace('0.05', '0.12')
                            el.style.boxShadow = `0 0 12px ${colors.label}20`
                          }}
                          onMouseLeave={e => {
                            const el = e.currentTarget as HTMLElement
                            el.style.background = colors.bg
                            el.style.boxShadow = 'none'
                          }}
                        >
                          {skill}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Connector between layers */}
                {layerIdx < skills.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div
                      className="w-px h-3"
                      style={{
                        background: `linear-gradient(to bottom, ${colors?.label}50, ${LAYER_COLORS[skills[layerIdx + 1]?.category]?.label || '#333'}50)`,
                      }}
                    />
                  </div>
                )}
              </motion.div>
            )
          })}

          {/* Bottom: Infrastructure label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="text-center pt-4"
          >
            <div className="inline-flex items-center gap-2 bg-bg-card border border-bg-border rounded-full px-4 py-1.5">
              <div className="status-dot w-1.5 h-1.5" />
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                All systems operational
              </span>
            </div>
          </motion.div>
        </div>

        {/* Additional context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          {[
            {
              label: 'Architecture Pattern',
              value: 'MVC / Service Layer / Repository',
              icon: '⬡',
              color: '#22d3ee',
            },
            {
              label: 'API Design',
              value: 'RESTful + Authentication + RBAC',
              icon: '◈',
              color: '#a78bfa',
            },
            {
              label: 'Monitoring',
              value: 'Grafana + Prometheus (exposure)',
              icon: '◉',
              color: '#34d399',
            },
          ].map(({ label, value, icon, color }) => (
            <div
              key={label}
              className="bg-bg-card border border-bg-border rounded-lg p-4 flex items-start gap-3"
            >
              <span className="text-lg" style={{ color }}>{icon}</span>
              <div>
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">
                  {label}
                </div>
                <div className="font-mono text-xs text-text-secondary">{value}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
