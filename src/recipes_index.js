import React from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import SearchBar from 'material-ui-search-bar';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import $ from 'jquery';
import _ from 'underscore';

import LoggedIn from './logged-in';
import LoginButton from './login-button';
import Recipes from './collections/recipes';

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
      <div>
      {/*
        <Toggle
            label="Logged in/out"
            defaultToggled={true}
            onToggle={(i, j) => this.handleChange(i, j)}
            labelPosition="right"
            style={{margin: 20}}
          />
       */}
          <AppBar
            title="Foodie"
            iconElementRight={this.state.logged_in ? <LoggedIn /> : <LoginButton />}
          />
      </div>
    );
  }
}

class FoodieSidebarMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    this.props.history.push('/new_recipe');
  }

  renderRecipes = () => {
    // window.location = '/recipes';
    this.props.history.push('/recipes');
  }

  render() {
    return (
        <div className="col-xs-3 col-md-3">
          <Paper>
            <List>
              <ListItem
                primaryText="New Recipe"
                onClick={this.handleClick}
              />
              <ListItem
                primaryText="All Recipes"
                onClick={this.renderRecipes}
              />
            </List>
          </Paper>
        </div>
    );
  }
}

FoodieSidebarMenu = withRouter(FoodieSidebarMenu);
export {FoodieSidebarMenu};

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
    // Perhaps initialize Recipes collection here and access all coln mtds
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

  handleClick = (event) => {
    this.props.history.push('/new_recipe');
  }

  showRecipe = (event, recipeId) => {
    console.log('Attempting to show recipe...');
    console.log('Received recipe ID is: ' + recipeId);
    this.props.history.push('/recipes/' + recipeId);
  }

  goodSearch = (data) => {
    // Update `recipes` which will trigger a re-render.
    this.setState({recipes: data, recipes_loaded: true});
  }

  badSearch = (data) => {
    console.log('Search failed due to ' + JSON.stringify(data));
  }

  searchRecipes = () => {
    let searchURL = 'http://127.0.0.1:5000/search/recipes?q=' +
      this.state.searchTerm;
    console.log('Search is being requested ' + this.state.searchTerm);
    $.get(searchURL).done(this.goodSearch).fail(this.badSearch);
  }

  render() {
    if (!this.state.recipes_loaded) {
      return <h1>Loading recipes</h1>;
    }
    return (
      <div>
        <FoodieAppBar />
      <div className="row">
        <FoodieSidebarMenu />
        <div className="col-xs-8 col-md-8">
          <SearchBar
            hintText="Search recipes"
            onChange={
              (value) => {
                this.setState({searchTerm: value});
              }
            }
            onRequestSearch={this.searchRecipes}
          />
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

RecipesIndex = withRouter(RecipesIndex);

export default RecipesIndex;
