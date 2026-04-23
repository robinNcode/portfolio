const mongoose = require('mongoose')

const localizedField = {
    en: { type: String, default: '' },
    bn: { type: String, default: '' },
}

const seriesSchema = new mongoose.Schema(
    {
        name: localizedField,
        slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
        description: localizedField,
        cover_image: { type: String, default: null },
        articles: [
            {
                blog_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
                order: { type: Number },
            },
        ],
        is_published: { type: Boolean, default: false },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Series', seriesSchema)
