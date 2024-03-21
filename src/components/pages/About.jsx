import React, { useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

function About() {
    const [isDarkMode, setIsDarkMode] = useState(getInitialMode(true));
    function getInitialMode() {
        const savedMode = JSON.parse(localStorage.getItem('darkMode'));
        return savedMode || false; // If no saved mode, default to light mode
    }

    // Function to toggle between dark and light mode
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };
    return (
        <div className={isDarkMode ? 'darkMode' : 'lightMode'} >
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="darkModeSwitch"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                />
                <label className="form-check-label" htmlFor="darkModeSwitch">
                    {isDarkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon-stars-fill"></i>}
                </label>
            </div>
            <Header />
            <section className="pt-5">
                <div className='banner mt-2 mb-5 p-md-5 p-3 d-grid shadow align-items-center justify-items-center'>
                    <h2 className="w-100 text-white text-center">About Us</h2>
                </div>
            </section>
            <div className="container content row px-4 pt-3 m-auto">
                <h3>
                    Introducing AIQTrading
                </h3>
                <p className='pt-3'>
                    The trading app that revolutionizes the way you invest. With AIQTrading, you have instant access to real-time market data, analysis tools, and seamless trading capabilities, all in the palm of your hand. Whether you're a seasoned investor or just starting out, AIQTrading simplifies trading with intuitive features and personalized insights tailored to your financial goals. Take control of your investments, seize opportunities, and stay ahead of the curve with AIQTrading - your trusted partner in the world of trading.
                </p>
                <p className='pt-3'>
                    AIQTrading was born from our passion for democratizing access to financial markets. We understand the complexities and barriers that often deter individuals from entering the world of trading. Our motivation stems from the desire to empower everyone, regardless of their background or expertise, to confidently navigate the markets and achieve their financial aspirations.
                </p>
                <p className='pt-3'>
                    By prioritizing innovation and user feedback, AIQTrading is committed to remaining at the forefront of the trading landscape, empowering users with the tools and resources they need to thrive in the ever-changing financial markets."
                </p>

            </div>

            <Footer />

        </div>
    )
}

export default About
