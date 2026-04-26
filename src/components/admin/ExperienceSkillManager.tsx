import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Edit2, Trash2, Save, X, Loader2, Award, Briefcase } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

interface Item {
    _id: string
    [key: string]: any
}

export default function ExperienceSkillManager() {
    const [exp, setExp] = useState<Item[]>([])
    const [skills, setSkills] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            const [e, s] = await Promise.all([
                axios.get(`${API_URL}/experience`),
                axios.get(`${API_URL}/skills`)
            ])
            setExp(e.data.data || [])
            setSkills(s.data.data || [])
        } catch (err) {
            console.error('Failed to fetch data', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-12">
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                        <Briefcase className="text-cyan-glow" size={20} /> sys.exp
                    </h2>
                    <button className="text-xs font-mono text-cyan-glow hover:underline underline-offset-4">+ NEW_EXP</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.map(item => (
                        <div key={item._id} className="bg-bg-surface border border-bg-border rounded-lg p-4 flex items-center justify-between group">
                            <div>
                                <h4 className="font-mono font-bold text-sm text-text-primary">{item.position}</h4>
                                <p className="text-[10px] font-mono text-text-muted">{item.company} • {item.duration}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 hover:text-cyan-glow"><Edit2 size={12} /></button>
                                <button className="p-1 hover:text-red-400"><Trash2 size={12} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                        <Award className="text-orange-500" size={20} /> stack.skills
                    </h2>
                    <button className="text-xs font-mono text-orange-500 hover:underline underline-offset-4">+ NEW_SKILL</button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {skills.map(skill => (
                        <div key={skill._id} className="bg-bg-surface border border-bg-border rounded-lg px-4 py-2 flex items-center gap-3 group">
                            <span className="text-xs font-mono text-text-primary">{skill.name}</span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 hover:text-cyan-glow"><Edit2 size={10} /></button>
                                <button className="p-1 hover:text-red-400"><Trash2 size={10} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
