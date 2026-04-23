const mediaRepo = require('../repositories/MediaRepository')
const fs = require('fs')
const path = require('path')

class MediaService {
    async saveMedia({ file, altText, userId }) {
        const url = `/uploads/${file.filename}`
        return mediaRepo.create({
            file_name: file.filename,
            original_name: file.originalname,
            url,
            alt_text: altText || '',
            size: file.size,
            mime_type: file.mimetype,
            uploaded_by: userId,
        })
    }

    async listMedia(options = {}) {
        return mediaRepo.findAll({}, options)
    }

    async deleteMedia(id, uploadDir) {
        const media = await mediaRepo.findById(id)
        if (!media) return null
        // Remove file from disk
        const filePath = path.join(uploadDir, media.file_name)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
        return mediaRepo.deleteById(id)
    }
}

module.exports = new MediaService()
