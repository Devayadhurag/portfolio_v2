import Navbar from './components/Navbar'
import Home from './components/Home'
import DotCursor from './components/DotCursor'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <DotCursor />
      <Navbar />
      <Home />
      <About />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}

export default App