const seriesService = require('../services/SeriesService')
const { success, created, error, paginated } = require('../utils/apiResponse')

const listSeries = async (req, res) => {
    const { page = 1, limit = 20 } = req.query
    const result = await seriesService.listSeries({ page: +page, limit: +limit })
    return paginated(res, result)
}

const getSeries = async (req, res) => {
    const series = await seriesService.getSeriesById(req.params.id)
    if (!series) return error(res, 'Series not found', 404)
    return success(res, series)
}

const getSeriesBySlug = async (req, res) => {
    const series = await seriesService.getSeriesBySlug(req.params.slug)
    if (!series) return error(res, 'Series not found', 404)
    return success(res, series)
}

const listAdminSeries = async (req, res) => {
    const { page = 1, limit = 20 } = req.query
    const result = await seriesService.listAllAdmin({ page: +page, limit: +limit })
    return paginated(res, result)
}

const createSeries = async (req, res) => {
    const series = await seriesService.createSeries(req.body)
    return created(res, series, 'Series created')
}

const updateSeries = async (req, res) => {
    const series = await seriesService.updateSeries(req.params.id, req.body)
    if (!series) return error(res, 'Series not found', 404)
    return success(res, series, 'Series updated')
}

const deleteSeries = async (req, res) => {
    const series = await seriesService.deleteSeries(req.params.id)
    if (!series) return error(res, 'Series not found', 404)
    return success(res, null, 'Series deleted')
}

module.exports = { listSeries, getSeries, getSeriesBySlug, listAdminSeries, createSeries, updateSeries, deleteSeries }
