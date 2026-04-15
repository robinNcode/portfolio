import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-bg-base text-text-primary font-body relative overflow-hidden">
            {/* Background pattern */}
            <div className="fixed inset-0 dot-grid opacity-[0.4] pointer-events-none" />

            <AdminSidebar />

            <main className="flex-1 min-w-0 h-screen overflow-y-auto custom-scrollbar relative">
                <header className="h-16 border-b border-bg-border bg-bg-base/50 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em]">System Terminal Active</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-mono text-text-muted">HOST: development</span>
                            <span className="text-[10px] font-mono text-cyan-glow/60">PORT: 3001</span>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="max-w-6xl mx-auto"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}
