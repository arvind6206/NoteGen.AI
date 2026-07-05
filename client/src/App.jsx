import React from 'react'
import Signup from './components/pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
    </Routes>
  )
}

export default App
