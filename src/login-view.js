import React from 'react';
import $ from "jquery";
import _ from "underscore";

import Session from "./models/session";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    };
    this.baseURL = 'http://127.0.0.1:5000'
    this.loginEndpoint = this.baseURL + '/login/';

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  serializeForm(form) {
    /* Transform funky result from `$.serializeArray()` into easy-to-manipulate
     * JavaScript object
     */
    return _.object(_.map(form.serializeArray(), function (item) {
        // Convert object to tuple of (name, value)
        return [item.name, item.value];
    }));
  }

  loginSuccess(data) {
    let session = new Session();
    session.save(data.token);
    console.log('Token in local storage: ' + localStorage.apiToken);
  }

  failure() {
    console.log('Data submission failed');
    this.setState({errorMessage: 'Please check email or password!'});
  }

  submitData(data) {
    /* Does the actual submission of the data to the server */
    $.post(this.loginEndpoint, data)
      .done($.proxy(this.loginSuccess, this))
      .fail($.proxy(this.failure, this));
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Attempting to submit value" + this.state);
    let formData = this.serializeForm($("form")); //.serializeArray();
    console.log(formData);
    this.submitData(formData);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group has-feedback">
          <input type="email" className="form-control" placeholder="Email"
                 name="email" required/>
          <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <input type="password" className="form-control"
                 placeholder="Password" name="password" required
                  />
          <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          <span className="error-block">
            {this.state.errorMessage}
          </span>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
          </div>
        </div>
      </form>
    );
  }
}

class LoginView extends React.Component {
  render() {
    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="#"><b>Foodie</b></a>
          </div>

          <div className="login-box-body">
            <p className="login-box-msg">Sign in</p>
            <LoginForm />


            <br />
            <a href="#" className="text-center">Register new account</a>

          </div>
        </div>
      </div>
    );
  }
}

export default LoginView;
