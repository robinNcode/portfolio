const BaseRepository = require('./BaseRepository')
const Series = require('../models/Series')

class SeriesRepository extends BaseRepository {
    constructor() {
        super(Series)
    }

    async findBySlug(slug) {
        return Series.findOne({ slug })
            .populate({ path: 'articles.blog_id', select: 'title slug is_published read_time published_at' })
            .exec()
    }

    async findAllPublished(options = {}) {
        return this.findAll({ is_published: true }, options)
    }
}

module.exports = new SeriesRepository()
