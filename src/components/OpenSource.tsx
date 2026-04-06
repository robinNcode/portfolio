import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Package, Star, Download, ExternalLink, AlertTriangle, CheckCircle2, Lightbulb, GitFork } from 'lucide-react'
import { openSourceProjects, debuggingStories } from '../data'
import GitHubStats from './GitHubStats'

export default function OpenSource() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  return (
    <section id="opensource" ref={ref} className="py-28 relative">
      <div className="absolute inset-0 dot-grid opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-dim mb-2 flex items-center gap-2">
            <span className="text-cyan-glow">$</span> ls -la ~/contributions
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary">
            Open Source & Debug Lab
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* OSS Packages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {openSourceProjects.map((project, idx) => (
              <div key={project.name} className="space-y-4">
                {/* Package card */}
                <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden card-hover">
                  <div className="bg-gradient-to-r from-cyan-900/30 to-bg-card p-5 border-b border-bg-border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-faint border border-cyan-glow/20 flex items-center justify-center">
                          <Package size={18} className="text-cyan-glow" />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-text-primary">{project.name}</h3>
                          <div className="font-mono text-xs text-text-muted mt-0.5">{project.package}</div>
                        </div>
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-muted hover:text-cyan-glow transition-colors"
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mt-5">
                      {project.stats.installs && (
                        <div className="flex items-center gap-2">
                          <Download size={14} className="text-cyan-glow" />
                          <span className="font-display font-bold text-2xl text-cyan-glow">
                            {project.stats.installs}
                          </span>
                          <span className="font-mono text-xs text-text-muted">installs</span>
                        </div>
                      )}
                      {project.stats.forks && (
                        <div className="flex items-center gap-2">
                          <GitFork size={14} className="text-cyan-glow" />
                          <span className="font-display font-bold text-2xl text-cyan-glow">
                            {project.stats.forks}
                          </span>
                          <span className="font-mono text-xs text-text-muted">forks</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Star size={14} className="text-amber-400" />
                        <span className="font-display font-bold text-2xl text-amber-400">
                          {project.stats.stars}
                        </span>
                        <span className="font-mono text-xs text-text-muted">stars</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {project.problem && (
                      <div className="bg-bg-surface/60 border border-bg-border rounded-lg p-3 mb-4">
                        <div className="font-mono text-[10px] text-orange-accent mb-2">WHY I BUILT THIS</div>
                        <p className="text-xs text-text-secondary">{project.problem}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {[project.language, project.platform, 'Open Source'].map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Code snippet (optional) */}
                {project.snippet && (
                  <div className="terminal-window">
                    <div className="terminal-titlebar">
                      <div className="terminal-dot bg-red-500/70" />
                      <div className="terminal-dot bg-yellow-500/70" />
                      <div className="terminal-dot bg-green-500/70" />
                      <span className="ml-2 font-mono text-xs text-text-muted">{project.name.toLowerCase()} usage</span>
                    </div>
                    <div className="p-5">
                      <SyntaxHighlighter
                        language="bash"
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          padding: 0,
                          background: 'transparent',
                          fontSize: '12px',
                          lineHeight: '1.5',
                        }}
                      >
                        {project.snippet}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* GitHub Stats */}
            <div className="bg-bg-card border border-bg-border rounded-xl p-5">
              <div className="font-mono text-xs text-text-muted mb-4 flex items-center gap-2">
                <span className="text-cyan-glow">λ</span> GITHUB STATS
              </div>
              <GitHubStats />
            </div>
          </motion.div>

          {/* Debugging Stories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="font-mono text-xs text-text-muted mb-2 flex items-center gap-2">
              <span className="text-orange-accent">⚠</span> INCIDENT REPORTS
            </div>

            {debuggingStories.map((story, i) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="bg-bg-card border border-bg-border rounded-xl overflow-hidden card-hover"
              >
                {/* Severity header */}
                <div
                  className={`px-5 py-3 flex items-center gap-2 border-b border-bg-border ${
                    story.severity === 'critical'
                      ? 'bg-red-900/10'
                      : 'bg-amber-900/10'
                  }`}
                >
                  <AlertTriangle
                    size={13}
                    className={story.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}
                  />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      story.severity === 'critical' ? 'text-red-400' : 'text-amber-400'
                    }`}
                  >
                    {story.severity} · {story.context}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h4 className="font-display font-bold text-text-primary">{story.title}</h4>

                  <div>
                    <div className="font-mono text-[10px] text-text-muted uppercase mb-1">SYMPTOM</div>
                    <p className="text-xs text-text-secondary leading-relaxed">{story.symptom}</p>
                  </div>

                  <div>
                    <div className="font-mono text-[10px] text-cyan-glow/70 uppercase mb-1 flex items-center gap-1">
                      <span>DIAGNOSIS</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">{story.diagnosis}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={12} className="text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-text-secondary leading-relaxed">{story.fix}</p>
                  </div>

                  <div className="flex items-start gap-2 bg-bg-surface/60 rounded-lg p-3 border border-bg-border/50">
                    <Lightbulb size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-400/80 italic">{story.lesson}</p>
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
