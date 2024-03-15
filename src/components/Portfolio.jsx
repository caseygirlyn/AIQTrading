import React, { useState } from 'react';
import AlpacaOrder from './alpaca/Order'

const Portfolio = () => {
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
    <div style={{ display: 'flex', backgroundColor: '#282d3a', padding: '20px', borderRadius: '8px' }}>
    <div style={{ flex: '1', marginRight: '20px' }}>
      <h3 style={{ color: 'white' }}>Available stocks</h3>
      {tickers.map((ticker, index) => (
        <div key={ticker.symbol} style={{ 
          backgroundColor: index % 2 === 0 ? '#ffffff' : '#f0f0f0',
          padding: '8px',
          borderRadius: '4px',
          marginBottom: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '10px' }}>{ticker.symbol} - {ticker.name}</span>
          <button 
            style={{ 
              fontSize: '12px', 
              padding: '6px 12px', 
              backgroundColor: '#0EE682', 
              color: '#fff', 
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedTicker(ticker)}
          >
            Trade
          </button>
        </div>
      ))}
    </div>

    <div style={{ flex: '1' }}>
      {selectedTicker && (
        <div style={{ padding: '20px', marginTop:'100px',borderRadius: '8px' }}>
          <AlpacaOrder symbol={selectedTicker.symbol} />
        </div>
      )}
    </div>
  </div>
  );
};

export default Portfolio;
