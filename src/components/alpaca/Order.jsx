import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';

const AlpacaOrder = ({ symbol, isDarkMode, orderType, quantity, closeModal }) => {
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

    const getButtonStyle = (variant) => ({
        minWidth: '30px',
        width: '50px',
        fontSize: '20px',
        backgroundColor: isDarkMode ? '#3a4050' : variant === 'increment' ? '#56B678' : '#56B678',
    });

    const getTextFieldStyle = () => ({
        backgroundColor: isDarkMode ? '#3B404E' : 'white',
        borderRadius: '0',
        width: '100px'
    });

    const getPlaceOrderButtonStyle = () => ({
        backgroundColor: isDarkMode ? '#303441' : '#56B678',
        color: '#fff',
        // border: 'solid 1px #56B678',
        paddingLeft: '50px',
        paddingRight: '50px',
        fontFamily: 'inherit',
        margin: '1rem auto',
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
                // Reset submission status after 1.5 seconds
                setTimeout(() => {
                    setSubmitted(false);
                    closeModal();
                }, 1500);
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
        <>
            <Paper elevation={0}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom style={{fontFamily: 'inherit'}}>Trade {symbol}</Typography>
                </div>
                <Grid container spacing={2} alignItems="center" justifyContent='center'>
                    <Grid item xs={12} sx={{ paddingBottom: '10px' }}>
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
                        <Button className="btn btn-outline-success" variant="contained" onClick={placeOrder} style={getPlaceOrderButtonStyle()}>Place Order</Button>
                    </Grid>
                </Grid>
                {response && submitted ? (
                    <div className="px-2 m-2"><div className="alert alert-success text-center py-2" role="alert">Order Submitted<span className='d-none'>{response}</span></div></div>
                ) : ''}
                
            </Paper>
        </>
    );
};

export default AlpacaOrder;