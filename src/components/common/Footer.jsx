import React from 'react'
import GoogleTagManager from './GoogleTagManager'

function Footer() {
    return (
        <>
            <footer className="border-top py-3 w-100 mt-5 text-center">
                <span className="text-muted">© 2024 AIQTrading</span>
            </footer>
            <GoogleTagManager />
        </>
    )
}

export default Footer
