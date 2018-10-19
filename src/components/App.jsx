import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import About from "components/common/about";
import Home from "components/common/home";
import Rooms from "components/Rooms";
import RoomBookings from "components/RoomBookings";
import Book from "components/Book";
import 'semantic-ui-css/semantic.min.css';
import LoginForm from 'components/LoginForm';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <Menu stackable>
                                    <Menu.Item as={ Link } name='home' to='/home'>Home</Menu.Item>
                                    <Menu.Item as={ Link } name='rooms' to='/rooms'>Rooms</Menu.Item>
                                    <Menu.Item as={ Link } name='book' to='/book'>Book</Menu.Item>
                                    <Menu.Item as={ Link } name='about' to='/about'>About</Menu.Item>
                                </Menu>
                            </div>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/home' component={Home}/>
                        <Route exact path='/rooms' component={Rooms}/>
                        <Route exact path="/rooms/:roomId/bookings" component={RoomBookings}/>
                        <Route exact path="/book" component={Book}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/login" component={LoginForm}/>
                        <Route component={Home}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}
export default App;
