import React from 'react';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import _ from 'underscore';

import LoggedIn from './logged-in';
import LoginButton from './login-button';

import {Recipes} from './models/recipe';


class RecipesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: true,
      recipes: 'Looks like you do not have any recipes yet. Begin by creating some'
    };
    this.recipes = new Recipes();
    /*
    this.recipes.fetch({
      success: this.renderRecipes,
      error: this.fetchError
    });
    */
    this.recipes.fetch();
  }

  renderRecipes(coln, res, options) {
    console.log(coln.models);
    _.each(res, function (recipe) {
      console.log(recipe.title);
    });
    console.log(res.responseText);
    console.log(res);
    this.setState({recipes: res});
  }

  fetchError(coln, res, options) {
    console.log("Collection is: " + coln.models);
    console.log("Response is " + res.responseText);
  }

  handleChange(event, logged_in) {
    this.setState({logged_in: logged_in});
  }

  handleClick(event) {
    window.location.pathname = '/dashboard';
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
                onClick={this.handleClick}
              />
              <ListItem primaryText="All Recipes" />
            </List>
          </Paper>
        </div>
        <div className="col-xs-8 col-md-8">
          <Paper>
            <GridList>
              <Subheader>{this.recipes.toJSON()[0].title}</Subheader>
            </GridList>
          </Paper>
        </div>
      </div>
      </div>
    );
  }
}

export default RecipesIndex;
