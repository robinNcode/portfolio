const User = require('../models/User')
const { sign } = require('../utils/jwt')

class AuthService {
    async login(email, password) {
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user) return null
        const valid = await user.comparePassword(password)
        if (!valid) return null
        const token = sign({ id: user._id, email: user.email, role: user.role })
        return { token, user }
    }

    async ensureAdminExists(email, password) {
        const exists = await User.findOne({ email })
        if (!exists) {
            const admin = new User({ email, password, role: 'admin', name: 'Robin Admin' })
            await admin.save()
            console.log('[Auth] Admin user seeded:', email)
        }
    }
}

module.exports = new AuthService()
