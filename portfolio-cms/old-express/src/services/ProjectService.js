const projectRepo = require('../repositories/ProjectRepository')

class ProjectService {
    async listProjects() {
        return projectRepo.findAllPublished()
    }
    async createProject(data) { return projectRepo.create(data) }
    async updateProject(id, data) { return projectRepo.updateById(id, data) }
    async deleteProject(id) { return projectRepo.deleteById(id) }
    async listAllAdmin(options) { return projectRepo.findAll({}, options) }
}

module.exports = new ProjectService()
