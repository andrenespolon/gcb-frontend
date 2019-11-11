import React from 'react';
import './style.css';

const Header = () => {
    return(
        <div className="header container section section_header">
            <div className="row">
                <a href="/" className="">Home</a>
                <a href="/cadastro" className="">Cadastro</a>
            </div>
        </div>
    );
};

export default Header;