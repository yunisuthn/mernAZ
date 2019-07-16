import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashb } from './users/Dashboard/Dashboard.js';
import { Login } from './users/Login/Login.js';
import { Signup } from './users/Signup/Signup.js';
import { PrivateRoute } from './users/PrivateRoute.js';
import './App.css';

class Dashboard extends Component {
        render() {
        return (
        <div className="App">
            <div className="App-content">
                <Switch>  
                    <Route exact path="/" component={Login}/>
                    <Route exact path ="/signup" component={Signup}/>
                    <PrivateRoute path='/dashboard' component={Dashb} />
                </Switch>
            </div>
        </div>
        );
    }
}
export default Dashboard;
