import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigningUp: true,
      formData: {
        checkbox: false,
      },
    };
    this.flavor = [
      {question: 'Already signed up?', task: 'Log In'},
      {question: 'Already a member?', task: 'Sign Up'},
    ];
    this.toggleSignUpMode = this.toggleSignUpMode.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  toggleSignUpMode(e) {
    e.preventDefault();
    this.setState({
      isSigningUp: !this.state.isSigningUp,
    });
  }

  updateField(field, e) {
    if ([ 'email', 'username', 'password', 'checkbox'].indexOf(field) === -1) return;
    const { formData } = this.state;
    const newValue = (field === 'checkbox') ? !this.state.formData.checkbox : e.target.value;
    const newData = { [field]: newValue };
    this.setState({
      formData: Object.assign(formData, newData),
    });
    // console.log(this.state.formData);
  }

  render() {
    const { isSigningUp } = this.state;
    const flavor = (isSigningUp) ? this.flavor : this.flavor.slice().reverse();
    const activeText = flavor[1].task;
    const alternateText = flavor[0].task;
    const taskQuestion = flavor[0].question;

    return (
      <div id="login-container">
        <div id="login">
          <h2>Welcome to Photobucket</h2>
          <h3>Please {alternateText.toLowerCase()} to continue</h3>
          <div id="login-input"> 
            <div className="error small">{this.props.error}</div>
            {isSigningUp ?
              <input 
                type="text" 
                className='signup' 
                placeholder="Name"
                value = {this.state.formData.username}
                onChange = {this.updateField.bind(null,'username')}
              /> : 
              null
            }
            <input 
              type="text" 
              className='signup' 
              placeholder="Email"
              value = {this.state.formData.email}
              onChange = {this.updateField.bind(null,'email')}
            />
            <input 
              type="password" 
              className='signup' 
              placeholder="Password"
              value = {this.state.formData.password}
              onChange = {this.updateField.bind(null,'password')}
            />
            <div>
              {isSigningUp ? 
                <div>
                  <input 
                    className="styled-checkbox" 
                    type="checkbox" 
                    id="check" 
                    name="check" 
                    onChange = {this.updateField.bind(null, 'checkbox')}
                    value = {this.state.formData.checkbox}
                  />
                  <label htmlFor="check" className="small">
                    I agree to the terms &amp; conditions
                  </label>
                </div> : null
              }
            </div>
            
            <button id="sign-up-button" onClick={this.props.login.bind(null,this.state.formData, isSigningUp)}>{activeText}</button>
          </div>

          <div className="small">
            {taskQuestion} <a href="#" onClick={this.toggleSignUpMode}>{alternateText}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;