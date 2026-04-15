import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
    children: React.ReactNode
    requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, token, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-base">
                <Loader2 className="w-8 h-8 text-cyan-glow animate-spin" />
            </div>
        )
    }

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (requireAdmin && user?.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
