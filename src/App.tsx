import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookPage from './BookPage'
import BrowserMain from './BookBrowser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={BrowserMain} />
        <Route path="/book/:id" Component={BookPage} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
