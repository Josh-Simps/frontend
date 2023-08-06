import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookPage from './BookPage'
import BrowserMain from './BookBrowser'
import BookOnboarding from './BookOnboarding'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={BookOnboarding} />
        <Route path="/book/:id" Component={BookPage} />
        <Route path="/browser" Component={BrowserMain} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
