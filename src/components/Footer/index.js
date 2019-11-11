import React from 'react';
import './style.css';

const Footer = () => {
    return(
        <footer className="footer container section section_footer">
            <div className="row">
                <a href="https://github.com/andrenespolon"><i className="fab fa-github"></i></a>
            </div>
            <div className="row">
                <span className="dev">Desenvolvido por Andre Nespolon</span>
            </div>
        </footer>
    );
};

export default Footer;