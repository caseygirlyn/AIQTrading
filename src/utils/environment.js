// Gets environment variables depending on environment

const getAlpacaVariables = () => {
  console.log("Environment: " + import.meta.env.MODE);

  // For dev & Github test
  if (import.meta.env.MODE !== 'production') {
    console.log("Alpaca Test: " + import.meta.env.VITE_ALPACA_API_KEY);

    return {
      apiKey: import.meta.env.VITE_ALPACA_API_KEY,
      secretKey: import.meta.env.VITE_ALPACA_SECRET_KEY
    };

  } else { // For production
    console.log("Alpaca Key: " + import.meta.env.VITE_ALPACA_API_KEY);

    return {
      apiKey: import.meta.env.VITE_ALPACA_API_KEY,
      secretKey: import.meta.env.VITE_ALPACA_SECRET_KEY
    };
  }
};

const getStockSearchVariable = () => {
  //console.log("Environment: " + import.meta.env.MODE);

  // For dev & Github test
  if (import.meta.env.MODE !== 'production') {
    //console.log("Vite Key 3 Test: " + import.meta.env.VITE_API_KEY_3);
    return import.meta.env.VITE_API_KEY_3;
  } else { // For development & production
    //console.log("Vite Key 3: " + import.meta.env.VITE_API_KEY_3);
    return import.meta.env.VITE_API_KEY_3;
  }
};

const getBiggestLoseGainVariable = () => {
  console.log("Environment: " + import.meta.env.MODE);

  // For dev & Github test
  if (import.meta.env.MODE !== 'production') {
    //console.log("Vite Key 2 Test: " + import.meta.env.VITE_API_KEY_2);
    return import.meta.env.VITE_API_KEY_2
  } else { // For development & production
    //console.log("Vite Key 2: " + import.meta.env.VITE_API_KEY_2);
    return import.meta.env.VITE_API_KEY_2
  }
};

export { getAlpacaVariables, getStockSearchVariable, getBiggestLoseGainVariable };

  