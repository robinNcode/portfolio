import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Trash2, Loader2, ImagePlus, Copy, CheckCircle2, Plus } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`
const BACKEND_URL = API_URL.replace('/api', '')

interface Media {
    _id: string
    file_name: string
    original_name: string
    url: string
    alt_text: string
    size: number
}

const fetchMedia = async (): Promise<Media[]> => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get(`${API_URL}/admin/media?limit=50`, {
        headers: { Authorization: `Bearer ${token}` }
    })
    return data.data || []
}

export default function MediaManager() {
    const queryClient = useQueryClient()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

    const { data: media = [], isLoading } = useQuery({
        queryKey: ['media'],
        queryFn: fetchMedia
    })

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const token = localStorage.getItem('token')
            return axios.delete(`${API_URL}/admin/media/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['media'] })
    })

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return
        setUploading(true)
        try {
            const token = localStorage.getItem('token')
            const formData = new FormData()
            formData.append('file', e.target.files[0])

            await axios.post(`${API_URL}/admin/media/upload`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            queryClient.invalidateQueries({ queryKey: ['media'] })
        } catch (err) {
            console.error('Failed to upload media', err)
        } finally {
            setUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const copyToClipboard = (fullUrl: string) => {
        navigator.clipboard.writeText(fullUrl)
        setCopiedUrl(fullUrl)
        setTimeout(() => setCopiedUrl(null), 2000)
    }

    if (isLoading) return <Loader2 className="w-8 h-8 text-cyan-glow animate-spin mx-auto mt-20" />

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-mono font-bold text-text-primary flex items-center gap-3">
                        <ImagePlus className="text-pink-500" size={20} /> sys.media
                    </h2>
                    <p className="font-mono text-xs text-text-muted mt-1">Manage public gallery files</p>
                </div>
                <div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-2 font-mono text-xs bg-pink-500/10 text-pink-500 px-4 py-2 rounded border border-pink-500/20 hover:bg-pink-500/20 disabled:opacity-50"
                    >
                        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} UPLOAD_FILE
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {media.map((item) => {
                    const fullUrl = `${BACKEND_URL}${item.url}`
                    return (
                        <div key={item._id} className="bg-bg-surface border border-bg-border rounded-lg overflow-hidden group relative">
                            <div className="aspect-square bg-bg-base relative">
                                <img src={fullUrl} alt={item.alt_text} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm">
                                    <button
                                        onClick={() => copyToClipboard(fullUrl)}
                                        className="p-2 bg-text-primary text-bg-base rounded hover:bg-cyan-glow transition-colors"
                                        title="Copy URL"
                                    >
                                        {copiedUrl === fullUrl ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                    </button>
                                    <button
                                        onClick={() => { if (confirm('Delete media?')) deleteMutation.mutate(item._id) }}
                                        className="p-2 bg-text-primary text-bg-base rounded hover:bg-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-2">
                                <p className="font-mono text-[10px] text-text-secondary truncate" title={item.original_name}>
                                    {item.original_name}
                                </p>
                                <p className="font-mono text-[9px] text-text-muted mt-0.5">
                                    {(item.size / 1024).toFixed(1)} KB
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            {media.length === 0 && (
                <div className="text-center py-12 font-mono text-text-muted text-sm border border-dashed border-bg-border rounded-lg">
                    No media items found.
                </div>
            )}
        </div>
    )
}
