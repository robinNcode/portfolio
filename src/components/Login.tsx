import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Terminal, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoggingIn(true)

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
            const { token, user } = response.data.data
            login(token, user)
            navigate('/')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
        } finally {
            setIsLoggingIn(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg-base px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-bg-surface border border-bg-border rounded-xl p-8 shadow-2xl relative overflow-hidden group">
                    {/* Animated accent gradient */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-glow/50 to-transparent" />

                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-cyan-faint rounded-lg">
                            <Terminal className="text-cyan-glow" size={24} />
                        </div>
                        <h1 className="text-2xl font-mono font-bold tracking-tight text-text-primary">
                            auth.authenticate()
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-2">
                                <Mail size={12} /> Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-cyan-glow/50 transition-colors font-mono text-sm"
                                placeholder="root@localhost"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono uppercase tracking-wider text-text-muted flex items-center gap-2">
                                <Lock size={12} /> Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-bg-base border border-bg-border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-cyan-glow/50 transition-colors font-mono text-sm"
                                placeholder="********"
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-400 text-xs font-mono bg-red-400/5 p-3 rounded border border-red-400/20"
                            >
                                {`Error: ${error}`}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full bg-cyan-glow/10 hover:bg-cyan-glow/20 border border-cyan-glow/50 text-cyan-glow font-mono py-3 rounded-lg transition-all flex items-center justify-center gap-2 group/btn disabled:opacity-50"
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Execute Login</span>
                                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-text-muted font-mono">
                        New here?{' '}
                        <Link to="/register" className="text-cyan-glow hover:underline underline-offset-4">
                            auth.register_new()
                        </Link>
                    </p>
                </div>

                {/* Decorative elements */}
                <div className="mt-6 flex justify-center gap-4 text-[10px] text-text-muted/40 font-mono">
                    <span>PORT: 5000</span>
                    <span>•</span>
                    <span>STATUS: OPERATIONAL</span>
                    <span>•</span>
                    <span>v1.0.0</span>
                </div>
            </motion.div>
        </div>
    )
}
