import React from 'react';

class LoginView extends React.Component {
  render() {
    return (
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html"><b>Foodie</b></a>
          </div>

          <div className="login-box-body">
            <p className="login-box-msg">Sign in</p>

            <form action="../../index2.html" method="post">
              <div className="form-group has-feedback">
                <input type="email" className="form-control" placeholder="Email" />
                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
              </div>
              <div className="form-group has-feedback">
                <input type="password" className="form-control" placeholder="Password" />
                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div className="row">
                <div className="col-xs-8">
                  <div className="checkbox icheck">
                    <label>
                      <input type="checkbox" /> Remember Me
                    </label>
                  </div>
                </div>
                <div className="col-xs-4">
                  <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                </div>
              </div>
            </form>

            <a href="#">Forgot Password?</a><br />
            <a href="register.html" className="text-center">Register new account</a>

          </div>
        </div>
      </div>
    );
  }
}

export default LoginView;
