const { error } = require('../utils/apiResponse')

const validate = (schema) => (req, res, next) => {
    const { error: joiError } = schema.validate(req.body, { abortEarly: false })
    if (joiError) {
        const details = joiError.details.map((d) => d.message)
        return error(res, 'Validation failed', 422, details)
    }
    next()
}

module.exports = { validate }
