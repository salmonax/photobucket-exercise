import React from 'react';
import Login from './Login';
import PhotoGridContainer from './PhotoGrid';
import * as auth from '../services/authService';

class App extends React.Component {
  constructor(props) {
    super(props);
    const userData = auth.getUserData() || null;
    this.state = {
      isLoggedIn: !!userData,
      username: userData ? userData.username : null,
      errorMessage: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.submitPhoto = this.submitPhoto.bind(this);
    this.errorTimeoutID = null;
  }

  componentDidMount() {
  }

  _hasFormError(formData, isSigningUp) {
    const { username, email, password, checkbox } = formData;
    const validEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (isSigningUp && !checkbox) { 
      console.log('_hasFormError',isSigningUp);
      return 'You must accept the terms.';
    }
    if (!password || password.length < 8) return 'Password must be > 8 characters.';
    if (!validEmail.test(email)) return 'Invalid e-mail address.';
  }

  handleLogin(formData, isSigningUp, e) {
    e.preventDefault();
    const errorMessage = this._hasFormError(formData, isSigningUp);
    console.log('handleLogin', isSigningUp);
    if (errorMessage) {
      this.setState({ errorMessage });
      return;
    }
    const action = (isSigningUp) ? auth.signup : auth.login;
    action(formData)
      .then(userData => {
        // console.log('!!!!', userData); 
        this.setState({
          isLoggedIn: true,
          errorMessage: '',
          username: userData.username,
        });
      })
      .catch(err => {
        const { data } = err.response;
        if (data.message) {
          this.setState({
            errorMessage: data.message,
          });
        }
      });
  }

  handleLogout(e) {
    e.preventDefault();
    auth.logout();
    this.setState({
      isLoggedIn: false,
    });
  }

  submitPhoto() {
    // This should handle the axios call
  }

  // Replace with router paths if time
  render() {
    // console.log(JSON.stringify(this.state));
    return !this.state.isLoggedIn ?
        <Login 
          login={this.handleLogin} 
          error={this.state.errorMessage} 
        /> :
        <PhotoGridContainer 
          username={this.state.username ? this.state.username : 'Ladies and Gentlemen'}
          logout={this.handleLogout}  
          submitPhoto={this.submitPhoto}
        />;
  }
}

export default App;