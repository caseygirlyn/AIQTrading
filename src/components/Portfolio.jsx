import React, { useState } from 'react';
import AlpacaOrder from './alpaca/Order'
import Header from './common/Header';
import Footer from './common/Footer';

const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialMode(true));
  function getInitialMode() {
      const savedMode = JSON.parse(localStorage.getItem('darkMode'));
      return savedMode || false; // If no saved mode, default to light mode
  }

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
    marginRight: '20px',
    maxWidth: '50%'
  });
  
  const getMainDivStyle = () => ({
    display: 'flex',
    backgroundColor: isDarkMode ? '#292D3A' : '#fff',
    padding: '20px',
    borderRadius: '8px'
  });

  const getBuyButtonStyle = (index) => ({
    fontSize: '12px',
    padding: '6px 20px',
    color: '#56B678',
    backgroundColor: isDarkMode ? (index % 2 === 0 ? ' #3B404E' : '#303441') : '#fff',
    border: 'solid 1px #56B678',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px'
  });

  const getSellButtonStyle = (index) => ({
    fontSize: '12px',
    padding: '6px 20px',
    backgroundColor: isDarkMode ? (index % 2 === 0 ? ' #3B404E' : '#303441') : '#fff',
    color: 'red',
    border: 'solid 1px red',
    borderRadius: '4px',
    cursor: 'pointer'
  });
  

  const [selectedTicker, setSelectedTicker] = useState(null);

  const handleTickerSelection = (ticker) => {
    if (selectedTicker && ticker.symbol === selectedTicker.symbol) {
      // If the same ticker is selected again, do nothing
      return;
    }
    setSelectedTicker(ticker);
  };
  
  const tickers = [
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
    { symbol: 'META', name: 'Meta Platforms, Inc.' },
    { symbol: 'NFLX', name: 'Netflix, Inc.' },
    { symbol: 'AVGO', name: 'Broadcom Inc.' },
    { symbol: 'QCOM', name: 'QUALCOMM Incorporated' },
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)' },
    { symbol: 'FB', name: 'Facebook, Inc.' }
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
      <div style={getMainDivStyle()}>
        <div style={getTickerContainerStyle()}>
          <h3 style={{ color: isDarkMode ? 'white' : '#3d4354' }}>Available stocks</h3> {/* Adjust color for light mode */}
          {tickers.map((ticker, index) => (
            <div key={ticker.symbol} style={getTickerStyle(index)}>
              <span style={{ marginRight: '10px' }}>{ticker.symbol} - {ticker.name}</span>
              <div>
                <button style={getBuyButtonStyle(index)} onClick={() => handleTickerSelection(ticker)}>Buy</button>
                <button style={getSellButtonStyle(index)} onClick={() => handleTickerSelection(ticker)}>Sell</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: '1' }}>
        {selectedTicker && (
          <div style={{ padding: '20px', marginTop: '100px', borderRadius: '8px' }}>
            <AlpacaOrder symbol={selectedTicker.symbol} isDarkMode={isDarkMode} />
          </div>
        )}
      </div>
    </div><Footer />
    </>
  );
};
export default Portfolio;
