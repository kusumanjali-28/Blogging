import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react'
import Register from './components/Register';
import Main from './components/Main.js'
import  New from "./components/New.js";
import Display from './components/Display.js'
import Profile from './components/Profile.js'
import MyPost from './components/MyPost.js'
import Contact from './components/Contact.js'

function Apps() {
  return (
  
<Router>
 <Routes>
  <Route path='/' element={<Register/>} exact/>
  <Route path='/Main' element={<Main/>} exact/>
  <Route path='/New' element={<New/>} exact/>
  <Route path='/Display' element={<Display/>} exact/>
  <Route path='/Profile' element={<Profile/>} exact/>
  <Route path='/MyPost' element={<MyPost/>} exact/>
  <Route path='/Contact' element={<Contact/>} exact/>


</Routes>
</Router>
    );
}

export default Apps;