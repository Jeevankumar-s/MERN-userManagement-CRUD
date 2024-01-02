import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import UserItem from './components/UserItem';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserItem />} />
      </Routes>
    </Router>
  );
};

export default App;
