import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Edit2, Trash2, Save, X, Loader2, Link as LinkIcon } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface Project {
    _id: string
    title: string
    description: string
    image: string
    link: string
    tags: string[]
}

export default function ProjectManager() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState<Partial<Project> | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    const fetchProjects = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/projects`)
            setProjects(response.data.data)
        } catch (err) {
            console.error('Failed to fetch projects', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editing) return

        setIsSaving(true)
        try {
            const token = localStorage.getItem('token')
            if (editing._id) {
                await axios.put(`${API_URL}/admin/project/${editing._id}`, editing, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            } else {
                await axios.post(`${API_URL}/admin/project`, editing, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            setEditing(null)
            fetchProjects()
        } catch (err) {
            console.error('Failed to save project', err)
        } finally {
            setIsSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`${API_URL}/admin/project/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            fetchProjects()
        } catch (err) {
            console.error('Failed to delete project', err)
        }
    }

    if (loading && projects.length === 0) {
        return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-mono font-bold text-text-primary">pkg.projects()</h1>
                    <p className="text-sm text-text-muted mt-1 font-mono">Manage showcase projects.</p>
                </div>
                <button
                    onClick={() => setEditing({ title: '', description: '', tags: [], link: '', image: '' })}
                    className="flex items-center gap-2 bg-cyan-glow/10 hover:bg-cyan-glow/20 border border-cyan-glow/30 text-cyan-glow font-mono text-xs px-4 py-2 rounded-lg transition-all"
                >
                    <Plus size={16} /> ADD_PROJECT
                </button>
            </div>

            {editing ? (
                <div className="bg-bg-surface border border-bg-border rounded-xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-mono font-bold text-text-primary">{editing._id ? 'PROJECT::EDIT' : 'PROJECT::NEW'}</h2>
                        <button onClick={() => setEditing(null)} className="text-text-muted hover:text-text-primary"><X size={20} /></button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Title</label>
                                <input
                                    type="text" required value={editing.title || ''}
                                    onChange={e => setEditing({ ...editing, title: e.target.value })}
                                    className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Link</label>
                                <input
                                    type="text" value={editing.link || ''}
                                    onChange={e => setEditing({ ...editing, link: e.target.value })}
                                    className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50"
                                />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Description</label>
                                <textarea
                                    required rows={3} value={editing.description || ''}
                                    onChange={e => setEditing({ ...editing, description: e.target.value })}
                                    className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8">
                            <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-cyan-glow text-bg-base px-6 py-2 rounded-lg font-mono text-xs font-bold hover:brightness-110 transition-all disabled:opacity-50">
                                {isSaving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} SAVE
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
                                    <h3 className="font-mono font-bold text-text-primary">{project.title}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-cyan-glow flex items-center gap-1 hover:underline">
                                            <LinkIcon size={10} /> {project.link.replace(/^https?:\/\//, '')}
                                        </a>
                                    )}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setEditing(project)} className="p-1.5 hover:text-cyan-glow transition-colors"><Edit2 size={14} /></button>
                                    <button onClick={() => handleDelete(project._id)} className="p-1.5 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <p className="text-xs text-text-muted font-mono line-clamp-2">{project.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
