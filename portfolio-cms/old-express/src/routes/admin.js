const express = require('express')
const router = express.Router()

const { authenticate, requireAdmin } = require('../middlewares/auth')
const { upload, handleUploadError } = require('../middlewares/upload')

const blogCtrl = require('../controllers/BlogController')
const seriesCtrl = require('../controllers/SeriesController')
const mediaCtrl = require('../controllers/MediaController')
const portfolioCtrl = require('../controllers/PortfolioController')
const authCtrl = require('../controllers/AuthController')

// All admin routes require JWT + admin role
router.use(authenticate, requireAdmin)

// Auth
router.get('/auth/me', authCtrl.me)

// Blog
router.get('/blogs', blogCtrl.listAdminBlogs)
router.post('/blog', blogCtrl.createBlog)
router.put('/blog/:id', blogCtrl.updateBlog)
router.put('/blog/:id/publish', blogCtrl.togglePublish)
router.delete('/blog/:id', blogCtrl.deleteBlog)

// Series
router.get('/series', seriesCtrl.listAdminSeries)
router.post('/series', seriesCtrl.createSeries)
router.put('/series/:id', seriesCtrl.updateSeries)
router.delete('/series/:id', seriesCtrl.deleteSeries)

// Media
router.post('/media/upload', upload.single('file'), handleUploadError, mediaCtrl.uploadMedia)
router.get('/media', mediaCtrl.listMedia)
router.delete('/media/:id', mediaCtrl.deleteMedia)

// Projects
router.post('/project', portfolioCtrl.createProject)
router.put('/project/:id', portfolioCtrl.updateProject)
router.delete('/project/:id', portfolioCtrl.deleteProject)

// Experience
router.post('/experience', portfolioCtrl.createExperience)
router.put('/experience/:id', portfolioCtrl.updateExperience)
router.delete('/experience/:id', portfolioCtrl.deleteExperience)

// Skills
router.post('/skill', portfolioCtrl.createSkill)
router.put('/skill/:id', portfolioCtrl.updateSkill)
router.delete('/skill/:id', portfolioCtrl.deleteSkill)

module.exports = router
