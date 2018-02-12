import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Toggle from 'material-ui/Toggle';

import LoggedIn from './logged-in';
import LoginButton from './login-button';

import $ from "jquery";
import _ from "underscore";

import session from "./models/session";
import Recipes from './collections/recipes';
import Recipe from './models/recipe.js';
import Dashboard from './dashboard';
import MaterialUITestView from './material_ui_test_view';
import EditRecipeView from './edit-recipe-view';


class RecipeShowView extends React.Component {
  constructor(props) {
    super(props);
    let recipes = Recipes;
    this.recipe = new Recipe(recipes.url + props.match.params.id + '/');
    this.recipe.fetch({
      /*
       * The `success` and `error` callbacks receive three args:
       * @model
       * @response:
       * @options
      */
      success: this.setRecipes,
      error: function (model, response, options) {
        console.log('Error: Model not retrieved');
      }
    })
    super(props);  // FIXME: Why is this here?
    this.deleteRecipeEndpoint = recipes.url + props.match.params.id + '/';
    this.state = {
      logged_in: session.authenticated() ? true : false,
      editMode: false,
      recipe: {}
    };
  }

  setRecipes = (model, response, options) => {
    this.setState({recipe: response});
  }

  renderRecipes() {
    window.location.pathname = 'recipes';
  }

  renderNewRecipeForm() {
    window.location.pathname = '/new_recipe';
  }

  editRecipe = (event, recipe) => {
    console.log('Received recipe ID is: ' + recipe['id']);
    // this.props.history.push('/recipes/' + this.state.recipe['id'] + '/edit/');
    this.setState({editMode: true});
  }

  recipeDeletionSuccess = (data) => {
    console.log(JSON.stringify(data));
    console.log('Recipe successfully deleted!');
  }

  failure = (data) => {
    console.log(JSON.stringify(data));
    console.log('Recipe deletion failed!');
  }

  deleteRecipe = (event, recipe) => {
    $.ajax({
      url: this.deleteRecipeEndpoint,
      method: 'DELETE'
    })
      .done($.proxy(this.recipeDeletionSuccess, this))
      .fail($.proxy(this.failure, this));
    this.props.history.push('/recipes');
  }

  render() {
    if (!this.state.editMode) {
      if (!this.state.recipe) {
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

          <div className="container-fluid">
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
              <div className="col-xs-9 col-md-9">
                <Paper>
                  <div className="login-box-body">
                    <Card>
                      <CardHeader title={this.state.recipe['title']}>
                      </CardHeader>
                      {/*
                      <CardMedia
                        overlay={<CardTitle title={this.state.recipe.title} subtitle="Overlay subtitle" />}
                        >
                        <img
                          src="http://yummy-recipez.herokuapp.com/static/images/generic_recipe_image.png"
                          alt= "Generic recipe Image" // height="100" width="100"
                        />
                      </CardMedia>
                      */}
                      <CardText>
                        {this.state.recipe['description']}
                      </CardText>

                      <CardActions>
                        <FlatButton
                          // href={'/recipes/' + this.state.recipe['id'] + '/edit/'}
                          label="Edit Recipe" recipemodel={this.state.recipe}
                          onClick={(ev, recipe) => this.editRecipe(ev, this.state.recipe)}
                        />
                        <FlatButton
                          label="Delete Recipe"
                          onClick={(ev, recipe) => this.deleteRecipe(ev, this.state.recipe)}
                        />
                      </CardActions>
                    </Card>
                    <br />

                  </div>
                </Paper>
              </div>
            </div>
          </div>

        </div>
      );
    }
    else {
      return (<EditRecipeView recipe={this.state.recipe}/>);
    }
  }
}

export default RecipeShowView;
