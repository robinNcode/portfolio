import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Loader2, FileText, ChevronRight, Layers } from 'lucide-react'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export default function BlogList() {
    const { data: blogs = [], isLoading: blogsLoading } = useQuery({
        queryKey: ['public_blogs'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/blogs?limit=50`)
            return data.data || []
        }
    })

    const { data: series = [], isLoading: seriesLoading } = useQuery({
        queryKey: ['public_series'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/series?limit=50`)
            return data.data || []
        }
    })

    if (blogsLoading || seriesLoading) {
        return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-32" />
    }

    return (
        <main className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="font-mono text-xs text-cyan-dim mb-2 flex items-center gap-2">
                    <span className="text-cyan-glow">$</span> cat /var/log/syslog | grep SYSTEM.LOGS
                </div>
                <h1 className="font-display text-4xl font-bold text-text-primary">Terminal Output</h1>
                <p className="text-text-secondary mt-2">Technical articles, guides, and system design musings.</p>
            </motion.div>

            {series.length > 0 && (
                <div className="mb-16">
                    <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                        <Layers size={14} className="text-violet-500" /> ACTIVE_SERIES
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {series.map((s: any) => (
                            <Link key={s._id} to={`/series/${s.slug}`} className="bg-bg-card border border-bg-border rounded-xl p-6 group hover:border-violet-500/30 transition-all block">
                                <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-violet-400 transition-colors mb-2">
                                    {s.name?.en || s.name?.bn || 'Untitled'}
                                </h3>
                                <p className="text-sm text-text-secondary line-clamp-2">{s.description?.en || s.description?.bn}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                    <FileText size={14} className="text-cyan-glow" /> LATEST_LOGS
                </h2>
                <div className="grid gap-4">
                    {blogs.map((blog: any, i: number) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link to={`/blog/${blog.slug}`} className="bg-bg-card border border-bg-border rounded-xl p-6 group flex items-start justify-between transition-all hover:bg-bg-surface hover:border-cyan-glow/30">
                                <div>
                                    <div className="flex items-center gap-3 mb-2 font-mono text-[10px] uppercase text-text-muted">
                                        <span className="text-cyan-glow">{new Date(blog.published_at || blog.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{blog.read_time || 5} MIN READ</span>
                                        {blog.language === 'bn' && <span className="bg-orange-500/10 text-orange-400 px-1.5 rounded">BANGLA</span>}
                                    </div>
                                    <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-cyan-glow transition-colors mb-3">
                                        {blog.title?.en || blog.title?.bn || 'Untitled'}
                                    </h3>
                                    <div className="flex gap-2">
                                        {blog.tags?.slice(0, 4).map((tag: string) => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <ChevronRight className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity mt-4" size={20} />
                            </Link>
                        </motion.div>
                    ))}
                    {blogs.length === 0 && <div className="text-text-muted font-mono text-sm py-10">No logs found...</div>}
                </div>
            </div>
        </main>
    )
}
