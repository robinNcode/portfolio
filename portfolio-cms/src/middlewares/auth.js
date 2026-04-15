const { verify } = require('../utils/jwt')
const { error } = require('../utils/apiResponse')

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return error(res, 'No token provided', 401)
    }
    const token = authHeader.split(' ')[1]
    try {
        req.user = verify(token)
        next()
    } catch (err) {
        return error(res, 'Invalid or expired token', 401)
    }
}

const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return error(res, 'Admin access required', 403)
    }
    next()
}

module.exports = { authenticate, requireAdmin }
