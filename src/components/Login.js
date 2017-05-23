import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigningUp: false,
    };
    this.flavor = [
      {question: 'Already a member?', task: 'Sign Up'},
      {question: 'Already signed up?', task: 'Log In'},
    ];
    this.toggleSignUpMode = this.toggleSignUpMode.bind(this);
  }

  toggleSignUpMode(e) {
    e.preventDefault();
    this.setState({
      isSigningUp: !this.state.isSigningUp,
    });
  }

  render() {
    const { isSigningUp } = this.state;
    const flavor = (isSigningUp) ? this.flavor : this.flavor.slice().reverse();
    const buttonText = flavor[0].task;
    const alternateText = flavor[1].task;
    const taskQuestion = flavor[0].question;

    return (
      <div id="login-container">
        <div id="login">
          <h2>Welcome to Photobucket</h2>
          <h3>Please sign up to continue</h3>

          <div id="login-input"> 
            {}
            <input type="text" className='signup' placeholder="Name"></input>
            <input type="text" className='signup' placeholder="Email"></input>
            <input type="password" className='signup' placeholder="Password"></input>
            
            <div>
              <input className="styled-checkbox" type="checkbox" id="check" name="check" />
              <label htmlFor="check" className="small">I agree to the terms &amp; conditions</label>
            </div>
            
            <button id="sign-up-button" onClick={this.props.login}>{buttonText}</button>
          </div>

          <div className="small">
            {taskQuestion} <a href="/login" onClick={this.toggleSignUpMode}>{alternateText}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;