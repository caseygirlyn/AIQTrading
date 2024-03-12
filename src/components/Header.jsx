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
                        <li><i className="bi bi-speedometer2"></i><label className='d-block'>Dashboard</label></li>
                        <li><i className="bi bi-graph-up"></i><label className='d-block'>Investments</label></li>
                        <li><i className="bi bi-person-square"></i><label className='d-block'>Profile</label></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
}

export default Header;