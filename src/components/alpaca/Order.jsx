import React, { useState } from 'react';
import { getAlpacaVariables } from '../../utils/environment.js';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

const AlpacaOrder = ({ symbol }) => {
    const [response, setResponse] = useState('');
    const [qty, setQty] = useState(1);
    const [side, setSide] = useState('buy'); // default to 'buy'
  
    const placeOrder = async () => {
    const url = 'https://paper-api.alpaca.markets/v2/orders';
    const { apiKey, secretKey } = getAlpacaVariables();

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
      console.log(apiKey);
      console.log(secretKey);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'APCA-API-KEY-ID': apiKey,
          'APCA-API-SECRET-KEY': secretKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', margin:'auto', borderRadius: '8px', maxWidth: '400px' , color: '#fff', backgroundColor: '#3D4354E3'}}>
        <Typography variant="h5" gutterBottom>Trading {symbol}</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">Quantity:</Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ paddingBottom: '10px'}}>
            <TextField type="number" value={qty} onChange={e => setQty(e.target.value)} fullWidth style={{backgroundColor:'white'}}/>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item>
            <Button variant="contained" onClick={() => setSide('buy')} style={{ backgroundColor: '#0EE682', color: '#fff' }}>Buy</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={() => setSide('sell')} style={{ backgroundColor: '#FF5262', color: '#fff' }}>Sell</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={placeOrder} style={{ backgroundColor: '#3D4354', color: '#fff' }}>Place Order</Button>
          </Grid>
        </Grid>
        {response && <pre style={{ overflowX: 'auto' }}>{response}</pre>}
      </Paper>
    </div>
  );
};

export default AlpacaOrder;
