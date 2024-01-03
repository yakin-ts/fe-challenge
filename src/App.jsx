import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './containers/Home'
import FormPreview from './containers/FormPreview'
import UpdateForm from './containers/UpdateForm'
import './App.css'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success/:id/" element={<FormPreview/>}/>
        <Route path="/update/:id" element={<UpdateForm/>}/>
        <Route path="*" element={<h1>Error 404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App