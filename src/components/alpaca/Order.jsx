import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';

const AlpacaOrder = ({ symbol, tickerName, isDarkMode, orderType, quantity, closeModal, assetQty, price, marketValue, unrealizedPL, unrealizedPLPC }) => {
    const [response, setResponse] = useState('');
    const [qty, setQty] = useState(quantity);
    const [side, setSide] = useState(orderType);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

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
        fontFamily: 'inherit',
        margin: '1rem auto',
        fontSize: '20px',
        width: '100%'
    });

    const handleQuantityChange = (event) => {
        if (assetQty <= 0.00 && orderType == 'sell') return false;
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
        if (assetQty <= 0.00 && orderType == 'sell') return false;
        setQty(prevQty => parseFloat(prevQty) + 1);
    };

    const handleDecrement = () => {
        if (assetQty <= 0.00 && orderType == 'sell') return false;
        setQty(prevQty => Math.max(prevQty - 1, 1)); //quantity never goes below 1
    };

    const formatCurrency = (currency, price) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        });

        return formatter.format(price);
    };

    return (
        <>
            <Paper elevation={0}>
                <div className='text-center'>
                    <div>{tickerName}</div>
                    <Typography variant="h6" gutterBottom style={{ fontFamily: 'inherit', 'textTransform': 'uppercase' }}>({symbol})</Typography>
                    {price !== null && (
                        <Typography variant="h4" gutterBottom style={{ fontFamily: 'inherit', fontWeight: '900', 'textTransform': 'uppercase' }}>{formatCurrency('USD', price)}</Typography>
                    )}
                    {assetQty !== null && (
                        <h5 className='mb-4'>Total: <span className={`${orderType == 'buy' ? 'text-success' : 'text-danger'}`}>{formatCurrency('USD', price * qty)}~</span></h5>
                    )}
                </div>
                <Grid container spacing={2} alignItems="center" justifyContent='center'>
                    <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant="contained" onClick={handleDecrement} style={getButtonStyle('decrement')}>-</Button>
                            <TextField className='bg-white'
                                placeholder='QTY'
                                value={qty}
                                onChange={handleQuantityChange}
                                style={getTextFieldStyle()}
                                inputProps={{ style: { width: '100%', textAlign: 'center', paddingTop: '12px', paddingBottom: '12px' } }}
                            />
                            <Button variant="contained" onClick={handleIncrement} style={getButtonStyle('increment')}>+</Button>
                        </div>
                    </Grid>
                </Grid>
                {assetQty === null && orderType == 'sell' && (
                    <div className='alert alert-danger text-center py-2'>You don’t have {symbol} to sell.<br></br>Start acquiring some to trade!</div>)}
                <Grid container spacing={1} justifyContent="center">
                    <Grid item className='w-100'>
                        <Button className={`btn btn-outline-success ${((assetQty <= 0.00 || qty > assetQty) && orderType == 'sell') ? 'disabled' : ''}`} variant="contained" onClick={placeOrder} style={getPlaceOrderButtonStyle()}>{orderType}</Button>
                    </Grid>
                    {response && submitted ? (
                        <div className="px-2 mx-2"><div className="alert alert-success text-center py-2 w-100" role="alert">Order Submitted<span className='d-none'>{response}</span></div></div>
                    ) : ''}
                    <div className='w-100 row mx-1'>
                        {assetQty !== null && (
                            <>
                                <hr className='my-3'></hr>
                                <div className='col-6'>My {symbol} Shares</div>
                                <div className='col-6 text-nowrap text-end'>{assetQty}</div>
                                <div className='col-6'>Market Value</div>
                                <div className='col-6 text-nowrap text-end'>{formatCurrency('USD', marketValue)}</div>
                                <div className='col-6'>Profit/Loss ($)</div>
                                <div className={`col-6 text-nowrap text-end ${unrealizedPL > 0.00 ? 'text-success' : 'text-danger'}`}>{formatCurrency('USD', unrealizedPL)}</div>
                                <div className='col-6'>Profit/Loss (%)</div>
                                <div className={`col-6 text-nowrap text-end ${unrealizedPL > 0.00 ? 'text-success' : 'text-danger'}`}>
                                    {(unrealizedPLPC * 100).toFixed(2)}%
                                    {unrealizedPL > 0.00 ? <i className="bi bi-arrow-up-short text-success"></i> : <i className="bi bi-arrow-down-short text-danger"></i>}
                                </div>
                            </>
                        )}
                    </div>
                </Grid>
            </Paper>
        </>
    );
};

export default AlpacaOrder;