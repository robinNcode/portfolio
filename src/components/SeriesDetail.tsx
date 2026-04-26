import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { Loader2, ArrowLeft, ChevronRight, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

export default function SeriesDetail() {
    const { slug } = useParams()

    const { data: series, isLoading, isError } = useQuery({
        queryKey: ['series', slug],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/series/slug/${slug}`)
            return data.data
        }
    })

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-40" />
    if (isError || !series) return <div className="text-center mt-40 text-red-400 font-mono">Series not found.</div>

    return (
        <main className="min-h-screen pt-24 pb-20 px-6 max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-mono text-text-muted hover:text-cyan-glow transition-colors mb-10">
                <ArrowLeft size={16} /> RETURN_TO_LOGS
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-4 text-violet-400">
                    <BookOpen size={24} />
                    <span className="font-mono text-sm uppercase tracking-widest">Learning Series</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
                    {series.name?.en || series.name?.bn || 'Untitled Series'}
                </h1>
                <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
                    {series.description?.en || series.description?.bn}
                </p>
            </motion.div>

            <div className="space-y-4">
                <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-text-muted mb-6 flex items-center gap-2">
                    <ChevronRight size={14} className="text-violet-500" /> SERIES_ARTICLES
                </h2>
                
                {series.articles && series.articles.length > 0 ? (
                    series.articles.map((item: any, i: number) => {
                        const article = item.blog_id;
                        if (!article) return null;
                        
                        return (
                            <motion.div
                                key={article._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link 
                                    to={`/blog/${article.slug}`} 
                                    className="bg-bg-card border border-bg-border rounded-xl p-6 group flex items-center gap-6 transition-all hover:bg-bg-surface hover:border-violet-500/30"
                                >
                                    <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 font-mono text-violet-400 font-bold">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-violet-400 transition-colors">
                                            {article.title?.en || article.title?.bn || 'Untitled Article'}
                                        </h3>
                                        <p className="text-sm text-text-secondary mt-1">{article.excerpt}</p>
                                    </div>
                                    <ChevronRight className="text-text-muted group-hover:text-violet-400 group-hover:translate-x-1 transition-all" size={20} />
                                </Link>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="text-text-muted font-mono text-sm py-10">No articles in this series yet.</div>
                )}
            </div>
        </main>
    )
}
