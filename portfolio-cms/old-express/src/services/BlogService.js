const blogRepo = require('../repositories/BlogRepository')
const seriesRepo = require('../repositories/SeriesRepository')
const { computeReadTime } = require('../utils/readingTime')

class BlogService {
    async listBlogs({ lang, tag, series, page, limit, search }) {
        const filter = { is_published: true }
        if (lang) filter.language = lang
        if (tag) filter.tags = tag
        if (series) filter.series_id = series

        if (search) {
            return blogRepo.textSearch(search, { page, limit })
        }
        return blogRepo.findPublished(filter, { page, limit })
    }

    async getBlogBySlug(slug) {
        const blog = await blogRepo.findBySlug(slug)
        if (!blog || !blog.is_published) return null
        await blogRepo.incrementViewCount(blog._id)
        return blog
    }

    async createBlog(data) {
        const read_time = computeReadTime(data.content)
        if (data.is_published && !data.published_at) {
            data.published_at = new Date()
        }
        return blogRepo.create({ ...data, read_time })
    }

    async updateBlog(id, data) {
        if (data.content) data.read_time = computeReadTime(data.content)
        if (data.is_published && !data.published_at) data.published_at = new Date()
        return blogRepo.updateById(id, data)
    }

    async deleteBlog(id) {
        return blogRepo.deleteById(id)
    }

    async togglePublish(id) {
        const blog = await blogRepo.findById(id)
        if (!blog) return null
        const update = {
            is_published: !blog.is_published,
            published_at: !blog.is_published ? new Date() : blog.published_at,
        }
        return blogRepo.updateById(id, update)
    }

    async listAllAdmin({ page, limit }) {
        return blogRepo.findAll({}, { page, limit })
    }
}

module.exports = new BlogService()
