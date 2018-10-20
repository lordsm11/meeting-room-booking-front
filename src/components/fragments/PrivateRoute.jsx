import React from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = rest.connected && rest.connected === true;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
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



export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
