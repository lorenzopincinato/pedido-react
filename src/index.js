import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/home/App'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={App} />
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
