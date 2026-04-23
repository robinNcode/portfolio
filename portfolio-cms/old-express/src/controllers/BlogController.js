const blogService = require('../services/BlogService')
const { success, created, error, paginated } = require('../utils/apiResponse')

/** GET /api/blogs */
const listBlogs = async (req, res) => {
    const { lang, tag, series, page = 1, limit = 10, search } = req.query
    const result = await blogService.listBlogs({ lang, tag, series, page: +page, limit: +limit, search })
    return paginated(res, result)
}

/** GET /api/blogs/:slug */
const getBlog = async (req, res) => {
    const blog = await blogService.getBlogBySlug(req.params.slug)
    if (!blog) return error(res, 'Blog not found', 404)
    return success(res, blog)
}

/** GET /api/admin/blogs (all, with drafts) */
const listAdminBlogs = async (req, res) => {
    const { page = 1, limit = 20 } = req.query
    const result = await blogService.listAllAdmin({ page: +page, limit: +limit })
    return paginated(res, result)
}

/** POST /api/admin/blog */
const createBlog = async (req, res) => {
    const blog = await blogService.createBlog(req.body)
    return created(res, blog, 'Blog created')
}

/** PUT /api/admin/blog/:id */
const updateBlog = async (req, res) => {
    const blog = await blogService.updateBlog(req.params.id, req.body)
    if (!blog) return error(res, 'Blog not found', 404)
    return success(res, blog, 'Blog updated')
}

/** DELETE /api/admin/blog/:id */
const deleteBlog = async (req, res) => {
    const blog = await blogService.deleteBlog(req.params.id)
    if (!blog) return error(res, 'Blog not found', 404)
    return success(res, null, 'Blog deleted')
}

/** PUT /api/admin/blog/:id/publish */
const togglePublish = async (req, res) => {
    const blog = await blogService.togglePublish(req.params.id)
    if (!blog) return error(res, 'Blog not found', 404)
    return success(res, blog, `Blog ${blog.is_published ? 'published' : 'unpublished'}`)
}

module.exports = { listBlogs, getBlog, listAdminBlogs, createBlog, updateBlog, deleteBlog, togglePublish }
