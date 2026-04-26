import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Activity,
    FileText,
    Briefcase,
    Layers,
    ArrowUpRight,
    Search,
    RefreshCcw
} from 'lucide-react'

import { useQuery } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

export default function Dashboard() {
    const { data: stats, isLoading: loading, refetch } = useQuery({
        queryKey: ['dashboard_stats'],
        queryFn: async () => {
            const [blogs, projects, exp, skills] = await Promise.all([
                axios.get(`${API_URL}/blogs`),
                axios.get(`${API_URL}/projects`),
                axios.get(`${API_URL}/experience`),
                axios.get(`${API_URL}/skills`)
            ])
            return {
                blogs: blogs.data?.data?.length || 0,
                projects: projects.data?.data?.length || 0,
                experience: exp.data?.data?.length || 0,
                skills: skills.data?.data?.length || 0
            }
        }
    })

    const fetchStats = () => { refetch() }

    const STAT_CARDS = [
        { label: 'Total Blogs', value: stats?.blogs || 0, icon: FileText, color: 'text-cyan-glow', bg: 'bg-cyan-glow/5' },
        { label: 'Live Projects', value: stats?.projects || 0, icon: Briefcase, color: 'text-orange-500', bg: 'bg-orange-500/5' },
        { label: 'Experience Items', value: stats?.experience || 0, icon: Layers, color: 'text-purple-500', bg: 'bg-purple-500/5' },
        { label: 'System Metrics', value: '4 Assets', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/5' },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-mono font-bold text-text-primary">root@dash ~ $ ls -all</h1>
                    <p className="text-sm text-text-muted mt-1 font-mono">Overview of system assets and resources.</p>
                </div>
                <button
                    onClick={fetchStats}
                    className="p-2 bg-bg-surface border border-bg-border rounded-lg text-text-muted hover:text-cyan-glow transition-colors"
                >
                    <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STAT_CARDS.map((stat, i) => (
                    <div key={i} className="bg-bg-surface border border-bg-border rounded-xl p-6 relative overflow-hidden group">
                        <div className={`p-2 rounded-lg w-fit ${stat.bg} mb-4`}>
                            <stat.icon className={stat.color} size={20} />
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-2xl font-mono font-bold text-text-primary">
                                    {loading ? '---' : stat.value}
                                </p>
                            </div>
                            <ArrowUpRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-bg-surface border border-bg-border rounded-xl p-6">
                        <h2 className="text-lg font-mono font-bold text-text-primary mb-6 flex items-center gap-2">
                            <Search size={18} className="text-cyan-glow" /> System Logs (Latest Activities)
                        </h2>

                        <div className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 border border-transparent hover:border-bg-border hover:bg-bg-base/50 rounded-lg transition-all">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-cyan-glow/50" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-mono text-text-primary truncate">
                                            [INFO] System initialized. Ready for operations.
                                        </p>
                                        <p className="text-[10px] font-mono text-text-muted mt-1">
                                            2026-04-15 15:20:01 • process_id: 2841
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-bg-surface border border-bg-border rounded-xl p-6">
                        <h2 className="text-sm font-mono font-bold text-text-primary mb-4 uppercase">Server Status</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-text-muted">Node.js</span>
                                <span className="text-green-400">v22.17.0</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-text-muted">Database</span>
                                <span className="text-green-400">Connected</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono">
                                <span className="text-text-muted">Memory</span>
                                <span className="text-text-primary">124MB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
