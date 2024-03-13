import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import SignUp from './components/pages/SignUp';

const App = () => {
  return <>
      <Routes>
        <Route path="/" element={<Container />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </>
}

export default App;
