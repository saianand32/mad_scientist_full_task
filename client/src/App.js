import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AllFiles from './pages/AllFiles/AllFiles'
import FileUpload from './pages/FileUpload/FileUpload'
import NavBar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
          <Route path = "/" element = {<FileUpload/>}/>
          <Route path = "/allfiles" element = {<AllFiles/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
