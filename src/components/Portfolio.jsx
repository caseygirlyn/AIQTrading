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
    <div>
      Available stocks
      {tickers.map(ticker => (
        <div key={ticker.symbol}>
          {ticker.symbol} - {ticker.name}
          <button onClick={() => setSelectedTicker(ticker)}>Trade</button>
        </div>
      ))}

      {selectedTicker && (
        <AlpacaOrder symbol={selectedTicker.symbol} />
      )}
    </div>
  );
};

export default Portfolio;
