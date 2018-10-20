import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

class MenuView extends Component {

    renderConnectedMenu() {
        return (
            <Menu stackable>
                <Menu.Item as={ Link } name='home' to='/home'>Accueil</Menu.Item>
                <Menu.Item as={ Link } name='account' to='/account'>Mon compte</Menu.Item>
                <Menu.Item as={ Link } name='rooms' to='/rooms'>Salles</Menu.Item>
                <Menu.Item as={ Link } name='book' to='/book'>Réserver</Menu.Item>
                <Menu.Item as={ Link } name='about' to='/about'>A propos</Menu.Item>
                <Menu.Item as={ Link } name='logout' to='/logout'>Deconnexion</Menu.Item>
            </Menu>
        )
    }

    renderNotConnectedMenu() {
        return (
            <Menu stackable>
                <Menu.Item as={ Link } name='home' to='/home'>Accueil</Menu.Item>
                <Menu.Item as={ Link } name='about' to='/about'>A propos</Menu.Item>
                <Menu.Item as={ Link } name='login' to='/login'>Connectez-vous</Menu.Item>
            </Menu>
        )
    }

    render() {
        return this.props.connected ? this.renderConnectedMenu() : this.renderNotConnectedMenu();
    }

}

const mapStateToProps = (store) => {
    return {
        connected: store.loginReducer.connected
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuView);
