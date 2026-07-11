import React from 'react'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './Home/Home'
import Notes from './Home/Notes'
import Dashboard from './pages/Dashboard'
import MyNotes from './pages/MyNotes'
import NoteDetails from './pages/NoteDetails'

function App() {
  return (
    <Routes>
      <Route path='/' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/home' element = {<Home/>}/>
      <Route path="/notes" element={<Notes />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<MyNotes />} />
        <Route path="notes" element={<MyNotes />} />
        <Route path="note/:id" element={<NoteDetails />} />
      </Route>


    </Routes>
  )
}

export default App
