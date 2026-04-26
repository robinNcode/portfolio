import React, { useState } from 'react'
import axios from 'axios'
import { Plus, Edit2, Trash2, Save, X, Loader2, Briefcase } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

interface Experience {
    _id: string
    exp_id: string
    company: string
    role: string
    period: string
    duration: string
    location: string
    product: string
    product_url: string
    process: string
    status: string
    tagline: string
    problem_solved: string
    impact: string[]
    leadership: string[]
    stack: string[]
    award: string
    order: number
}

const fetchExperience = async (): Promise<Experience[]> => {
    const { data } = await axios.get(`${API_URL}/experiences`)
    return data.data || data || []
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

    const parseArray = (val: string) => val.split(',').map(s => s.trim()).filter(Boolean)
    const joinArray = (arr?: string[]) => arr ? arr.join(', ') : ''

    const getEmptyExp = (): Partial<Experience> => ({
        exp_id: '',
        company: '',
        role: '',
        period: '',
        duration: '',
        location: '',
        product: '',
        product_url: '',
        process: '',
        status: 'completed',
        tagline: '',
        problem_solved: '',
        impact: [],
        leadership: [],
        stack: [],
        award: '',
        order: 0
    })

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                    <Briefcase className="text-cyan-glow" size={20} /> sys.exp
                </h2>
                {!editing && (
                    <button onClick={() => setEditing(getEmptyExp())} className="text-xs font-mono text-cyan-glow hover:underline underline-offset-4 flex items-center gap-1">
                        <Plus size={14} /> NEW_EXP
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
                                <label className="text-[10px] font-mono text-text-muted uppercase">Exp ID (Unique)</label>
                                <input required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.exp_id || ''} onChange={e => setEditing({ ...editing, exp_id: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Role</label>
                                <input required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.role || ''} onChange={e => setEditing({ ...editing, role: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Company</label>
                                <input required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.company || ''} onChange={e => setEditing({ ...editing, company: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Period (e.g. Dec 2023 - Present)</label>
                                <input required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.period || ''} onChange={e => setEditing({ ...editing, period: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Duration (e.g. 2+ years)</label>
                                <input className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.duration || ''} onChange={e => setEditing({ ...editing, duration: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Location</label>
                                <input className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.location || ''} onChange={e => setEditing({ ...editing, location: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Status</label>
                                <select className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.status || 'completed'} onChange={e => setEditing({ ...editing, status: e.target.value })}>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Order</label>
                                <input type="number" required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.order || 0} onChange={e => setEditing({ ...editing, order: parseInt(e.target.value) })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Product</label>
                                <input className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.product || ''} onChange={e => setEditing({ ...editing, product: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Product URL</label>
                                <input className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.product_url || ''} onChange={e => setEditing({ ...editing, product_url: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Process</label>
                                <input className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.process || ''} onChange={e => setEditing({ ...editing, process: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Award</label>
                                <input className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.award || ''} onChange={e => setEditing({ ...editing, award: e.target.value })} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Tagline</label>
                                <input className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary" value={editing.tagline || ''} onChange={e => setEditing({ ...editing, tagline: e.target.value })} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Problem Solved</label>
                                <textarea className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary resize-none" value={editing.problem_solved || ''} onChange={e => setEditing({ ...editing, problem_solved: e.target.value })} rows={2} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Impact (comma separated)</label>
                                <textarea className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary resize-none" value={joinArray(editing.impact)} onChange={e => setEditing({ ...editing, impact: parseArray(e.target.value) })} rows={2} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Leadership (comma separated)</label>
                                <textarea className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary resize-none" value={joinArray(editing.leadership)} onChange={e => setEditing({ ...editing, leadership: parseArray(e.target.value) })} rows={2} />
                            </div>
                            <div className="col-span-2 space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Stack (comma separated)</label>
                                <textarea className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary resize-none" value={joinArray(editing.stack)} onChange={e => setEditing({ ...editing, stack: parseArray(e.target.value) })} rows={2} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button type="submit" disabled={saveMutation.isPending} className="flex gap-2 items-center bg-cyan-glow text-bg-base font-bold font-mono text-xs px-4 py-2 rounded disabled:opacity-50 hover:bg-cyan-400 transition-colors">
                                {saveMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SAVE
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {exp.map((item) => (
                        <div key={item._id} className="bg-bg-surface border border-bg-border rounded-lg p-4 flex items-center justify-between group hover:border-cyan-glow/30 transition-colors">
                            <div>
                                <h4 className="font-mono font-bold text-sm text-text-primary">{item.role}</h4>
                                <p className="text-[10px] font-mono text-text-muted">{item.company} • {item.period}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 bg-cyan-glow/10 text-cyan-glow hover:bg-cyan-glow/20 rounded-md transition-colors" onClick={() => setEditing(item)}><Edit2 size={14} /></button>
                                <button className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-md transition-colors" onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(item._id) }}>
                                    {deleteMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                </button>
                            </div>
                        </div>
                    ))}
                    {exp.length === 0 && <div className="text-text-muted font-mono text-sm text-center py-8">No experience found.</div>}
                </div>
            )}
        </div>
    )
}
