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

    const handleIncrement = () => {
        setQty(prevQty => prevQty + 1);
    };

    const handleDecrement = () => {
        setQty(prevQty => Math.max(prevQty - 1, 1)); //quantity never goes below 1
    };

    return (
        <div>
            <Paper elevation={3} style={{ padding: '20px', margin:'auto', borderRadius: '8px', maxWidth: '400px' , color: '#fff', backgroundColor: '#303441'}}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h5" gutterBottom >Trading {symbol}</Typography>
              </div>
                <Grid container spacing={2} alignItems="center" justifyContent='center'>
                    <Grid item xs={12} sm={6} sx={{ paddingBottom: '10px'}}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                            <Button variant="contained" onClick={handleIncrement} style={{ minWidth: '30px', width: '30px', backgroundColor:' #303441',border:'solid 1px white' }}>+</Button>
                            <TextField
                                value={qty}
                                style={{ backgroundColor: 'white', width: '150px'}} 
                                InputProps={{ style: { width: '100%' } }} // input field takes the full width of the TextField
                                inputProps={{ style: { textAlign: 'center', paddingTop:'5px', paddingBottom:'5px'} }}
                            />
                            <Button variant="contained" onClick={handleDecrement} style={{ minWidth: '30px', width: '30px', backgroundColor:' #303441',border:'solid 1px white' }}>-</Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justifyContent="center">
                    {/* <Grid item>
                        <Button variant="contained" onClick={() => setSide('buy')} style={{ backgroundColor: '#0EE682', color: '#fff' }}>Buy</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={() => setSide('sell')} style={{ backgroundColor: '#FF5262', color: '#fff' }}>Sell</Button>
                    </Grid> */}
                    <Grid item>
                        <Button variant="contained" onClick={placeOrder} style={{ backgroundColor: '#303441', color: '#56B678', border:'solid 1px #56B678', paddingLeft:'50px', paddingRight:'50px' }}>Place Order</Button>
                    </Grid>
                </Grid>
                {response && <pre style={{ overflowX: 'auto' }}>{response}</pre>}
            </Paper>
        </div>
    );
};

export default AlpacaOrder;
