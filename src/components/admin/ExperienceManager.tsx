import React, { useState } from 'react'
import axios from 'axios'
import { Plus, Edit2, Trash2, Save, X, Loader2, Briefcase } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface Experience {
    _id: string
    position: string
    company: string
    duration: string
    [key: string]: any
}

// Ensure the fetching matches backend response structure
const fetchExperience = async (): Promise<Experience[]> => {
    const { data } = await axios.get(`${API_URL}/experience`)
    return data.data || []
}

export default function ExperienceManager() {
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState<Partial<Experience> | null>(null)

    const { data: exp = [], isLoading } = useQuery({
        queryKey: ['experience'],
        queryFn: fetchExperience
    })

    const saveMutation = useMutation({
        mutationFn: async (data: Partial<Experience>) => {
            const token = localStorage.getItem('token')
            if (data._id) {
                return axios.put(`${API_URL}/admin/experience/${data._id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            return axios.post(`${API_URL}/admin/experience`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['experience'] })
            setEditing(null)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token')
            return axios.delete(`${API_URL}/admin/experience/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['experience'] })
    })

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (editing) saveMutation.mutate(editing)
    }

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                    <Briefcase className="text-cyan-glow" size={20} /> sys.exp
                </h2>
                {!editing && (
                    <button onClick={() => setEditing({ position: '', company: '', duration: '', description: '', order: 0 })} className="text-xs font-mono text-cyan-glow hover:underline underline-offset-4">
                        + NEW_EXP
                    </button>
                )}
            </div>

            {editing ? (
                <div className="bg-bg-surface border border-bg-border rounded-xl p-6 shadow-xl animate-in fade-in">
                    <div className="flex justify-between mb-4 items-center">
                        <h3 className="font-mono font-bold text-text-primary text-sm">{editing._id ? 'EDIT_EXP' : 'CREATE_EXP'}</h3>
                        <button onClick={() => setEditing(null)} className="text-text-muted hover:text-text-primary"><X size={16} /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Position</label>
                                <input
                                    required autoFocus className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary"
                                    value={editing.position || ''}
                                    onChange={e => setEditing({ ...editing, position: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Company</label>
                                <input
                                    required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary"
                                    value={editing.company || ''}
                                    onChange={e => setEditing({ ...editing, company: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Duration (e.g. 2021 - Present)</label>
                                <input
                                    required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary"
                                    value={editing.duration || ''}
                                    onChange={e => setEditing({ ...editing, duration: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Order</label>
                                <input
                                    type="number"
                                    required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary"
                                    value={editing.order || 0}
                                    onChange={e => setEditing({ ...editing, order: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono text-text-muted uppercase">Description</label>
                            <textarea
                                className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary resize-none"
                                value={editing.description || ''}
                                onChange={e => setEditing({ ...editing, description: e.target.value })}
                                rows={3}
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button type="submit" disabled={saveMutation.isPending} className="flex gap-2 items-center bg-cyan-glow text-bg-base font-bold font-mono text-xs px-4 py-2 rounded">
                                {saveMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SAVE
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.map((item) => (
                        <div key={item._id} className="bg-bg-surface border border-bg-border rounded-lg p-4 flex items-center justify-between group">
                            <div>
                                <h4 className="font-mono font-bold text-sm text-text-primary">{item.position}</h4>
                                <p className="text-[10px] font-mono text-text-muted">{item.company} • {item.duration}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 hover:text-cyan-glow" onClick={() => setEditing(item)}><Edit2 size={12} /></button>
                                <button className="p-1 hover:text-red-400" onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(item._id) }}>
                                    {deleteMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                                </button>
                            </div>
                        </div>
                    ))}
                    {exp.length === 0 && <div className="text-text-muted font-mono text-sm">No experience found.</div>}
                </div>
            )}
        </div>
    )
}
