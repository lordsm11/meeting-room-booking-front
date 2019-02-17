import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from "components/pages/about";
import Home from "components/pages/home";
import Rooms from "components/pages/Rooms";
import RoomBookings from "components/pages/RoomBookings";
import Book from "components/pages/Book";
import LoginForm from 'components/pages/LoginForm';
import LogoutForm from 'components/pages/LogoutForm';
import PrivateRoute from 'components/fragments/PrivateRoute';
import MenuView from 'components/fragments/MenuView';
import MyAccount from 'components/pages/MyAccount';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {

    render() {
        return (
            <BrowserRouter basename='/booking-front'>
                <div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <MenuView></MenuView>
                            </div>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/home' component={Home}/>
                        <PrivateRoute exact path='/rooms' component={Rooms}/>
                        <PrivateRoute exact path="/rooms/:roomId/bookings" component={RoomBookings}/>
                        <PrivateRoute exact path="/book" component={Book}/>
                        <PrivateRoute exact path="/account" component={MyAccount}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/login" component={LoginForm}/>
                        <Route exact path="/logout" component={LogoutForm}/>
                        <Route component={Home}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default App;
