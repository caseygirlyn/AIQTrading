// Gets environment variables depending on environment

const getAlpacaVariables = () => {
  console.log("Environment: " + process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'production') {
    console.log("Alpaca Key: " + import.meta.env.VITE_ALPACA_API_KEY);

    // For development and QA
    return {
      apiKey: import.meta.env.VITE_ALPACA_API_KEY,
      secretKey: import.meta.env.VITE_ALPACA_SECRET_KEY
    };
  } else {
    // For production
    return {
      apiKey: import.meta.env.VITE_ALPACA_API_KEY,
      secretKey: import.meta.env.VITE_ALPACA_SECRET_KEY
    };
  }
};

const getStockSearchVariable = () => {
  console.log("Environment: " + process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'production') {
    console.log("Vite Key 3: " + import.meta.env.VITE_API_KEY_3);
    // For development and QA
    return {
      apiKey3: import.meta.env.VITE_API_KEY_3
    };
  } else {
    // For production
    return {
      apiKey3: import.meta.env.VITE_API_KEY_3
    };
  }
};

const getBiggestLoseGainVariable = () => {
  console.log("Environment: " + process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'production') {
    console.log("Vite Key 2: " + import.meta.env.VITE_API_KEY_2);
    // For development and QA
    return {
      apiKey2: import.meta.env.VITE_API_KEY_2
    };
  } else {
    // For production
    return {
      apiKey2: import.meta.env.VITE_API_KEY_2
    };
  }
};

export { getAlpacaVariables, getStockSearchVariable, getBiggestLoseGainVariable };

  