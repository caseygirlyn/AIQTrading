// Gets environment variables depending on environment

const getEnvVariables = () => {
  console.log("Environment: " + process.env.NODE_ENV);

  if (process.env.NODE_ENV !== 'production') {
    // For development and QA use process.env
    return {
      apiKey: process.env.ALPACA_API_KEY,
      secretKey: process.env.ALPACA_SECRET_KEY
    };
  } else {
    // For production use import.meta.env from Vite
    return {
      apiKey: import.meta.env.VITE_ALPACA_API_KEY,
      secretKey: import.meta.env.VITE_ALPACA_SECRET_KEY
    };
  }
};

export default getEnvVariables;

  