import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Loader2, ArrowLeft, Calendar, Clock } from 'lucide-react'
import MDEditor from '@uiw/react-md-editor'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export default function BlogPost() {
    const { slug } = useParams()

    const { data: blog, isLoading, isError } = useQuery({
        queryKey: ['blog', slug],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/blogs/${slug}`)
            return data.data
        }
    })

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-40" />
    if (isError || !blog) return <div className="text-center mt-40 text-red-400 font-mono">Log entry not found.</div>

    return (
        <main className="min-h-screen pt-24 pb-20 px-6 max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-cyan-glow transition-colors mb-10">
                <ArrowLeft size={16} /> RETURN_TO_LOGS
            </Link>

            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="mb-10">
                    {blog.series_id && (
                        <div className="text-xs font-mono uppercase tracking-widest text-violet-400 mb-4 bg-violet-500/10 w-fit px-3 py-1 rounded-full border border-violet-500/20">
                            Series: {blog.series_id.name || 'Unknown'}
                        </div>
                    )}
                    <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-xs text-text-muted font-mono">
                        <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-cyan-glow" />
                            {new Date(blog.published_at || blog.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-cyan-glow" />
                            {blog.read_time || 5} min read
                        </div>
                        {blog.language === 'bn' && <div className="bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded">Bangla</div>}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6">
                        {blog.tags?.map((tag: string) => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="w-full h-px bg-bg-border mb-10" />

                <div className="prose prose-invert prose-cyan max-w-none" data-color-mode="dark">
                    <MDEditor.Markdown source={blog.content} style={{ backgroundColor: 'transparent' }} />
                </div>
            </motion.article>
        </main>
    )
}
