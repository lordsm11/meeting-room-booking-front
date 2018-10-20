import { connect } from 'react-redux';
import React, {Component} from 'react'
import { Redirect } from 'react-router'
import MessageView from 'components/fragments/MessageView';
import actions from 'reducers/actions/actions';

export class LogoutForm extends Component {

  componentWillMount() {
    this.props.logout();
  }


  render () {
    return (
      <div>
        <MessageView 
          content="Vous êtes mantenant déconnecté">
        </MessageView>
        <Redirect to="/login" />
      </div>
    );
  }
}

  const mapStateToProps = (store) => {
    return {

    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(actions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutForm);
