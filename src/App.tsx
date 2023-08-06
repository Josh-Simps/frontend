import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookPage from './BookPage'
import BrowserMain from './BookBrowser'
import MangaPage from './MangaPage/MangaPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={BrowserMain} />
        <Route path="/book/:id" Component={BookPage} />
        <Route path="/browser" Component={BrowserMain} />
        <Route path="/manga" Component={MangaPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
