import React, { useState } from 'react'
import axios from 'axios'
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import MDEditor from '@uiw/react-md-editor'
import slugify from 'slugify'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

interface Blog {
    _id: string
    title: {
        en: string
        bn: string
    }
    slug: string
    content: string
    cover_image?: string
    tags: string[]
    images: string[]
    is_published: boolean
    language?: string
    series_id?: string
    created_at: string
}

export default function BlogManager() {
    const queryClient = useQueryClient()
    const [editingBlog, setEditingBlog] = useState<Partial<Blog> | null>(null)
    const [tagInput, setTagInput] = useState('')
    const [showMediaPicker, setShowMediaPicker] = useState(false)
    const [pickerTarget, setPickerTarget] = useState<'cover' | 'inline'>('cover')

    const { data: media = [] } = useQuery({
        queryKey: ['media'],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(`${API_URL}/admin/media?limit=50`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return data.data || []
        }
    })
    const { data: blogs = [], isLoading } = useQuery({
        queryKey: ['admin_blogs'],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(`${API_URL}/admin/blogs`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return data.data || []
        }
    })

    const { data: series = [] } = useQuery({
        queryKey: ['series'],
        queryFn: async () => {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(`${API_URL}/admin/series`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return data.data || []
        }
    })

    const saveMutation = useMutation({
        mutationFn: async (data: Partial<Blog>) => {
            const token = localStorage.getItem('token')
            if (data._id) {
                return axios.put(`${API_URL}/admin/blog/${data._id}`, data, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            return axios.post(`${API_URL}/admin/blog`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin_blogs'] })
            setEditingBlog(null)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token')
            return axios.delete(`${API_URL}/admin/blog/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin_blogs'] })
    })

    const togglePublishMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token')
            return axios.put(`${API_URL}/admin/blog/${id}/publish`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin_blogs'] })
    })

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingBlog) saveMutation.mutate(editingBlog)
    }

    const addTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault()
            const currentTags = editingBlog?.tags || []
            if (!currentTags.includes(tagInput.trim())) {
                setEditingBlog({ ...editingBlog, tags: [...currentTags, tagInput.trim()] })
            }
            setTagInput('')
        }
    }

    const removeTag = (tag: string) => {
        setEditingBlog({
            ...editingBlog,
            tags: (editingBlog?.tags || []).filter(t => t !== tag)
        })
    }

    const selectMedia = (url: string) => {
        if (!editingBlog) return
        if (pickerTarget === 'cover') {
            setEditingBlog({ ...editingBlog, cover_image: url })
        } else {
            const fullImageUrl = `${BACKEND_URL}${url}`
            const imgMarkdown = `\n![image](${fullImageUrl})\n`
            setEditingBlog({ ...editingBlog, content: (editingBlog.content || '') + imgMarkdown })
        }
        setShowMediaPicker(false)
    }

    const BACKEND_URL = API_URL.replace('/api', '')

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-mono font-bold text-text-primary">blog.manager()</h1>
                    <p className="text-sm text-text-muted mt-1 font-mono">Create and manage your technical logs.</p>
                </div>
                {!editingBlog && (
                    <button
                        onClick={() => setEditingBlog({
                            title: { en: '', bn: '' },
                            slug: '',
                            content: '',
                            cover_image: '',
                            tags: [],
                            is_published: false,
                            language: 'en'
                        })}
                        className="flex items-center gap-2 bg-cyan-glow/10 hover:bg-cyan-glow/20 border border-cyan-glow/30 text-cyan-glow font-mono text-xs px-4 py-2 rounded-lg transition-all"
                    >
                        <Plus size={16} /> NEW_ENTRY
                    </button>
                )}
            </div>

            {editingBlog ? (
                <div className="bg-bg-surface border border-bg-border rounded-xl p-8 shadow-2xl relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-lg font-mono font-bold text-text-primary">
                            {editingBlog._id ? 'ENTRY::UPDATE' : 'ENTRY::CREATE'}
                        </h2>
                        <button onClick={() => setEditingBlog(null)} className="text-text-muted hover:text-text-primary">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Title (EN)</label>
                                <input
                                    type="text" required value={editingBlog.title?.en || ''}
                                    onChange={e => {
                                        const en = e.target.value
                                        const title = { ...(editingBlog.title || { en: '', bn: '' }), en }
                                        setEditingBlog({
                                            ...editingBlog,
                                            title,
                                            slug: slugify(en, { lower: true, strict: true })
                                        })
                                    }}
                                    className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Title (BN)</label>
                                <input
                                    type="text" value={editingBlog.title?.bn || ''}
                                    onChange={e => {
                                        const bn = e.target.value
                                        const title = { ...(editingBlog.title || { en: '', bn: '' }), bn }
                                        setEditingBlog({ ...editingBlog, title })
                                    }}
                                    className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-text-muted uppercase">Slug (Auto-generated from EN)</label>
                            <input
                                type="text" required value={editingBlog.slug || ''}
                                onChange={e => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                                className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Language</label>
                                <select
                                    value={editingBlog.language || 'en'}
                                    onChange={e => setEditingBlog({ ...editingBlog, language: e.target.value })}
                                    className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50"
                                >
                                    <option value="en">English (EN)</option>
                                    <option value="bn">Bengali (BN)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-text-muted uppercase">Series (Optional)</label>
                                <select
                                    value={editingBlog.series_id || ''}
                                    onChange={e => setEditingBlog({ ...editingBlog, series_id: e.target.value || undefined })}
                                    className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-cyan-glow/50"
                                >
                                    <option value="">None</option>
                                    {series.map((s: any) => (
                                        <option key={s._id} value={s._id}>{s.name?.en || s.name?.bn}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2 flex flex-col justify-end">
                                <label className="flex items-center gap-2 cursor-pointer p-2 border border-bg-border rounded-lg bg-bg-base">
                                    <input
                                        type="checkbox"
                                        checked={editingBlog.is_published || false}
                                        onChange={e => setEditingBlog({ ...editingBlog, is_published: e.target.checked })}
                                        className="accent-cyan-glow"
                                    />
                                    <span className="text-sm font-mono text-text-primary">Publish Immediately</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-text-muted uppercase">Tags (Press Enter)</label>
                            <div className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 focus-within:border-cyan-glow/50 min-h-[42px] flex items-center flex-wrap gap-2">
                                {(editingBlog.tags || []).map(tag => (
                                    <span key={tag} className="flex items-center gap-1 bg-cyan-glow/10 text-cyan-glow text-xs font-mono px-2 py-1 rounded">
                                        {tag} <button type="button" onClick={() => removeTag(tag)}><X size={12} /></button>
                                    </span>
                                ))}
                                <input
                                    type="text" value={tagInput}
                                    onChange={e => setTagInput(e.target.value)}
                                    onKeyDown={addTag}
                                    className="bg-transparent border-none outline-none text-sm font-mono flex-1 min-w-[100px]"
                                    placeholder="Add tag..."
                                />
                            </div>
                        </div>

                        <div className="md:col-span-1 space-y-2">
                             <label className="text-[10px] font-mono text-text-muted uppercase">Cover Image</label>
                             <div className="flex gap-4">
                                {editingBlog.cover_image ? (
                                    <div className="relative group/img w-32 h-20 rounded-lg overflow-hidden border border-bg-border bg-bg-base">
                                        <img src={editingBlog.cover_image.startsWith('http') ? editingBlog.cover_image : `${BACKEND_URL}${editingBlog.cover_image}`} className="w-full h-full object-cover" />
                                        <button 
                                            type="button" 
                                            onClick={() => setEditingBlog({...editingBlog, cover_image: ''})}
                                            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity text-white"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        type="button"
                                        onClick={() => { setPickerTarget('cover'); setShowMediaPicker(true); }}
                                        className="w-32 h-20 border border-dashed border-bg-border rounded-lg flex flex-col items-center justify-center gap-1 text-text-muted hover:border-cyan-glow hover:text-cyan-glow transition-all"
                                    >
                                        <ImageIcon size={20} />
                                        <span className="text-[9px] font-mono">SELECT</span>
                                    </button>
                                )}
                                <div className="flex-1 space-y-2">
                                    <input 
                                        type="text" 
                                        placeholder="Or paste external URL..." 
                                        value={editingBlog.cover_image || ''}
                                        onChange={e => setEditingBlog({...editingBlog, cover_image: e.target.value})}
                                        className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-2 text-[10px] font-mono focus:outline-none focus:border-cyan-glow/50"
                                    />
                                    <p className="text-[9px] text-text-muted font-mono">Recommended: 1200x630px</p>
                                </div>
                             </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono text-text-muted uppercase flex justify-between">
                                <span>Rich Content (MDX Supported)</span>
                                <button 
                                    type="button"
                                    onClick={() => { setPickerTarget('inline'); setShowMediaPicker(true); }}
                                    className="text-pink-400 hover:underline flex items-center gap-1"
                                >
                                    <ImageIcon size={12} /> ATTACH_IMAGE
                                </button>
                            </label>
                            <div data-color-mode="dark">
                                <MDEditor
                                    value={editingBlog.content || ''}
                                    onChange={val => setEditingBlog({ ...editingBlog, content: val || '' })}
                                    height={400}
                                    className="!bg-bg-base !border-bg-border"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-bg-border">
                            <button
                                type="button"
                                onClick={() => setEditingBlog(null)}
                                className="px-6 py-2 rounded-lg text-text-muted font-mono text-xs hover:text-text-primary transition-all"
                            >
                                ABORT
                            </button>
                            <button
                                type="submit"
                                disabled={saveMutation.isPending}
                                className="flex items-center gap-2 bg-cyan-glow text-bg-base px-6 py-2 rounded-lg font-mono text-xs font-bold hover:brightness-110 transition-all disabled:opacity-50"
                            >
                                {saveMutation.isPending ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                                EXECUTE
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-bg-surface border border-bg-border rounded-xl overflow-hidden">
                    <table className="w-full text-left font-mono">
                        <thead className="bg-bg-base/50 text-[10px] text-text-muted uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-medium italic">Title & Tags</th>
                                <th className="px-6 py-4 font-medium italic">Status</th>
                                <th className="px-6 py-4 font-medium italic text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-bg-border">
                            {blogs.map((blog: Blog) => (
                                <tr key={blog._id} className="hover:bg-bg-base/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-text-primary font-bold block">
                                            {blog.title?.en}
                                            {blog.title?.bn && <span className="text-text-muted font-normal ml-2">| {blog.title.bn}</span>}
                                        </span>
                                        <div className="flex gap-1 mt-1 flex-wrap">
                                            {blog.tags?.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[9px] bg-bg-base text-text-muted px-1.5 rounded">{tag}</span>
                                            ))}
                                            {blog.tags?.length > 3 && <span className="text-[9px] text-text-muted">+{blog.tags.length - 3}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded ${blog.is_published ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                            {blog.is_published ? 'LIVE' : 'DRAFT'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => togglePublishMutation.mutate(blog._id)}
                                                className="p-1.5 hover:text-cyan-glow transition-colors"
                                                title={blog.is_published ? 'Unpublish' : 'Publish'}
                                                disabled={togglePublishMutation.isPending}
                                            >
                                                {blog.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                            <button onClick={() => setEditingBlog(blog)} className="p-1.5 hover:text-cyan-glow transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(blog._id) }}
                                                className="p-1.5 hover:text-red-400 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Media Picker Modal */}
            {showMediaPicker && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/40">
                    <div className="bg-bg-surface border border-bg-border rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl shadow-black/50 overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-bg-border flex items-center justify-between bg-bg-base/30">
                            <div>
                                <h3 className="font-mono font-bold text-text-primary uppercase tracking-wider">Select Media</h3>
                                <p className="text-[10px] text-text-muted font-mono mt-1">
                                    {pickerTarget === 'cover' ? 'Choosing cover photo for this log entry' : 'Select image to insert into content'}
                                </p>
                            </div>
                            <button onClick={() => setShowMediaPicker(false)} className="text-text-muted hover:text-text-primary transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {media.map((item: any) => (
                                <div 
                                    key={item._id} 
                                    onClick={() => selectMedia(item.url)}
                                    className="aspect-square bg-bg-base border border-bg-border rounded-lg overflow-hidden cursor-pointer hover:border-cyan-glow group relative"
                                >
                                    <img src={`${BACKEND_URL}${item.url}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-cyan-glow/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-cyan-glow text-bg-base font-bold font-mono text-[10px] px-2 py-1 rounded">SELECT</span>
                                    </div>
                                </div>
                            ))}
                            {media.length === 0 && (
                                <div className="col-span-full py-12 text-center text-text-muted font-mono">
                                    No media found. Upload images in the Media section first.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
