import React, { useEffect } from 'react';

const GoogleTagManager = () => {
  useEffect(() => {
    // Add the gtag script to the DOM
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-NCDXV1E5BT";
    document.body.appendChild(script);

    // Initialize gtag
    const scriptInit = document.createElement('script');
    scriptInit.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-NCDXV1E5BT');
    `;
    document.body.appendChild(scriptInit);

    // Clean up script elements on component unmount
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(scriptInit);
    };
  }, []);

  return null;
};

export default GoogleTagManager
