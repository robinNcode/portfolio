const BaseRepository = require('./BaseRepository')
const Experience = require('../models/Experience')

class ExperienceRepository extends BaseRepository {
    constructor() { super(Experience) }

    async findAllOrdered(options = {}) {
        return this.findAll({}, { ...options, sort: { order: 1 } })
    }
}

module.exports = new ExperienceRepository()
