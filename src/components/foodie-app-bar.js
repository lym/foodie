import React from 'react';
import AppBar from 'material-ui/AppBar';
import LoggedIn from '../logged-in';
import LoginButton from '../login-button';

export class FoodieAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: true,
      searchTerm: ''
    }
  }

  handleChange(event, logged_in) {
    this.setState({logged_in: logged_in});
  }

  render() {
    return (
      <AppBar
        title="Foodie"
        iconElementRight={this.state.logged_in ? <LoggedIn /> : <LoginButton />}
      />
    );
  }
}
