import React from 'react';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import LoggedIn from './logged-in';
import LoginButton from './login-button';


class FoodieDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: true
    };
  }

  handleChange(event, logged_in) {
    this.setState({logged_in: logged_in});
  }

  renderNewRecipeForm(event) {
    /* Responsible for rendering the form for creating new recipes */
    window.location.pathname = '/new_recipe';
  }
  renderRecipes(event) {
    window.location.pathname = '/recipes';
  }

  render() {
    return (
      <div>
        <Toggle
            label="Logged in/out"
            defaultToggled={true}
            onToggle={(i, j) => this.handleChange(i, j)}
            labelPosition="right"
            style={{margin: 20}}
          />
          <AppBar
            title="Foodie"
            iconElementRight={this.state.logged_in ? <LoggedIn /> : <LoginButton />}
          />
      <div className="row">
        <div className="col-xs-3 col-md-3">
          <Paper>
            <List>
              <ListItem
                primaryText="New Recipe"
                onClick={this.renderNewRecipeForm}
              />
              <ListItem
                primaryText="All Recipes"
                onClick={this.renderRecipes}
              />
            </List>
          </Paper>
        </div>
        <div className="col-xs-8 col-md-8">
          <Paper>
            <GridList>
              <Subheader>It looks like you do not have any recipes yet. Begin by creating some</Subheader>
            </GridList>
          </Paper>
        </div>
      </div>
      </div>
    );
  }
}

export default FoodieDashboard;
