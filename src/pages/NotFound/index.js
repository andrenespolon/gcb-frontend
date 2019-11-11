import React, { Component } from 'react';
import './style.css';
import api from '../../services/api';
import axios from 'axios';

class NotFound extends Component {
    render() {
        return(
            <div className="notfound">
                <h1>404 Página não encontrada</h1>
            </div>
        );
    }
};

export default NotFound;