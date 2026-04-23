const projectService = require('../services/ProjectService')
const expRepo = require('../repositories/ExperienceRepository')
const skillRepo = require('../repositories/SkillRepository')
const { success, created, error } = require('../utils/apiResponse')

// --- Projects ---
const listProjects = async (req, res) => {
    const result = await projectService.listProjects()
    return success(res, result.data)
}
const createProject = async (req, res) => {
    const p = await projectService.createProject(req.body)
    return created(res, p, 'Project created')
}
const updateProject = async (req, res) => {
    const p = await projectService.updateProject(req.params.id, req.body)
    if (!p) return error(res, 'Project not found', 404)
    return success(res, p, 'Project updated')
}
const deleteProject = async (req, res) => {
    const p = await projectService.deleteProject(req.params.id)
    if (!p) return error(res, 'Project not found', 404)
    return success(res, null, 'Project deleted')
}

// --- Experience ---
const listExperience = async (req, res) => {
    const result = await expRepo.findAllOrdered()
    return success(res, result.data || result)
}
const createExperience = async (req, res) => {
    const e = await expRepo.create(req.body)
    return created(res, e, 'Experience created')
}
const updateExperience = async (req, res) => {
    const e = await expRepo.updateById(req.params.id, req.body)
    if (!e) return error(res, 'Experience not found', 404)
    return success(res, e, 'Experience updated')
}
const deleteExperience = async (req, res) => {
    const e = await expRepo.deleteById(req.params.id)
    if (!e) return error(res, 'Experience not found', 404)
    return success(res, null, 'Experience deleted')
}

// --- Skills ---
const listSkills = async (req, res) => {
    const skills = await skillRepo.findAllOrdered()
    return success(res, skills)
}
const createSkill = async (req, res) => {
    const s = await skillRepo.create(req.body)
    return created(res, s, 'Skill created')
}
const updateSkill = async (req, res) => {
    const s = await skillRepo.updateById(req.params.id, req.body)
    if (!s) return error(res, 'Skill not found', 404)
    return success(res, s, 'Skill updated')
}
const deleteSkill = async (req, res) => {
    const s = await skillRepo.deleteById(req.params.id)
    if (!s) return error(res, 'Skill not found', 404)
    return success(res, null, 'Skill deleted')
}

module.exports = {
    listProjects, createProject, updateProject, deleteProject,
    listExperience, createExperience, updateExperience, deleteExperience,
    listSkills, createSkill, updateSkill, deleteSkill,
}
