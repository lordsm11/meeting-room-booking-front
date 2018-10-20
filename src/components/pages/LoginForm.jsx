import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import userApi from 'api/userApi';
import MessageView from 'components/fragments/MessageView';
import actions from 'reducers/actions/actions';

export class LoginForm extends Component {

  componentWillMount() {
    //TODO delete
    this.setState({"email":"booker1@yopmail.com", "password": "booker1"});
  }

  handleInputChange = (e) => { 
    this.setState({[e.target.name]:e.target.value});
  }

  handleLogin = async event => {
    event.preventDefault();
  
    try {
      this.setState({errorLogin: false});
      this.props.login(this.state.email);
      await userApi.login(this.state.email, this.state.password)
      this.props.loginOk();
      this.props.history.push("/");
    } catch (e) {
      this.props.loginKo();
      this.setState({errorLogin: true});
    }
  }

  renderErrorLogin() {
    if(this.state && this.state.errorLogin === true) {
      return (
        <MessageView 
            error="true" 
            content="Merci de vérifier vos paramètres de connexion">
        </MessageView>
      );
    }
    return null;
  }

    render () {
      return (
        <div className='login-form'>
        {this.renderErrorLogin()}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Connexion à votre compte
            </Header>
            <Form size='large' onSubmit={this.handleLogin}>
              <Segment stacked>
                <Form.Input 
                  fluid icon='user' 
                  iconPosition='left' 
                  placeholder='e-mail'
                  name="email" 
                  onChange={this.handleInputChange}  
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='mot de passe'
                  type='password'
                  name="password"
                  onChange={this.handleInputChange}  
                />
                <Button color='teal' fluid size='large' type='submit'>Connexion</Button>
              </Segment>
            </Form>
            <Message>
              Nouveau: veuillez contacter votre employeur
            </Message>
          </Grid.Column>
        </Grid>
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
      login: (email) => dispatch(actions.login(email)),
      loginOk: () => dispatch(actions.loginOk()),
      loginKo: () => dispatch(actions.loginKo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
