import React from 'react';
import './output.css';

import { Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Landing from './auth/Landing';
import FourZeroFour from './FourZeroFour';
import Dummy from './Dummy';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Feed from './bleat/Feed';
import User from './profile/User';
import Bleat from './bleat/Bleat';

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') || true
  );
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);


  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route element={<NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>}>
        <Route path='/bleat/:id' element={<Bleat/>}/>
        <Route path='/users/:id' element={<User/>}/>
        <Route path='/home' element={<Feed/>}/>
      </Route>
      <Route path='/dummy' element={<Dummy />} />
      <Route path='*' element={<FourZeroFour />} />
    </Routes>
  );
}
