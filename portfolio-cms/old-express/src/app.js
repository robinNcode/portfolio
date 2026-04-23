require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const path = require('path')

const { connect: connectDB } = require('./config/db')
const { port, cors: corsConfig, upload: uploadConfig, nodeEnv } = require('./config/env')
const publicRoutes = require('./routes/public')
const adminRoutes = require('./routes/admin')
const authService = require('./services/AuthService')
const { admin } = require('./config/env')

const app = express()

// Security & logging
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors({ origin: corsConfig.origin, credentials: true }))
app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'))

// Global rate limiter
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false }))

// Body parsers
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files statically
app.use('/uploads', express.static(path.resolve(uploadConfig.dir)))

// Swagger docs
try {
    const swaggerUi = require('swagger-ui-express')
    const YAML = require('yamljs')
    const swaggerPath = path.resolve(__dirname, '../swagger/openapi.yaml')
    const swaggerDoc = YAML.load(swaggerPath)
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
} catch (e) {
    // Swagger optional
}

// Routes
app.use('/api', publicRoutes)
app.use('/api/admin', adminRoutes)

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }))

// Global error handler
app.use((err, req, res, next) => {
    console.error('[Error]', err.message)
    res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Internal Server Error' })
})

// Bootstrap
const start = async () => {
    await connectDB()
    // Seed admin user if not exists
    await authService.ensureAdminExists(admin.email, admin.password)
    app.listen(port, () => console.log(`[API] Server running on http://localhost:${port}`))
}

start()

module.exports = app
