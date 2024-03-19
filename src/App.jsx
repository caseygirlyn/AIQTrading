import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import SignUp from './components/pages/SignUp';
import Portfolio from './components/Portfolio';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';

const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<Container />}></Route>
      <Route path="signup" element={<SignUp />}></Route>
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />

    </Routes>
  </>
}

export default App;
