import React, { useState } from 'react'
import axios from 'axios'
import { Loader2, Layers, Plus, Trash2, Edit2, Save, X } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import slugify from 'slugify'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface Series {
    _id: string
    name: string
    slug: string
    description: string
}

export default function SeriesManager() {
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState<Partial<Series> | null>(null)

    const { data: series = [], isLoading } = useQuery({
        queryKey: ['series'],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(`${API_URL}/admin/series`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return data.data?.results || []
        }
    })

    const saveMutation = useMutation({
        mutationFn: async (data: Partial<Series>) => {
            const token = localStorage.getItem('token')
            if (data._id) {
                return axios.put(`${API_URL}/admin/series/${data._id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            return axios.post(`${API_URL}/admin/series`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['series'] })
            setEditing(null)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token')
            return axios.delete(`${API_URL}/admin/series/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['series'] })
    })

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (editing) saveMutation.mutate(editing)
    }

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                        <Layers className="text-violet-500" size={20} /> sys.series
                    </h2>
                    <p className="font-mono text-xs text-text-muted mt-1">Manage blog series</p>
                </div>
                <button
                    onClick={() => setEditing({ name: '', slug: '', description: '' })}
                    className="flex items-center gap-2 font-mono text-xs bg-violet-500/10 text-violet-400 px-4 py-2 rounded border border-violet-500/20 hover:bg-violet-500/20"
                >
                    <Plus size={16} /> NEW_SERIES
                </button>
            </div>

            {editing ? (
                <div className="bg-bg-surface border border-bg-border rounded-xl p-6 shadow-xl animate-in fade-in">
                    <div className="flex justify-between mb-4 items-center">
                        <h3 className="font-mono font-bold text-text-primary text-sm">{editing._id ? 'EDIT_SERIES' : 'CREATE_SERIES'}</h3>
                        <button onClick={() => setEditing(null)} className="text-text-muted hover:text-text-primary"><X size={16} /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Name</label>
                                <input
                                    required autoFocus className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary"
                                    value={editing.name || ''}
                                    onChange={e => {
                                        const name = e.target.value
                                        setEditing({ ...editing, name, slug: slugify(name, { lower: true, strict: true }) })
                                    }}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Slug</label>
                                <input
                                    required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary"
                                    value={editing.slug || ''}
                                    onChange={e => setEditing({ ...editing, slug: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono text-text-muted uppercase">Description</label>
                            <textarea
                                className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary resize-none"
                                value={editing.description || ''}
                                onChange={e => setEditing({ ...editing, description: e.target.value })}
                                rows={2}
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="submit" disabled={saveMutation.isPending} className="flex gap-2 items-center bg-violet-500 text-bg-base font-bold font-mono text-xs px-4 py-2 rounded">
                                {saveMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SAVE
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {series.map((s: Series) => (
                        <div key={s._id} className="bg-bg-surface border border-bg-border rounded-lg p-5 group flex justify-between">
                            <div>
                                <h4 className="font-mono text-sm font-bold text-text-primary">{s.name}</h4>
                                <p className="font-mono text-[10px] text-text-muted mt-1">/{s.slug}</p>
                                <p className="font-mono text-xs text-text-secondary mt-2 line-clamp-1">{s.description}</p>
                            </div>
                            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 hover:text-cyan-glow text-text-muted" onClick={() => setEditing(s)}><Edit2 size={14} /></button>
                                <button className="p-1.5 hover:text-red-400 text-text-muted" onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(s._id) }}>
                                    {deleteMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                </button>
                            </div>
                        </div>
                    ))}
                    {series.length === 0 && <div className="text-text-muted font-mono text-sm">No series found.</div>}
                </div>
            )}
        </div>
    )
}
