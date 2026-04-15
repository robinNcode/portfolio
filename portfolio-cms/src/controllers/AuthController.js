const authService = require('../services/AuthService')
const User = require('../models/User')
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

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const register = async (req, res) => {
    const { error: joiError } = registerSchema.validate(req.body)
    if (joiError) return error(res, joiError.details[0].message, 422)

    try {
        const existingUser = await User.findOne({ email: req.body.email.toLowerCase() })
        if (existingUser) return error(res, 'Email already in use', 400)

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await user.save()

        const result = await authService.login(req.body.email, req.body.password)
        return success(res, result, 'Registration successful', 201)
    } catch (err) {
        return error(res, err.message, 500)
    }
}

const me = async (req, res) => {
    return success(res, { user: req.user }, 'User profile fetched')
}

module.exports = { login, register, me }
