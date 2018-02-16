import React from 'react';
import {withRouter, Link, Redirect} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import SearchBar from 'material-ui-search-bar';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';
import $ from 'jquery';
import _ from 'underscore';

import session from './models/session';

import LoggedIn from './logged-in';
import LoginButton from './login-button';
import Recipes from './collections/recipes';
import {FoodieAppBar} from './components/foodie-app-bar';
import {FoodieSidebarMenu} from './components/foodie-sidebar-menu';


class RecipesIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: session.authenticated() ? true : false,
      recipes: [],
      recipes_loaded: false

    };
  }

  renderRecipes = (coln, res, options) => {
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

  componentDidMount() {
    this.recipes = Recipes;  // Here
    this.recipes.fetch({
      success: this.renderRecipes,
      error: this.fetchError
    });
  }

  render() {
    if (!this.state.logged_in) {
      return (
        <div>
          <h1>Your session expired, please sign in</h1>
          <Link to="/login">Go to login page</Link>
        </div>
      );
    }
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

export default RecipesIndex;
