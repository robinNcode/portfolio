import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import OpenSource from './components/OpenSource'
import Leadership from './components/Leadership'
import Contact from './components/Contact'
import Login from './components/Login'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import AdminDash from './components/admin/Dashboard'
import BlogManager from './components/admin/BlogManager'
import ProjectManager from './components/admin/ProjectManager'
import ExperienceManager from './components/admin/ExperienceManager'
import SkillManager from './components/admin/SkillManager'
import MediaManager from './components/admin/MediaManager'
import SeriesManager from './components/admin/SeriesManager'

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <OpenSource />
      <Leadership />
      <Contact />
    </main>
  )
}

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-bg-base dark:bg-bg-base text-text-primary dark:text-text-primary font-body">
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDash />} />
          <Route path="blogs" element={<BlogManager />} />
          <Route path="series" element={<SeriesManager />} />
          <Route path="media" element={<MediaManager />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="skills" element={<SkillManager />} />
        </Route>
      </Routes>
    </div>
  )
}

