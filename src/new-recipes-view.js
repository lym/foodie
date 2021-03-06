import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
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
import Recipe from './models/recipe';
import Recipes from './collections/recipes';
import Dashboard from './dashboard';
import MaterialUITestView from './material_ui_test_view';
import RecipeShowView from './recipe-show-view';
import {FoodieAppBar} from './components/foodie-app-bar';
import {FoodieSidebarMenu} from './components/foodie-sidebar-menu';

export class NewRecipeForm extends React.Component {
  constructor(props) {
    console.log(session.get('token'));
    super(props);
    this.state = {
      logged_in   : session.authenticated() ? true : false,
      userId      : session.get('token'),
      title       : '',
      description : '',
      fulfilled   : '',
    };
    this.baseURL = 'http://127.0.0.1:5000'
    this.newRecipeEndpoint = this.baseURL + '/recipes/';

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

  recipeCreationSuccess(data) {
    console.log('Congratulations! Your recipe was created');
    let recipe;
    let recipes = Recipes;
    recipe = new Recipe();
    recipe.set(data);
    recipes.add([recipe]);
    window.location.pathname = '/recipes/' + recipe.get('id');
  }

  failure(error) {
    console.log('Data submission failed due to: ' + JSON.stringify(error));
  }

  submitData(data) {
    /* Does the actual submission of the data to the server */
    $.post(this.newRecipeEndpoint, data)
      .done($.proxy(this.recipeCreationSuccess, this))
      .fail($.proxy(this.failure, this));
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = this.serializeForm($("form")); //.serializeArray();
    this.submitData(formData);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group has-feedback">
          <input type="text" className="form-control" placeholder="Title"
                 name="title" required/>
          <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <input type="text" className="form-control"
                 placeholder="Description" name="description"
                  />
          <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          <span className="error-block">
            {this.state.errorMessage}
          </span>
        </div>

        <div className="row">
          <div className="col-xs-8">
            <div className="checkbox icheck">
              <label>
                <input type="checkbox"/>Fulfilled
              </label>
            </div>
          </div>
        </div>

        <input type="hidden" className="form-control" id="user_id" name='user_id'
               value={this.state.userId} />

        <div className="row">
          <div className="col-xs-12">
            <button type="submit" className="btn btn-primary btn-block btn-flat">Create Recipe</button>
          </div>
        </div>
      </form>
    );
  }
}

export class NewInstructionForm extends NewRecipeForm {
  constructor(props) {
    super(props);
    console.log('NewInstructionForm props: ' + JSON.stringify(this.props));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group has-feedback">
          <input type="text" className="form-control" placeholder="Title"
                 name="title" required/>
          <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <input type="text" className="form-control"
                 placeholder="Description" name="description"
                  />
          <span className="glyphicon glyphicon-lock form-control-feedback"></span>
          <span className="error-block">
            {this.state.errorMessage}
          </span>
        </div>

        <input type="hidden" className="form-control" id="user_id" name='user_id'
               value={this.state.userId} />
        <input type="hidden" className="form-control" id="recipe_id" name='recipe_id'
               value={this.props.recipe.id} />

      </form>
    );
  }
}

class NewRecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: session.authenticated() ? true : false,
    };
  }

  renderRecipes () {
    window.location = '/recipes';
  }

  render() {
    if (!this.state.logged_in) {
      return (
        <div>
          <h1>Your session expired, please sign in</h1>
          <a href="/login">Go to login page</a>
        </div>
      );
    }
    return (
      <div>
        <FoodieAppBar />

        <div className="container-fluid">
          <div className="row">
            <FoodieSidebarMenu />
            <div className="col-xs-9 col-md-9">
              <Paper>
                <div className="login-box-body">
                  <p className="login-box-msg">New Recipe</p>
                  <NewRecipeForm />

                  <br />

                </div>
              </Paper>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default NewRecipeView;
