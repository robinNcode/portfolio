import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Users, GitFork, Star, Eye } from 'lucide-react'

interface GitHubStats {
  followers: number
  following: number
  public_repos: number
  total_stars: number
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch('https://api.github.com/users/robinncode'),
          fetch('https://api.github.com/users/robinncode/repos?per_page=100')
        ])

        if (!userResponse.ok) {
          throw new Error('Failed to fetch GitHub stats')
        }

        const userData = await userResponse.json()
        let totalStars = 0

        if (reposResponse.ok) {
          try {
            const reposData = await reposResponse.json()
            if (Array.isArray(reposData)) {
              totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0)
            }
          } catch (e) {
            console.warn('Failed to parse repository payload for live stars.')
          }
        }

        setStats({ ...userData, total_stars: totalStars })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load stats')
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-bg-card border border-bg-border rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-bg-border rounded mb-2"></div>
            <div className="h-6 bg-bg-border rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !stats) {
    return (
      <div className="bg-bg-card border border-bg-border rounded-lg p-4 text-center">
        <Github size={24} className="text-text-muted mx-auto mb-2" />
        <p className="text-text-muted text-sm">Unable to load GitHub stats</p>
      </div>
    )
  }

  const statItems = [
    {
      icon: Users,
      label: 'Followers',
      value: stats.followers,
      color: 'text-cyan-glow',
    },
    {
      icon: GitFork,
      label: 'Repositories',
      value: stats.public_repos,
      color: 'text-orange-accent',
    },
    {
      icon: Star,
      label: 'Stars',
      value: stats.total_stars,
      color: 'text-amber-400',
    },
    {
      icon: Eye,
      label: 'Following',
      value: stats.following,
      color: 'text-purple-400',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-bg-card border border-bg-border rounded-lg p-4 hover:border-cyan-glow/30 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <item.icon size={16} className={item.color} />
            <span className="font-mono text-xs text-text-muted">{item.label}</span>
          </div>
          <div className={`font-display font-bold text-xl ${item.color}`}>
            {item.value.toLocaleString()}
          </div>
        </motion.div>
      ))}
    </div>
  )
}