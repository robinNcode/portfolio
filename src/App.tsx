import { Routes, Route } from 'react-router-dom'
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
import Register from './components/Register'

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
  return (
    <div className="min-h-screen bg-bg-base dark:bg-bg-base text-text-primary dark:text-text-primary font-body">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}
