import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return <nav className="navbar fixed-top">
        <div className="container-fluid">
            <button className="btn border-0 shadow-0 position-fixed px-1 py-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" >
                <i className="bi bi-list"></i>
            </button>
            <a className="navbar-brand m-auto" href="#"><img src="/assets/images/AIQ-dark.png" className="dark-logo" /><img src="/assets/images/AIQ-light.png" className="light-logo" /></a>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-body">
                    <ul className="p-0 list-inline">
                        <li><NavLink to="/" className="text-decoration-none"><i className="bi bi-speedometer2 d-block"></i>Dashboard</NavLink></li>
                        <li><NavLink to="/invest" className="text-decoration-none"><i className="bi bi-graph-up d-block"></i>Invest</NavLink></li>
                        <li><NavLink to="signup" className="text-decoration-none"><i className="bi bi-person-square d-block"></i>Sign Up</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
}

export default Header;