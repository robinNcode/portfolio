import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { projects } from '../data'

// Mini SVG architecture diagrams per project
function ArchDiagram({ type, accent }: { type: string; accent: string }) {
  const nodes = {
    microfinance: {
      layers: [
        { label: 'Client Browser / API Consumers', y: 20, nodes: ['Branch App', 'Reports UI', 'Admin Panel'] },
        { label: 'Laravel Backend', y: 90, nodes: ['Loan Engine', 'Accounting', 'SDLC Layer'] },
        { label: 'Data Layer', y: 160, nodes: ['MySQL', 'Redis Cache', 'Queue'] },
      ],
    },
    saas: {
      layers: [
        { label: 'Tenants', y: 20, nodes: ['SME Org', 'Enterprise', 'Admin'] },
        { label: 'SaaS Core', y: 90, nodes: ['Auth + RBAC', 'Workflows', 'Reports'] },
        { label: 'Persistence', y: 160, nodes: ['MySQL (multi-tenant)', 'Redis', 'Storage'] },
      ],
    },
    investor: {
      layers: [
        { label: 'Dashboard Layer', y: 20, nodes: ['Investor Portal', 'Partner View'] },
        { label: 'Business Logic', y: 90, nodes: ['Profit Alloc.', 'Withdrawals', 'Reporting'] },
        { label: 'Database', y: 160, nodes: ['MySQL', 'Audit Trail'] },
      ],
    },
    thesis: {
      layers: [
        { label: 'Roles', y: 20, nodes: ['Student', 'Faculty', 'Admin'] },
        { label: 'Workflow Engine', y: 90, nodes: ['Submit', 'Review', 'Approve'] },
        { label: 'Storage', y: 160, nodes: ['MySQL', 'File Store'] },
      ],
    },
  }

  const data = nodes[type as keyof typeof nodes] || nodes.microfinance

  return (
    <svg viewBox="0 0 320 210" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Connection lines */}
      {data.layers.slice(0, -1).map((layer, li) => {
        const nextLayer = data.layers[li + 1]
        return layer.nodes.map((_, ni) => {
          const x1 = 30 + (ni / Math.max(layer.nodes.length - 1, 1)) * 260
          return nextLayer.nodes.map((_, nj) => {
            const x2 = 30 + (nj / Math.max(nextLayer.nodes.length - 1, 1)) * 260
            return (
              <line
                key={`${li}-${ni}-${nj}`}
                x1={x1} y1={layer.y + 18}
                x2={x2} y2={nextLayer.y - 2}
                stroke={`${accent}25`}
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
            )
          })
        })
      })}

      {/* Layer labels */}
      {data.layers.map((layer, li) => (
        <text
          key={`label-${li}`}
          x="160" y={layer.y - 10}
          textAnchor="middle"
          fontSize="7"
          fill="rgba(148,163,184,0.5)"
          fontFamily="JetBrains Mono"
        >
          {layer.label}
        </text>
      ))}

      {/* Nodes */}
      {data.layers.map((layer, li) =>
        layer.nodes.map((node, ni) => {
          const x = 30 + (ni / Math.max(layer.nodes.length - 1, 1)) * 260
          return (
            <g key={`${li}-${ni}`} transform={`translate(${x},${layer.y})`}>
              <rect
                x={-32} y={-10}
                width={64} height={20}
                rx={4}
                fill={`${accent}10`}
                stroke={`${accent}35`}
                strokeWidth="0.8"
              />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="7"
                fill={accent}
                fontFamily="JetBrains Mono"
                fontWeight="500"
              >
                {node}
              </text>
            </g>
          )
        })
      )}
    </svg>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<string | null>(null)

  const selectedProject = projects.find(p => p.id === selected)

  return (
    <section id="projects" ref={ref} className="py-28 relative">
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-xs text-cyan-dim mb-2 flex items-center gap-2">
            <span className="text-cyan-glow">$</span> kubectl get services --all-namespaces
          </div>
          <h2 className="font-display text-4xl font-bold text-text-primary">
            Active Services
          </h2>
          <div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-cyan-glow to-transparent" />
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelected(project.id)}
              className={`group card-hover rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br ${project.gradient} bg-bg-card`}
            >
              {/* Architecture diagram */}
              <div className="p-4 pb-0 opacity-60 group-hover:opacity-90 transition-opacity">
                <ArchDiagram type={project.architecture} accent={project.accent} />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">
                      {project.type}
                    </div>
                    <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-cyan-glow transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <span
                    className="text-[10px] font-mono px-2 py-1 rounded flex-shrink-0"
                    style={{
                      color: project.accent,
                      background: `${project.accent}15`,
                      border: `1px solid ${project.accent}30`,
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">
                  {project.problem}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.stack.slice(0, 4).map(tech => (
                    <span key={tech} className="tag text-[10px]">{tech}</span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="tag text-[10px]">+{project.stack.length - 4}</span>
                  )}
                </div>

                <div
                  className="flex items-center gap-1 mt-4 text-xs font-mono transition-all opacity-0 group-hover:opacity-100"
                  style={{ color: project.accent }}
                >
                  View case study <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selected && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-bg-surface border border-bg-border rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                {/* Header */}
                <div className={`p-6 bg-gradient-to-br ${selectedProject.gradient} border-b border-bg-border`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-mono text-xs text-text-muted mb-1">{selectedProject.type}</div>
                      <h3 className="font-display text-2xl font-bold text-text-primary">{selectedProject.name}</h3>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-text-muted hover:text-text-primary">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="mt-4">
                    <ArchDiagram type={selectedProject.architecture} accent={selectedProject.accent} />
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                  {[
                    { label: 'PROBLEM', content: selectedProject.problem, color: '#f97316' },
                    { label: 'SOLUTION', content: selectedProject.solution, color: '#22d3ee' },
                    { label: 'IMPACT', content: selectedProject.impact, color: '#34d399' },
                  ].map(({ label, content, color }) => (
                    <div key={label}>
                      <div className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color }}>
                        {label}
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{content}</p>
                    </div>
                  ))}

                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-2">STACK</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map(t => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
