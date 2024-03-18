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

  const [selectedTicker, setSelectedTicker] = useState(null);

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
    <div className={isDarkMode ? 'darkMode' : 'lightMode'} >
      <Header />
      <div style={{ display: 'flex', backgroundColor: '#292D3A', padding: '20px', borderRadius: '8px' }}>
        <div style={{ flex: '1', marginRight: '20px' }}>
          <h3 style={{ color: 'white' }}>Available stocks</h3>
          {tickers.map((ticker, index) => (
            <div key={ticker.symbol} style={{ 
              backgroundColor: index % 2 === 0 ? ' #3B404E' : '#303441',
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '10px' }}>{ticker.symbol} - {ticker.name}</span>
              <div>
                <button 
                  style={{ 
                    fontSize: '12px', 
                    padding: '6px 20px', 
                    color: '#56B678',
                    backgroundColor: index % 2 === 0 ? ' #3B404E' : '#303441', 
                    border: 'solid 1px #56B678',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '5px'
                  }}
                  onClick={() => setSelectedTicker(ticker)}
                >
                  Buy
                </button>
                <button 
                  style={{ 
                    fontSize: '12px', 
                    padding: '6px 20px', 
                    backgroundColor: index % 2 === 0 ? ' #3B404E' : '#303441', 
                    color: 'red', 
                    border: 'solid 1px red',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedTicker(ticker)}
                >
                  Sell
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: '1' }}>
          {selectedTicker && (
            <div style={{ padding: '20px', marginTop: '100px', borderRadius: '8px' }}>
              <AlpacaOrder symbol={selectedTicker.symbol} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Portfolio;
