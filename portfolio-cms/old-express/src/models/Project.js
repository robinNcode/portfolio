const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
    {
        project_id: { type: String, required: true, unique: true },  // e.g. 'microfin'
        name: { type: String, required: true },
        type: { type: String, required: true },
        status: { type: String, default: 'Production' },
        problem: { type: String, default: '' },
        solution: { type: String, default: '' },
        impact: { type: String, default: '' },
        stack: [{ type: String }],
        architecture: { type: String, default: '' },
        gradient: { type: String, default: 'from-cyan-900/30 to-blue-900/20' },
        accent: { type: String, default: '#22d3ee' },
        github_url: { type: String, default: null },
        live_url: { type: String, default: null },
        order: { type: Number, default: 0 },
        is_published: { type: Boolean, default: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Project', projectSchema)
