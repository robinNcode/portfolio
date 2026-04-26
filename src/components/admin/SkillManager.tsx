import React, { useState } from 'react'
import axios from 'axios'
import { Plus, Edit2, Trash2, Save, X, Loader2, Award } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

interface Skill {
    _id: string
    category: string
    icon: string
    color: string
    items: string[]
    order: number
}

const fetchSkills = async (): Promise<Skill[]> => {
    const { data } = await axios.get(`${API_URL}/skills`)
    return data.data || data || []
}

export default function SkillManager() {
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState<Partial<Skill> | null>(null)

    const { data: skills = [], isLoading } = useQuery({
        queryKey: ['skills'],
        queryFn: fetchSkills
    })

    const saveMutation = useMutation({
        mutationFn: async (data: Partial<Skill>) => {
            const token = localStorage.getItem('token')
            if (data._id) {
                return axios.put(`${API_URL}/admin/skill/${data._id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            return axios.post(`${API_URL}/admin/skill`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] })
            setEditing(null)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token')
            return axios.delete(`${API_URL}/admin/skill/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['skills'] })
    })

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (editing) saveMutation.mutate(editing)
    }

    const parseArray = (val: string) => val.split(',').map(s => s.trim()).filter(Boolean)
    const joinArray = (arr?: string[]) => arr ? arr.join(', ') : ''

    const getEmptySkill = (): Partial<Skill> => ({
        category: '',
        icon: '',
        color: '',
        items: [],
        order: 0
    })

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                    <Award className="text-orange-500" size={20} /> stack.skills
                </h2>
                {!editing && (
                    <button onClick={() => setEditing(getEmptySkill())} className="flex items-center gap-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-500 font-mono text-xs px-4 py-2 rounded-lg transition-all">
                        <Plus size={14} /> ADD_SKILL
                    </button>
                )}
            </div>

            {editing ? (
                <div className="bg-bg-surface border border-bg-border rounded-xl p-6 shadow-xl animate-in fade-in max-w-lg">
                    <div className="flex justify-between mb-4 items-center">
                        <h3 className="font-mono font-bold text-text-primary text-sm">{editing._id ? 'EDIT_SKILL_CATEGORY' : 'CREATE_SKILL_CATEGORY'}</h3>
                        <button onClick={() => setEditing(null)} className="text-text-muted hover:text-text-primary"><X size={16} /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono text-text-muted uppercase">Category Name (e.g. Frontend Systems)</label>
                            <input
                                required autoFocus className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-orange-500/50"
                                value={editing.category || ''}
                                onChange={e => setEditing({ ...editing, category: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Icon</label>
                                <input
                                    className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-orange-500/50"
                                    value={editing.icon || ''}
                                    placeholder="◈"
                                    onChange={e => setEditing({ ...editing, icon: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Color (Hex)</label>
                                <input
                                    className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-orange-500/50"
                                    value={editing.color || ''}
                                    placeholder="#22d3ee"
                                    onChange={e => setEditing({ ...editing, color: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Order</label>
                                <input
                                    type="number"
                                    required className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-orange-500/50"
                                    value={editing.order || 0}
                                    onChange={e => setEditing({ ...editing, order: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-mono text-text-muted uppercase">Items (comma separated)</label>
                            <textarea
                                required rows={3}
                                className="w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-sm font-mono text-text-primary focus:outline-none focus:border-orange-500/50 resize-none"
                                value={joinArray(editing.items)}
                                onChange={e => setEditing({ ...editing, items: parseArray(e.target.value) })}
                                placeholder="React.js, Vue.js, TypeScript..."
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button type="submit" disabled={saveMutation.isPending} className="flex gap-2 items-center bg-orange-500 text-bg-base font-bold font-mono text-xs px-4 py-2 rounded disabled:opacity-50 hover:brightness-110 transition-colors">
                                {saveMutation.isPending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} SAVE
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skill) => (
                        <div key={skill._id} className="bg-bg-surface border border-bg-border rounded-lg p-4 group hover:border-orange-500/30 transition-all">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span style={{ color: skill.color }}>{skill.icon}</span>
                                    <h3 className="font-mono font-bold text-sm text-text-primary">{skill.category}</h3>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 hover:text-cyan-glow" onClick={() => setEditing(skill)}><Edit2 size={12} /></button>
                                    <button className="p-1 hover:text-red-400" onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(skill._id) }}>
                                        {deleteMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {skill.items && skill.items.map(item => (
                                    <span key={item} className="text-[10px] font-mono bg-bg-base text-text-secondary px-2 py-0.5 rounded border border-bg-border">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                    {skills.length === 0 && <div className="col-span-2 text-text-muted font-mono text-sm text-center py-8">No skills found.</div>}
                </div>
            )}
        </div>
    )
}
