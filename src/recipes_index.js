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
import Recipes from './collections/recipes';

class RecipesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: true,
      recipes: [],
      recipes_loaded: false
    };
    this.recipes = Recipes;  // Here
    this.recipes.fetch({
      success: this.renderRecipes,
      error: this.fetchError
    });
  }

  renderRecipes = (coln, res, options) => {
    // console.log('res ' + JSON.stringify(res));
    console.log(coln);
    this.setState({recipes: res, recipes_loaded: true});
  }

  fetchError(coln, res, options) {
    console.log("Collection is: " + coln.models);
    console.log("Response is " + res.responseText);
  }

  handleChange(event, logged_in) {
    this.setState({logged_in: logged_in});
  }

  handleClick(event) {
    window.location.pathname = '/new_recipe';
  }

  showRecipe = (event, recipeId) => {
    console.log('Attempting to show recipe...');
    console.log('Received recipe ID is: ' + recipeId);
    window.location.pathname = '/recipes/' + recipeId;
  }

  render() {
    if (!this.state.recipes_loaded) {
      return <h1>Loading recipes</h1>;
    }
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
            <List>
              {this.state.recipes.results.map((item) => (
                <ListItem
                  key={item.id.toString()}
                  primaryText={item.title + ': ' + item.description}
                  onClick={(ev, recId) => this.showRecipe(ev, item.id)}
                />
              ))}
            </List>
          </Paper>
        </div>
      </div>
      </div>
    );
  }
}

export default RecipesIndex;
