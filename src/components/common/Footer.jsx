import React from 'react'
import GoogleTagManager from './GoogleTagManager'

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="border-top py-3 w-100 mt-5 text-center">
                <span className="text-muted">© {currentYear} AIQTrading</span>
            </footer>
            <GoogleTagManager />
        </>
    )
}

export default Footer