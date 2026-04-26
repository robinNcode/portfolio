import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Award, GitCommit, Users } from 'lucide-react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const [experiences, setExperiences] = useState<any[]>([])

  useEffect(() => {
    axios.get(`${API_URL}/experiences`).then(res => {
      if (res.data && res.data.data) {
        setExperiences(res.data.data);
      } else if (Array.isArray(res.data)) {
        setExperiences(res.data.sort((a: any, b: any) => a.order - b.order));
      }
    }).catch(console.error);
  }, []);

  if (!experiences || experiences.length === 0) return null;

  const exp = experiences[active] || {}
  const problemSolved = exp.problem_solved || exp.problemSolved || '';

  return (
    <section id="experience" ref={ref} className="py-28 relative">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-dim mb-2 flex items-center gap-2">
            <span className="text-cyan-glow">$</span> git log --oneline --graph
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary">
            Deployment History
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-2"
          >
            {experiences.map((e, i) => (
              <button
                key={e.id}
                onClick={() => setActive(i)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  active === i
                    ? 'bg-bg-card border-cyan-glow/30 shadow-lg shadow-cyan-glow/5'
                    : 'bg-bg-card/40 border-bg-border hover:border-bg-border hover:bg-bg-card/70'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <GitCommit
                    size={12}
                    className={active === i ? 'text-cyan-glow' : 'text-text-muted'}
                  />
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                    {e.status === 'active' ? '● active' : '○ merged'}
                  </span>
                </div>
                <div className={`font-display font-semibold text-sm ${active === i ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {e.role}
                </div>
                <div className="font-mono text-xs text-text-muted mt-0.5 truncate">{e.company}</div>
                <div className="font-mono text-xs text-text-muted mt-1">{e.period}</div>
              </button>
            ))}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Header card */}
            <div className="bg-bg-card border border-bg-border rounded-lg p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="font-mono text-xs text-text-muted mb-1">{exp.period} · {exp.duration}</div>
                  <h3 className="font-display text-xl font-bold text-text-primary">{exp.role}</h3>
                  <div className="text-cyan-glow font-medium text-sm mt-0.5">{exp.company}</div>
                </div>
                {exp.status === 'active' && (
                  <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded px-3 py-1.5">
                    <div className="status-dot" />
                    <span className="font-mono text-xs text-green-400">CURRENT</span>
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm text-text-secondary leading-relaxed border-l-2 border-cyan-glow/20 pl-3 italic">
                "{exp.tagline}"
              </p>
            </div>

            {/* Problem / Solution */}
            <div className="bg-bg-card border border-bg-border rounded-lg p-6">
              <div className="font-mono text-xs text-orange-accent mb-3 flex items-center gap-2">
                <span>⚠</span> ROOT CAUSE ANALYSIS
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{problemSolved}</p>
            </div>

            {/* Impact */}
            <div className="bg-bg-card border border-bg-border rounded-lg p-6">
              <div className="font-mono text-xs text-cyan-glow mb-4 flex items-center gap-2">
                <ChevronRight size={12} /> MEASURABLE IMPACT
              </div>
              <ul className="space-y-2.5">
                {(exp.impact || []).map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <span className="text-cyan-glow mt-0.5 flex-shrink-0 font-mono">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Leadership */}
            {exp.leadership.length > 0 && (
              <div className="bg-bg-card border border-bg-border rounded-lg p-6">
                <div className="font-mono text-xs text-violet-400 mb-4 flex items-center gap-2">
                  <Users size={12} /> LEADERSHIP & OWNERSHIP
                </div>
                <ul className="space-y-2.5">
                  {(exp.leadership || []).map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="text-violet-400 mt-0.5 flex-shrink-0 font-mono">›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Award */}
            {exp.award && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4 flex items-center gap-3">
                <Award size={18} className="text-amber-400 flex-shrink-0" />
                <div>
                  <div className="font-display font-semibold text-amber-400 text-sm">{exp.award}</div>
                  <div className="font-mono text-xs text-text-muted mt-0.5">Cross-team collaboration · Production ownership · Junior mentorship</div>
                </div>
              </div>
            )}

            {/* Stack */}
            <div className="flex flex-wrap gap-2">
              {(exp.stack || []).map((tech: string) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
