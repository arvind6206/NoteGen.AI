import React from 'react'
import Signup from './components/pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'
import Home from './components/Home/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/home' element = {<Home/>}/>

    </Routes>
  )
}

export default App
