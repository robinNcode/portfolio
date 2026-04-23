const multer = require('multer')
const path = require('path')
const { upload: uploadConfig } = require('../config/env')
const { error } = require('../utils/apiResponse')

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadConfig.dir),
    filename: (req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
        cb(null, `${unique}${path.extname(file.originalname)}`)
    },
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/
    const extOk = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeOk = allowedTypes.test(file.mimetype)
    if (extOk && mimeOk) return cb(null, true)
    cb(new Error('Only image files are allowed'))
}

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: uploadConfig.maxSizeMb * 1024 * 1024 },
})

// Error handler wrapper for multer errors
const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message === 'Only image files are allowed') {
        return error(res, err.message, 400)
    }
    next(err)
}

module.exports = { upload, handleUploadError }
