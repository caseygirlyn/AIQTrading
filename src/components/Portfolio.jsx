import React, { useState, useEffect } from 'react';
import AlpacaOrder from './alpaca/Order'
import Col from "./common/Theme/Col";
import Row from "./common/Theme/Row";
import Header from './common/Header';
import Footer from './common/Footer';
import SearchedStocksTable from './common/Tables/SearchedStocksTable'
import StockSearchPortfolio from "./StockSearchPortfolio";
import { NavLink } from 'react-router-dom';
import TradingPosition from './alpaca/TradingPosition';
import PortfolioStatus from './alpaca/PortfolioStatus';
import TradingPositionsPieChart from './alpaca/TradingPositionPieChart';

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode(true));
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem('darkMode'));
    return savedMode || false; // If no saved mode, default to light mode
  }

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Function to toggle between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const getTickerStyle = (index) => ({
    backgroundColor: isDarkMode
      ? (index % 2 === 0 ? ' #3B404E' : '#303441')
      : (index % 2 === 0 ? '#f0f0f0' : '#fff'),
    color: isDarkMode ? 'white' : '#3d4354',
    padding: '8px',
    borderRadius: '4px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  });

  const getTickerContainerStyle = () => ({
    flex: '1',
  });

  const getMainDivStyle = () => ({
    display: 'flex',
    backgroundColor: isDarkMode ? '#292D3A' : '#fff',
    borderRadius: '8px',
    marginBottom: '2rem'
  });

  const getBuyButtonStyle = (index) => ({
    fontSize: '14px',
    padding: '6px 20px',
    color: '#56B678',
    backgroundColor: isDarkMode ? (index % 2 === 0 ? ' #3B404E' : '#303441') : '#fff',
    border: 'solid 1px #56B678',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px'
  });

  const getSellButtonStyle = (index) => ({
    fontSize: '14px',
    padding: '6px 20px',
    backgroundColor: isDarkMode ? (index % 2 === 0 ? ' #3B404E' : '#303441') : '#fff',
    color: 'red',
    border: 'solid 1px red',
    borderRadius: '4px',
    cursor: 'pointer'
  });

  const [selectedTicker, setSelectedTicker] = useState(null);
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState(1);

  const handleTickerSelection = (ticker, type) => {
    setSelectedTicker(ticker);
    setOrderType(type);
  };

  const tickers = [
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms, Inc.' },
    { symbol: 'TSLA', name: 'Tesla, Inc.' },
    { symbol: 'NFLX', name: 'Netflix, Inc.' },
    { symbol: 'AVGO', name: 'Broadcom Inc.' },
    { symbol: 'QCOM', name: 'QUALCOMM Incorporated' }
  ];

  return (
    <><div className={isDarkMode ? 'darkMode' : 'lightMode'}>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="darkModeSwitch"
          checked={isDarkMode}
          onChange={toggleDarkMode} />
        <label className="form-check-label" htmlFor="darkModeSwitch">
          {isDarkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-stars-fill"></i>}
        </label>
      </div>
      <Header />
      <div className="container mt-5 pt-5">
        <StockSearchPortfolio isDarkMode={isDarkMode} />
      </div>
      <div className="container m-auto mb-3 row px-0 text-center">
        <Col size="lg-12">
          <PortfolioStatus />
        </Col>
        {/* <Col size="lg-6">
          <div className='px-lg-5 my-3'>
          <button type="button" className="btn btn-outline-success btn-md mx-2 py-3" style={{ width: '45%' }}>Deposit</button>
          <button type="button" className="btn btn-outline-success btn-md mx-2 py-3" style={{ width: '45%' }}>Withdraw</button>
          </div>
        </Col> */}
      </div>
      <div className="container m-auto d-md-flex">
        <Col size="md-6">
          <div style={getMainDivStyle()}>
            <div style={getTickerContainerStyle()} className='col-md-2'>
              <h3 style={{ color: isDarkMode ? 'white' : '#3d4354' }}>Available stocks</h3> {/* Adjust color for light mode */}
              <small className='text-muted mb-2 d-block'>Check portfolio at <NavLink to="https://app.alpaca.markets/paper/dashboard/overview" target="_blank" className='text-info' rel="noopener noreferrer">Alpaca</NavLink> our executing broker.</small>
              {tickers.map((ticker, index) => (
                <div key={ticker.symbol} style={getTickerStyle(index)}>
                  <span style={{ marginRight: '10px' }}>{ticker.symbol} - {ticker.name}</span>
                  <div style={{ minWidth: '135px' }}>
                    <button style={getBuyButtonStyle(index)} onClick={() => handleTickerSelection(ticker, 'buy')}>Buy</button>
                    <button style={getSellButtonStyle(index)} onClick={() => handleTickerSelection(ticker, 'sell')}>Sell</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col size="md-6">
          <div style={{ flex: '1' }} className='container pt-3'>
            {selectedTicker && (
              <div style={{ padding: '20px', marginTop: '30px', borderRadius: '8px' }}>
                <AlpacaOrder 
                  symbol={selectedTicker.symbol} 
                  isDarkMode={isDarkMode} 
                  orderType={orderType} 
                  quantity={quantity}
                />
              </div>
            )}
          </div>
          <div className='ps-md-5'>
          <TradingPositionsPieChart />
          </div>
          <SearchedStocksTable />
        </Col>
      </div>
      <div className="container m-auto">
        <TradingPosition />
      </div>
      <Footer />
    </div>
    </>
  );
};
export default Portfolio;
