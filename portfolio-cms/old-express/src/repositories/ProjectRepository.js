const BaseRepository = require('./BaseRepository')
const Project = require('../models/Project')

class ProjectRepository extends BaseRepository {
    constructor() {
        super(Project)
    }

    async findAllPublished(options = {}) {
        return this.findAll({ is_published: true }, { ...options, sort: { order: 1 } })
    }
}

module.exports = new ProjectRepository()
