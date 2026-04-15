import React, { useState } from 'react'
import axios from 'axios'
import { Plus, Edit2, Trash2, Save, X, Loader2, Award } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

interface Skill {
    _id: string
    name: string
    [key: string]: any
}

const fetchSkills = async (): Promise<Skill[]> => {
    const { data } = await axios.get(`${API_URL}/skills`)
    return data.data || []
}

export default function SkillManager() {
    const queryClient = useQueryClient()
    const { data: skills = [], isLoading } = useQuery({
        queryKey: ['skills'],
        queryFn: fetchSkills
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

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                    <Award className="text-orange-500" size={20} /> stack.skills
                </h2>
                <button className="text-xs font-mono text-orange-500 hover:underline underline-offset-4">+ NEW_SKILL</button>
            </div>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                    <div key={skill._id} className="bg-bg-surface border border-bg-border rounded-lg px-4 py-2 flex items-center gap-3 group">
                        <span className="text-xs font-mono text-text-primary">{skill.name}</span>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:text-cyan-glow"><Edit2 size={10} /></button>
                            <button className="p-1 hover:text-red-400" onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(skill._id) }}>
                                {deleteMutation.isPending ? <Loader2 size={10} className="animate-spin" /> : <Trash2 size={10} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
