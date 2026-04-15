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
    const { data: exp = [], isLoading } = useQuery({
        queryKey: ['experience'],
        queryFn: fetchExperience
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

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                    <Briefcase className="text-cyan-glow" size={20} /> sys.exp
                </h2>
                <button className="text-xs font-mono text-cyan-glow hover:underline underline-offset-4">+ NEW_EXP</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.map((item) => (
                    <div key={item._id} className="bg-bg-surface border border-bg-border rounded-lg p-4 flex items-center justify-between group">
                        <div>
                            <h4 className="font-mono font-bold text-sm text-text-primary">{item.position}</h4>
                            <p className="text-[10px] font-mono text-text-muted">{item.company} • {item.duration}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:text-cyan-glow"><Edit2 size={12} /></button>
                            <button className="p-1 hover:text-red-400" onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(item._id) }}>
                                {deleteMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
