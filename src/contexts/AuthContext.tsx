import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

interface User {
    _id: string
    name: string
    email: string
    role: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    loading: boolean
    login: (token: string, user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001/api`

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMe = async () => {
            if (!token) {
                setLoading(false)
                return
            }

            try {
                const response = await axios.get(`${API_URL}/admin/auth/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(response.data.data.user)
            } catch (err) {
                console.error('Failed to fetch user', err)
                logout()
            } finally {
                setLoading(false)
            }
        }

        fetchMe()
    }, [token])

    const login = (newToken: string, newUser: User) => {
        setToken(newToken)
        setUser(newUser)
        localStorage.setItem('token', newToken)
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
