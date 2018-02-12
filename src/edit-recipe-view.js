import React from 'react';
import {withRouter, Link} from 'react-router-dom';
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

class EditRecipeForm extends React.Component {
  constructor(props, recipeID) {
    super(props);
    this.state = {
      userId     : session.get('token'),
      title       : '',
      description : '',
      fulfilled   : '',
    };
    this.baseURL = 'http://127.0.0.1:5000'
    this.editRecipeEndpoint = this.baseURL + '/recipes/' + this.props.recipe.id + '/';

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

  recipeCreationSuccess = (data) => {
    console.log('Recipe was successfully updated');
    let recipe;
    let recipes = Recipes;
    recipe = new Recipe();
    recipe.set(data);
    recipes.add([recipe]);
    /*
     * TODO: Render recipe show page here. Also replace window.location.pathname
     * with this.props.history.push()
     */
    window.location.pathname = '/recipes/' + recipe.get('id');
    // this.props.history.push('/recipes/' + recipe.get('id'));
  }

  failure(error) {
    console.log('Data submission failed due to: ' + JSON.stringify(error));
    // this.setState({errorMessage: 'Please check email or password!'});
  }

  submitData(data) {
    /* Does the actual submission of the data to the server */
    $.ajax({
      url: this.editRecipeEndpoint,
      data: data,
      method: 'PATCH'
    })
      .done($.proxy(this.recipeCreationSuccess, this))
      .fail($.proxy(this.failure, this));
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Attempting to submit value" + this.state);
    let formData = this.serializeForm($("form")); //.serializeArray();
    console.log(formData);
    this.submitData(formData);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group has-feedback">
          <input type="text" className="form-control" placeholder="Title"
                 name="title" defaultValue = {this.props.recipe.title}
                 required/>
          <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
        </div>
        <div className="form-group has-feedback">
          <input type="text" className="form-control"
                 placeholder="Description" name="description"
                 defaultValue = {this.props.recipe.description}
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
            <button type="submit" className="btn btn-primary btn-block btn-flat">Update Recipe</button>
          </div>
        </div>
      </form>
    );
  }
}

class EditRecipeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: (session.authenticated() ? true : false),
      recipe: this.props.recipe
    };
  }

  renderRecipes = () => {
    // window.location = '/recipes';
    this.props.history.push('/recipes');
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
                  <p className="login-box-msg">
                    {'Editing Recipe: ' + this.state.recipe.id}
                  </p>
                  <EditRecipeForm recipe={this.state.recipe}/>

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

export default EditRecipeView;
