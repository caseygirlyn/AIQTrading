import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return <nav className="navbar fixed-top shadow">
        <div className="container-fluid">
            <button className="btn border-0 shadow-0 position-fixed px-1 py-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" >
                <i className="bi bi-list"></i>
            </button>
            <a className="navbar-brand m-auto" href="#"><img src="/assets/images/AIQ-dark.svg" className="dark-logo" width={146}/><img src="/assets/images/AIQ-light.svg" className="light-logo" width={146}/></a>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-body">
                    <span type="button" data-bs-dismiss="offcanvas" aria-label="Close" className="w-100"><i className="bi bi-x-lg float-end"></i></span>
                    <ul className="p-0 list-inline">
                        <li><NavLink to="/" className="text-decoration-none" role="button"><i className="bi bi-speedometer2 d-block"></i>Dashboard</NavLink></li>
                        <li><NavLink to="/signup" className="text-decoration-none" role="button"><i className="bi bi-person-square d-block"></i>My Account</NavLink></li>
                        <li><NavLink to="/portfolio" className="text-decoration-none" role="button"><i className="bi bi-graph-up d-block"></i>Porfolio</NavLink></li>
                        <li><NavLink to="/about" className="text-decoration-none" role="button"><i className="bi bi-info-square d-block"></i>About AIQ</NavLink></li>
                        <li><NavLink to="/contact" className="text-decoration-none" role="button"><i className="bi bi-envelope d-block"></i>Get in Touch</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
}

export default Header;