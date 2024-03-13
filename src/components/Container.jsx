import React, { useState, useEffect } from "react";
import Header from "./Header";
import News from "./News";
import LineChart from "./LineChart"
import Col from "./common/Theme/Col";
import Row from "./common/Theme/Row";
import MostlyOwnedStocksTable from "./common/Tables/MostlyOwnedStocksTable";
import PieChart from "./PieChart";
import StockSearch from "./StockSearch";


const Container = (props) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  // Function to get initial mode from localStorage if available
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || true; // If no saved mode, default to light mode
  }
  // Function to toggle between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return <div className={isDarkMode ? 'darkMode' : 'lightMode'} data-testid="container">

    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="darkModeSwitch"
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label className="form-check-label" htmlFor="darkModeSwitch">
        {isDarkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-stars-fill"></i>}
      </label>
    </div>

    <Header />

    <div className="container mb-4 mt-5 pt-5 reverse-col-mobile">
      <Row>
        <Col size="md-4">
          <h2 className="fs-6 bg-secondary-color text-center p-2 rounded-2 text-white">{currentDateTime.toLocaleString()}</h2>
          <MostlyOwnedStocksTable />
          {/* <PieChart /> */}
        </Col>
        <Col size="md-8">
          <StockSearch isDarkMode={isDarkMode}/>
          <News />
        </Col>
      </Row>
    </div>

  </div>
}

export default Container;
