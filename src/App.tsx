import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookPage from "./BookPage";
import BookBrowser from "./BookBrowser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1> Hello World</h1>} />
        <Route path="/browser" Component={BookBrowser} />
        <Route path="/book" Component={BookPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
