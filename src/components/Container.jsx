import React, { useState, useEffect, useRef } from "react";
import Header from "./common/Header";
import News from "./News";
import Col from "./common/Theme/Col";
import Row from "./common/Theme/Row";
import MostlyOwnedStocksTable from "./common/Tables/MostlyOwnedStocksTable";
import StockSearch from "./StockSearch";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Footer from "./common/Footer";
import BiggestGainers from "./BiggestGainers";
import BiggestLosers from "./BiggestLosers";

const Container = () => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode(true));

  // Function to get initial mode from localStorage if available
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || false; // If no saved mode, default to light mode
  }
  // Function to toggle between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const inputRef = useRef(null); 
  const [depositAmount, setDepositAmount] = useState('');

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    if (inputRef.current && depositAmount === 0) {
      inputRef.current.focus();
    }
    inputRef.current.focus();
  }, [inputRef, depositAmount]);

  const handleDeposit = () => {
    e.preventDefault();
    // Convert the deposit amount to a number before processing it
    const amount = parseFloat(depositAmount);
    if (!isNaN(amount)) {
      // Handle deposit logic here
      console.log("Deposit amount:", amount);
      // You can perform deposit-related actions here, like sending the amount to an API or updating state.
      // Clear the input field after depositing
      setDepositAmount('');
    } else {
      alert('Please enter a valid number for the deposit amount.');
    }
  };


  const DepositButton = () => {
    const handleDeposit = () => {
      console.log("Deposit amount:", depositAmount);
    };

    const handleChange = (e) => {
      setDepositAmount(parseFloat(e.target.value));
      console.log("Updated deposit amount:", parseFloat(e.target.value));
    }
  
    return (
      <div>
          <input
          ref={inputRef}
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(parseFloat(e.target.value))}
          placeholder="Enter deposit amount"
          />
          <button onClick={handleDeposit}>Deposit</button>
          
        </div>
  );
  

    
    
      


  };
  


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

    <div className="container mb-5 mt-5 pt-5">
      {/* Include DepositButton component */}
      <DepositButton depositAmount={depositAmount} setDepositAmount={setDepositAmount} />
      <Row>
        <Col size="md-12">
          <StockSearch isDarkMode={isDarkMode} />
        </Col>
      </Row>
      <Row>
        <Col size="md-12">
          <Tabs
            defaultActiveKey="gainers"
          >
            <Tab eventKey="gainers" title="Market Biggest Gainers" className="mb-5 text-center">
              <BiggestGainers />
            </Tab>
            <Tab eventKey="losser" title="Market Biggest Losers" className="mb-5 text-center">
              <BiggestLosers />
            </Tab>
          </Tabs>
        </Col>
        <Col size="lg-4">
          <MostlyOwnedStocksTable />
        </Col>
        <Col size="lg-8">
          <News />
        </Col>
      </Row>
    </div>

    <Footer />

  </div>
  
}

// 
    const DepositButton = ({ depositAmount, setDepositAmount }) => {
      const handleDeposit = () => {
        console.log("Deposit amount:", depositAmount);
        // Handle deposit logic here
        setDepositAmount
      };
    
      const handleChange = (e) => {
        // Update the deposit amount as the input value changes
        setDepositAmount(parseFloat(e.target.value));
        console.log("Updated deposit amount:", parseFloat(e.target.value)); 
        
      };
    
      return (
        <div>
          <input
            type="number"
            value={depositAmount}
            onChange={handleChange}
            placeholder="Enter deposit amount"
          />
          {/* Add onClick event to call handleDeposit function */}
          <button onClick={handleDeposit}>Deposit</button>
        </div>
      );
    };


export default Container;