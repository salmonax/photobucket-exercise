import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returnUser: false,
    };
  }

  toggleSignUpMode() {
    this.setState({
      returnUser: !this.state.returnUser,
    });
  }

  render() {
    return (
      <div id="login-container">
        <div id="login">
          <h2>Welcome to Photobucket</h2>
          <h3>Please sign up to continue</h3>

          <div id="login-input"> 
            <input type="text" className='signup' placeholder="Name"></input>
            <input type="text" className='signup' placeholder="Email"></input>
            <input type="password" className='signup' placeholder="Password"></input>
            
            <div>
              <input className="styled-checkbox" type="checkbox" id="check" name="check" />
              <label htmlFor="check" className="small">I agree to the terms &amp; conditions</label>
            </div>
            
            <button id="sign-up-button" onClick={this.props.login}>Sign Up</button>
          </div>

          <div className="small">Already a member? <a href="/login">Log in</a></div>
      
        </div>
      </div>
    );
  }
}

export default Login;