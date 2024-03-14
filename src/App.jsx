import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from './components/Container';
import Portfolio from './components/Portfolio';

const App = () => {
  return (
    <Router>
      <Routes>
        Start App
        <Route path="/" element={<Container />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
