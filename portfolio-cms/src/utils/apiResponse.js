const success = (res, data, message = 'Success', statusCode = 200) =>
    res.status(statusCode).json({ success: true, message, data })

const created = (res, data, message = 'Created') => success(res, data, message, 201)

const error = (res, message = 'Error', statusCode = 500, details = null) =>
    res.status(statusCode).json({ success: false, message, ...(details && { details }) })

const paginated = (res, result, message = 'Success') =>
    res.status(200).json({
        success: true,
        message,
        data: result.data,
        pagination: {
            total: result.total,
            page: result.page,
            limit: result.limit,
            pages: result.pages,
        },
    })

module.exports = { success, created, error, paginated }
