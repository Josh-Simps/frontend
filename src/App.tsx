import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BookPage from './BookPage'
import BrowserMain from './BookBrowser'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1> Hello World</h1>} />
        <Route path="/book" Component={BookPage} />
        <Route path="/browser" Component={BrowserMain} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
