import React, { useState } from 'react';
import getEnvVariables from '../../utils/environment.js';

const AlpacaOrder = ({ symbol }) => {
    const [response, setResponse] = useState('');
    const [qty, setQty] = useState(1);
    const [side, setSide] = useState('buy'); // default to 'buy'
  
    const placeOrder = async () => {
    const url = 'https://paper-api.alpaca.markets/v2/orders';
    const { apiKey, secretKey } = getEnvVariables();

    const orderData = {
      symbol: symbol,
      qty: qty,
      side: side,
      type: "market",
      time_in_force: "day"
    };

    try {
      // Debug
      console.log(JSON.stringify(orderData));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'APCA-API-KEY-ID': apiKey,
          'APCA-API-SECRET-KEY': secretKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Trading {symbol}</h3>
      Quantity: <input type="number" value={qty} onChange={e => setQty(e.target.value)} />
      <button onClick={() => setSide('buy')}>Buy</button>
      <button onClick={() => setSide('sell')}>Sell</button>
      <button onClick={placeOrder}>Place Order</button>
      {response && <pre>{response}</pre>}
    </div>
  );
};

export default AlpacaOrder;
