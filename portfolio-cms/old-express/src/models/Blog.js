const mongoose = require('mongoose')

const localizedField = {
    en: { type: String, default: '' },
    bn: { type: String, default: '' },
}

const blogSchema = new mongoose.Schema(
    {
        title: localizedField,
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        content: { type: String, default: '' },        // MDX/Markdown string
        excerpt: { type: String, default: '' },
        language: { type: String, enum: ['en', 'bn', 'both'], default: 'en' },
        series_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', default: null },
        series_order: { type: Number, default: null },
        tags: [{ type: String, trim: true }],
        cover_image: { type: String, default: null },   // URL
        is_published: { type: Boolean, default: false },
        published_at: { type: Date, default: null },
        read_time: { type: Number, default: 0 },        // minutes
        view_count: { type: Number, default: 0 },
    },
    { timestamps: true }
)

// Full-text search indexes
blogSchema.index(
    { 'title.en': 'text', 'title.bn': 'text', tags: 'text', excerpt: 'text' },
    { language_override: 'dummy_language' }
)
blogSchema.index({ is_published: 1, published_at: -1 })
blogSchema.index({ series_id: 1, series_order: 1 })
blogSchema.index({ language: 1 })

module.exports = mongoose.model('Blog', blogSchema)
