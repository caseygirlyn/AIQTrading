import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

const AlpacaOrder = ({ symbol, isDarkMode, orderType, quantity }) => {
    const [response, setResponse] = useState('');
    const [qty, setQty] = useState(quantity);
    const [side, setSide] = useState(orderType); 
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // Reset the order state when the symbol changes
        setResponse('');
        setQty(quantity); 
        setSide(orderType);
    }, [symbol, quantity, orderType]);

    // Style functions
    const getPaperStyle = () => ({
        padding: '20px',
        margin: 'auto',
        borderRadius: '8px',
        maxWidth: '300px',
        color: isDarkMode ? '#fff' : '#3d4354',
        backgroundColor: isDarkMode ? '#2f3443' : '#fff'
    });

    const getButtonStyle = (variant) => ({
        minWidth: '30px',
        width: '50px',
        fontSize: '20px',
        backgroundColor: isDarkMode ? '#3a4050' : variant === 'increment' ? '#56B678' : '#56B678',
    });

    const getTextFieldStyle = () => ({
        backgroundColor: isDarkMode ? '#3B404E' : 'white',
        borderRadius: '0'
    });

    const getPlaceOrderButtonStyle = () => ({
        backgroundColor: isDarkMode ? '#303441' : '#56B678',
        color: isDarkMode ? '#56B678' : '#fff',
        border: 'solid 1px #56B678',
        paddingLeft: '50px',
        paddingRight: '50px',
        fontFamily: 'inherit',
        marginTop: '1rem',
        fontSize: '20px'
    });

    const handleQuantityChange = (event) => {
        const value = String(event.target.value);
        setQty(value);
    };

    const placeOrder = async () => {
        const url = 'https://paper-api.alpaca.markets/v2/orders';
        const apiKey = import.meta.env.VITE_ALPACA_API_KEY;
        const secretKey = import.meta.env.VITE_ALPACA_SECRET_KEY;


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

            if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
            } else {
                setSubmitted(true);
                // Reset submission status after 3 seconds
                setTimeout(() => {
                    setSubmitted(false);
                }, 3000);
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
            <Paper elevation={3} style={getPaperStyle()}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom style={{fontFamily: 'inherit'}}>Trade {symbol}</Typography>
                </div>
                <Grid container spacing={2} alignItems="center" justifyContent='center'>
                    <Grid item xs={12} sm={6} sx={{ paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="contained" onClick={handleDecrement} style={getButtonStyle('decrement')}>-</Button>
                            <TextField className='bg-white'
                                value={qty}
                                onChange={handleQuantityChange}
                                style={getTextFieldStyle()}
                                InputProps={{ style: { width: '100%' } }}
                                inputProps={{ style: { textAlign: 'center', paddingTop: '12px', paddingBottom: '12px' } }}
                            />
                            <Button variant="contained" onClick={handleIncrement} style={getButtonStyle('increment')}>+</Button>
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={1} justifyContent="center">
                    <Grid item>
                        <Button variant="contained" onClick={placeOrder} style={getPlaceOrderButtonStyle()}>Place Order</Button>
                    </Grid>
                </Grid>
                {response && submitted ? (
                    <div className="px-2 mt-3"><div className="alert alert-success text-center py-2" role="alert">Order Submitted<span className='d-none'>{response}</span></div></div>
                ) : ''}
                
            </Paper>
        </div>
    );
};

export default AlpacaOrder;
