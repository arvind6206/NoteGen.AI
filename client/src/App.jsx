import React from 'react'
import Signup from './components/pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'
import Home from './components/Home/Home'
import Notes from './components/Home/Notes'

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/home' element = {<Home/>}/>
      <Route path="/notes" element={<Notes />} />

    </Routes>
  )
}

export default App
