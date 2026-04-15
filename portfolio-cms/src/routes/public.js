const express = require('express')
const router = express.Router()

const authCtrl = require('../controllers/AuthController')
const blogCtrl = require('../controllers/BlogController')
const seriesCtrl = require('../controllers/SeriesController')
const portfolioCtrl = require('../controllers/PortfolioController')

// Health
router.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

// Auth
router.post('/auth/login', authCtrl.login)

// Public Blog
router.get('/blogs', blogCtrl.listBlogs)
router.get('/blogs/:slug', blogCtrl.getBlog)

// Public Series
router.get('/series', seriesCtrl.listSeries)
router.get('/series/slug/:slug', seriesCtrl.getSeriesBySlug)
router.get('/series/:id', seriesCtrl.getSeries)

// Public Portfolio Data
router.get('/projects', portfolioCtrl.listProjects)
router.get('/experience', portfolioCtrl.listExperience)
router.get('/skills', portfolioCtrl.listSkills)

module.exports = router
