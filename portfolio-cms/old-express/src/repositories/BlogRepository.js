const BaseRepository = require('./BaseRepository')
const Blog = require('../models/Blog')

class BlogRepository extends BaseRepository {
    constructor() {
        super(Blog)
    }

    async findBySlug(slug) {
        return Blog.findOne({ slug }).populate('series_id', 'name slug').exec()
    }

    async findPublished(filter = {}, options = {}) {
        return this.findAll({ ...filter, is_published: true }, options)
    }

    async incrementViewCount(id) {
        return Blog.findByIdAndUpdate(id, { $inc: { view_count: 1 } }, { new: true }).exec()
    }

    async findBySeries(seriesId) {
        return Blog.find({ series_id: seriesId, is_published: true })
            .sort({ series_order: 1 })
            .exec()
    }

    async textSearch(searchTerm, options = {}) {
        return this.findAll(
            { $text: { $search: searchTerm }, is_published: true },
            { ...options, sort: { score: { $meta: 'textScore' } } }
        )
    }
}

module.exports = new BlogRepository()
