const seriesRepo = require('../repositories/SeriesRepository')

class SeriesService {
    async listSeries(options = {}) {
        return seriesRepo.findAllPublished(options)
    }

    async getSeriesById(id) {
        return seriesRepo.findById(id, { populate: { path: 'articles.blog_id', select: 'title slug read_time published_at is_published' } })
    }

    async getSeriesBySlug(slug) {
        return seriesRepo.findBySlug(slug)
    }

    async createSeries(data) {
        return seriesRepo.create(data)
    }

    async updateSeries(id, data) {
        return seriesRepo.updateById(id, data)
    }

    async deleteSeries(id) {
        return seriesRepo.deleteById(id)
    }

    async listAllAdmin(options = {}) {
        return seriesRepo.findAll({}, options)
    }
}

module.exports = new SeriesService()
