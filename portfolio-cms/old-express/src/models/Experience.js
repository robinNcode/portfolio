const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema(
    {
        exp_id: { type: String, required: true, unique: true },
        company: { type: String, required: true },
        role: { type: String, required: true },
        period: { type: String, required: true },
        duration: { type: String, default: '' },
        location: { type: String, default: '' },
        product: { type: String, default: null },
        product_url: { type: String, default: null },
        process: { type: String, default: null },
        status: { type: String, enum: ['active', 'completed'], default: 'completed' },
        tagline: { type: String, default: '' },
        problem_solved: { type: String, default: '' },
        impact: [{ type: String }],
        leadership: [{ type: String }],
        stack: [{ type: String }],
        award: { type: String, default: null },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Experience', experienceSchema)
