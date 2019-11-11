import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// importa as páginas
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import Medico from './pages/Medico';
import NotFound from './pages/NotFound';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/cadastro' component={Cadastro}/>
                <Route exact path='/medico/:crm' component={Medico}/>
                <Route exact path='*' component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;