const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema(
    {
        file_name: { type: String, required: true },
        original_name: { type: String, required: true },
        url: { type: String, required: true },
        alt_text: { type: String, default: '' },
        size: { type: Number, required: true },           // bytes
        mime_type: { type: String, required: true },
        uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Media', mediaSchema)
