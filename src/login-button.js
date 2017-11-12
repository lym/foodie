import React from 'react';
import FlatButton from 'material-ui/FlatButton';

class LoginButton extends React.Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <FlatButton {...this.props} label="Login" href="/login" />
    );
  }
}

export default LoginButton;
