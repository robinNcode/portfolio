const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema(
    {
        category: { type: String, required: true, unique: true },
        icon: { type: String, default: '◈' },
        color: { type: String, default: '#22d3ee' },
        items: [{ type: String }],
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Skill', skillSchema)
