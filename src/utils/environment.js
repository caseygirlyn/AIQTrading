// Gets environment variables depending on environment

const getAlpacaVariables = () => {
  console.log("Environment: " + process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'test') {
    console.log("Alpaca Key: " + import.meta.env.VITE_ALPACA_API_KEY);

    // For development & production
    return {
      apiKey: import.meta.env.VITE_ALPACA_API_KEY,
      secretKey: import.meta.env.VITE_ALPACA_SECRET_KEY
    };
  } else {
    console.log("Alpaca Test: " + process.env.VITE_ALPACA_API_KEY);

    // For Github test
    return {
      apiKey: process.env.VITE_ALPACA_API_KEY,
      secretKey: process.env.VITE_ALPACA_SECRET_KEY
    };
  }
};

const getStockSearchVariable = () => {
  console.log("Environment: " + process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'test') {
    console.log("Vite Key 3: " + import.meta.env.VITE_API_KEY_3);
    // For development & production
    return {
      apiKey3: import.meta.env.VITE_API_KEY_3
    };
  } else {
    console.log("Vite Key 3 Test: " + process.env.VITE_API_KEY_3);

    // For Github test
    return {
      apiKey3: process.env.VITE_API_KEY_3
    };
  }
};

const getBiggestLoseGainVariable = () => {
  console.log("Environment: " + process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'test') {
    console.log("Vite Key 2: " + import.meta.env.VITE_API_KEY_2);
    // For development & production
    return {
      apiKey2: import.meta.env.VITE_API_KEY_2
    };
  } else {
    console.log("Vite Key 2 Test: " + process.env.VITE_API_KEY_2);

    // For Github test
    return {
      apiKey2: process.env.VITE_API_KEY_2
    };
  }
};

export { getAlpacaVariables, getStockSearchVariable, getBiggestLoseGainVariable };

  