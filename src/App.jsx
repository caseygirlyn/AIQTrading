import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import SignUp from './components/pages/SignUp';
import Portfolio from './components/Portfolio';

const App = (props) => {
  return <>
    <Routes>
      <Route path="/" element={<Container apiKeys={props}/>}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  </>
}

export default App;
