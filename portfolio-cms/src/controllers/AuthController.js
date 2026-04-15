const authService = require('../services/AuthService')
const { success, error } = require('../utils/apiResponse')
const Joi = require('joi')

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

const login = async (req, res) => {
    const { error: joiError } = loginSchema.validate(req.body)
    if (joiError) return error(res, joiError.details[0].message, 422)

    const result = await authService.login(req.body.email, req.body.password)
    if (!result) return error(res, 'Invalid email or password', 401)

    return success(res, result, 'Login successful')
}

module.exports = { login }
