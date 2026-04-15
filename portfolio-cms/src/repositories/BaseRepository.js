/**
 * Base Repository — generic CRUD for any Mongoose model
 */
class BaseRepository {
    constructor(model) {
        this.model = model
    }

    async findAll(filter = {}, options = {}) {
        const { page = 1, limit = 10, sort = { createdAt: -1 }, select } = options
        const skip = (page - 1) * limit
        let query = this.model.find(filter).sort(sort).skip(skip).limit(limit)
        if (select) query = query.select(select)
        const [data, total] = await Promise.all([query.exec(), this.model.countDocuments(filter)])
        return { data, total, page, limit, pages: Math.ceil(total / limit) }
    }

    async findById(id, options = {}) {
        let query = this.model.findById(id)
        if (options.populate) query = query.populate(options.populate)
        return query.exec()
    }

    async findOne(filter, options = {}) {
        let query = this.model.findOne(filter)
        if (options.populate) query = query.populate(options.populate)
        return query.exec()
    }

    async create(data) {
        const doc = new this.model(data)
        return doc.save()
    }

    async updateById(id, data) {
        return this.model.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).exec()
    }

    async deleteById(id) {
        return this.model.findByIdAndDelete(id).exec()
    }

    async count(filter = {}) {
        return this.model.countDocuments(filter)
    }
}

module.exports = BaseRepository
