import React, { useState } from 'react'
import axios from 'axios'
import { Plus, Edit2, Trash2, Save, X, Loader2, Link as LinkIcon, Box } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

interface Project {
    _id: string
    project_id: string
    name: string
    type: string
    status: string
    problem: string
    solution: string
    impact: string
    stack: string[]
    architecture: string
    gradient: string
    accent: string
    order: number
}

const fetchProjects = async (): Promise<Project[]> => {
    const { data } = await axios.get(`${API_URL}/projects`)
    return data.data || data || []
}

export default function ProjectManager() {
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState<Partial<Project> | null>(null)

    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects
    })

    const saveMutation = useMutation({
        mutationFn: async (data: Partial<Project>) => {
            const token = localStorage.getItem('token')
            if (data._id) {
                return axios.put(`${API_URL}/admin/project/${data._id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            return axios.post(`${API_URL}/admin/project`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            setEditing(null)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token')
            return axios.delete(`${API_URL}/admin/project/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] })
    })

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (editing) saveMutation.mutate(editing)
    }

    const parseArray = (val: string) => val.split(',').map(s => s.trim()).filter(Boolean)
    const joinArray = (arr?: string[]) => arr ? arr.join(', ') : ''

    const getEmptyProject = (): Partial<Project> => ({
        project_id: '',
        name: '',
        type: '',
        status: 'Production',
        problem: '',
        solution: '',
        impact: '',
        stack: [],
        architecture: '',
        gradient: 'from-cyan-900/30 to-blue-900/20',
        accent: '#22d3ee',
        order: 0
    })

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-mono font-bold text-text-primary flex items-center gap-3"><Box className="text-cyan-glow" size={24} /> pkg.projects()</h1>
                    <p className="text-sm text-text-muted mt-1 font-mono">Manage showcase projects.</p>
                </div>
                {!editing && (
                    <button
                        onClick={() => setEditing(getEmptyProject())}
                        className="flex items-center gap-2 bg-cyan-glow/10 hover:bg-cyan-glow/20 border border-cyan-glow/30 text-cyan-glow font-mono text-xs px-4 py-2 rounded-lg transition-all"
                    >
                        <Plus size={16} /> ADD_PROJECT
                    </button>
                )}
            </div>

            {editing ? (
                <div className="bg-bg-surface border border-bg-border rounded-xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-mono font-bold text-text-primary">{editing._id ? 'PROJECT::EDIT' : 'PROJECT::NEW'}</h2>
                        <button onClick={() => setEditing(null)} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Project ID (Unique)</label>
                                <input required type="text" value={editing.project_id || ''} onChange={e => setEditing({ ...editing, project_id: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Name</label>
                                <input required type="text" value={editing.name || ''} onChange={e => setEditing({ ...editing, name: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Type (e.g. SaaS)</label>
                                <input required type="text" value={editing.type || ''} onChange={e => setEditing({ ...editing, type: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Status</label>
                                <input required type="text" value={editing.status || ''} onChange={e => setEditing({ ...editing, status: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Architecture</label>
                                <input type="text" value={editing.architecture || ''} onChange={e => setEditing({ ...editing, architecture: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Order</label>
                                <input required type="number" value={editing.order || 0} onChange={e => setEditing({ ...editing, order: parseInt(e.target.value) })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Gradient Classes</label>
                                <input type="text" value={editing.gradient || ''} onChange={e => setEditing({ ...editing, gradient: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Accent Color (Hex)</label>
                                <input type="text" value={editing.accent || ''} onChange={e => setEditing({ ...editing, accent: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Stack (comma separated)</label>
                                <input type="text" value={joinArray(editing.stack)} onChange={e => setEditing({ ...editing, stack: parseArray(e.target.value) })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50" />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Problem</label>
                                <textarea required rows={2} value={editing.problem || ''} onChange={e => setEditing({ ...editing, problem: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50 resize-none" />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Solution</label>
                                <textarea required rows={2} value={editing.solution || ''} onChange={e => setEditing({ ...editing, solution: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50 resize-none" />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Impact</label>
                                <textarea required rows={2} value={editing.impact || ''} onChange={e => setEditing({ ...editing, impact: e.target.value })} className="w-full bg-bg-base border border-bg-border rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50 resize-none" />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8">
                            <button type="submit" disabled={saveMutation.isPending} className="flex items-center gap-2 bg-cyan-glow text-bg-base px-6 py-2 rounded-lg font-mono text-xs font-bold hover:brightness-110 transition-all disabled:opacity-50">
                                {saveMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} SAVE
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(project => (
                        <div key={project._id} className="bg-bg-surface border border-bg-border rounded-xl p-6 group hover:border-cyan-glow/30 transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-mono font-bold text-text-primary">{project.name}</h3>
                                    <p className="text-[10px] font-mono text-cyan-glow">{project.type}</p>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditing(project)} className="p-1.5 hover:text-cyan-glow transition-colors"><Edit2 size={14} /></button>
                                    <button onClick={() => { if (confirm('Are you sure?')) deleteMutation.mutate(project._id) }} className="p-1.5 hover:text-red-400 transition-colors">
                                        {deleteMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-text-muted font-mono line-clamp-2">{project.problem}</p>
                        </div>
                    ))}
                    {projects.length === 0 && <div className="col-span-2 text-text-muted font-mono text-sm text-center py-8">No projects found.</div>}
                </div>
            )}
        </div>
    )
}
