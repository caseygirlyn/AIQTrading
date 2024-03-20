import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import About from './components/pages/About';
import Portfolio from './components/Portfolio';
import Contact from './components/pages/Contact';



const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<Container />}></Route>
      <Route path="signup" element={<SignUp />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="portfolio" element={<Portfolio />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />

    </Routes>
  </>
}

export default App;
