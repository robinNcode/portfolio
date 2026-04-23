const BaseRepository = require('./BaseRepository')
const Skill = require('../models/Skill')

class SkillRepository extends BaseRepository {
    constructor() { super(Skill) }

    async findAllOrdered() {
        return Skill.find({}).sort({ order: 1 }).exec()
    }
}

module.exports = new SkillRepository()
