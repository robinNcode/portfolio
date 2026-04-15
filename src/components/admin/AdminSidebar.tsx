import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Code2,
    Layers,
    Terminal,
    ChevronRight,
    LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const MENU_ITEMS = [
    { id: 'dash', label: 'system.dash', icon: LayoutDashboard, path: '/admin' },
    { id: 'blogs', label: 'logs.blog', icon: FileText, path: '/admin/blogs' },
    { id: 'series', label: 'logs.series', icon: Layers, path: '/admin/series' },
    { id: 'media', label: 'sys.media', icon: Code2, path: '/admin/media' },
    { id: 'projects', label: 'pkg.projects', icon: Briefcase, path: '/admin/projects' },
    { id: 'experience', label: 'sys.exp', icon: Layers, path: '/admin/experience' },
    { id: 'skills', label: 'stack.skills', icon: Code2, path: '/admin/skills' },
]

export default function AdminSidebar() {
    const { logout, user } = useAuth()

    return (
        <aside className="w-64 bg-bg-surface border-r border-bg-border h-screen sticky top-0 flex flex-col p-6 overflow-hidden">
            <div className="flex items-center gap-2 text-cyan-glow mb-12">
                <Terminal size={20} />
                <span className="font-mono font-bold tracking-tight">admin_panel</span>
                <span className="text-[10px] bg-cyan-faint px-1.5 py-0.5 rounded text-cyan-glow uppercase">v1.0</span>
            </div>

            <nav className="flex-1 space-y-2">
                {MENU_ITEMS.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) => `
                            flex items-center justify-between group px-4 py-3 rounded-lg transition-all
                            ${isActive
                                ? 'bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20'
                                : 'text-text-muted hover:text-text-primary hover:bg-bg-base/50'}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon size={18} />
                            <span className="font-mono text-xs uppercase tracking-wider">{item.label}</span>
                        </div>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-bg-border">
                <div className="flex items-center gap-3 mb-6 px-4">
                    <div className="w-8 h-8 rounded bg-cyan-faint flex items-center justify-center text-cyan-glow font-mono text-sm">
                        {user?.name?.[0].toUpperCase()}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-mono font-bold text-text-primary truncate">{user?.name}</span>
                        <span className="text-[10px] font-mono text-text-muted truncate lowercase">{user?.role}</span>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-text-muted hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all group"
                >
                    <LogOut size={18} />
                    <span className="font-mono text-xs uppercase tracking-wider">sys.exit();</span>
                </button>
            </div>
        </aside>
    )
}
