import React from 'react';
import logo from '../media/logo.png';
import Problem from './Problem';
function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow pt-3 pb-3">
                    <div className="container d-flex">
                    <a className="navbar-brand" href="#"><img src={logo} alt="Logo" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                        
                        <li className="nav-item">
                            <Problem />
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
        </div>
    )
}

export default Navbar

