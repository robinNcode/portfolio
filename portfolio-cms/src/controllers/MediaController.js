const mediaService = require('../services/MediaService')
const { success, created, error, paginated } = require('../utils/apiResponse')
const { upload: uploadConfig } = require('../config/env')
const path = require('path')

const uploadMedia = async (req, res) => {
    if (!req.file) return error(res, 'No file uploaded', 400)
    const media = await mediaService.saveMedia({
        file: req.file,
        altText: req.body.alt_text || '',
        userId: req.user?.id,
    })
    return created(res, media, 'Media uploaded')
}

const listMedia = async (req, res) => {
    const { page = 1, limit = 20 } = req.query
    const result = await mediaService.listMedia({ page: +page, limit: +limit })
    return paginated(res, result)
}

const deleteMedia = async (req, res) => {
    const dir = path.resolve(uploadConfig.dir)
    const media = await mediaService.deleteMedia(req.params.id, dir)
    if (!media) return error(res, 'Media not found', 404)
    return success(res, null, 'Media deleted')
}

module.exports = { uploadMedia, listMedia, deleteMedia }
