import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import DotCursor from './components/DotCursor'

const About      = lazy(() => import('./components/About'))
const Experience = lazy(() => import('./components/Experience'))
const Skills     = lazy(() => import('./components/Skills'))
const Contact    = lazy(() => import('./components/Contact'))
const Footer     = lazy(() => import('./components/Footer'))

function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      width: '100%',
    }}>
      <div style={{
        width: 32,
        height: 32,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        opacity: 0.3,
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function App() {
  return (
    <>
      <DotCursor />
      <Navbar />
      <Home />
      <Suspense fallback={<PageLoader />}>
        <About />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </Suspense>
    </>
  )
}

export default App