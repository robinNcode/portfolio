const mongoose = require('mongoose')
const { mongoUri, nodeEnv } = require('./env')

const connect = async () => {
    try {
        await mongoose.connect(mongoUri)
        console.log(`[DB] MongoDB connected (${nodeEnv})`)
    } catch (err) {
        console.error('[DB] Connection error:', err.message)
        process.exit(1)
    }
}

mongoose.connection.on('disconnected', () => {
    console.warn('[DB] MongoDB disconnected')
})

module.exports = { connect }
