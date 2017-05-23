import React from 'react';
import Login from './Login';
import PhotoGridContainer from './PhotoGrid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userInfo: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.submitPhoto = this.submitPhoto.bind(this);
  }

  componentDidMount() {
    // Um... 
    // document.body.style.opacity = 1;
  }

  handleLogin(e) {
    e.preventDefault();
    // Do axios stuff here
    this.setState({
      isLoggedIn: true,
    });
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({
      isLoggedIn: false,
    });
  }

  submitPhoto() {
    // This should handle the axios call
  }

  // Replace with router paths if time
  render() {
    return !this.state.isLoggedIn ?
        <Login login={this.handleLogin} /> :
        <PhotoGridContainer 
          logout={this.handleLogout}  
          submitPhoto={this.submitPhoto}
        />;
  }
}

export default App;