import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forecaster = () => {
  const [forecast, setForecast] = useState('');

  useEffect(() => {
    axios.get('/forecast')
      .then(response => {
        setForecast(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <h1>Forecast</h1>
      <p>{forecast}</p>
    </div>
  );
};

export default Forecaster;
