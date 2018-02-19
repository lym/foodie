import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
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
import Instructions from './collections/instructions';
import Recipe from './models/recipe.js';
import Dashboard from './dashboard';
import MaterialUITestView from './material_ui_test_view';
import EditRecipeView from './edit-recipe-view';
import {NewInstructionForm} from './new-recipes-view';
import RecipeInstructions from './components/recipe-instructions';
import {FoodieAppBar} from './components/foodie-app-bar';
import {FoodieSidebarMenu} from './components/foodie-sidebar-menu';


class RecipeShowView extends React.Component {
  constructor(props) {
    super(props);
    let recipes = Recipes;
    this.allInstructionsURL = "http://127.0.0.1:5000/instructions/";
    super(props);  // FIXME: Why is this here?
    this.deleteRecipeEndpoint = recipes.url + props.match.params.id + '/';
    this.state = {
      logged_in: session.authenticated() ? true : false,
      editMode: false,
      addingInstruction: false,  // Set to true to render new instructions modal
      recipe: {},
      instructions: []
    };
  }

  logInstructions = (coln, res, options) => {
    this.setState({instructions: res});
  }

  failedInst = (coln, res, options) => {
    console.log('Retrieval failed because ' + JSON.stringify(res));
  }

  actions = () => {
    let actions = [
      <NewInstructionForm recipe={this.state.recipe}/>,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeInstrModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.submitInstruction}
      />,
    ];
    return actions;
  }

  closeInstrModal = (ev) => {
    this.setState({addingInstruction: false});
  }

  instructionCreationSuccess(data) {
    this.setState({addingInstruction: false});
    this.props.history.push('/recipes/' + data.recipe_id);
  }

  submitInstruction = (ev) => {
    let newInstructionForm = new NewInstructionForm();
    let instructitionsEndpoint = newInstructionForm.baseURL + '/instructions/'
    let formData = newInstructionForm.serializeForm($("form")); //.serializeArray();
    $.post(instructitionsEndpoint, formData)
      .done($.proxy(this.instructionCreationSuccess, this))
      .fail($.proxy(newInstructionForm.failure, this));
  }

  setRecipes = (model, response, options) => {
    this.setState({recipe: response});
  }

  editRecipe = (event, recipe) => {
    this.setState({editMode: true});
  }

  addInstruction = (event, recipe) => {
    this.setState({addingInstruction: true});
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

  appendInstruction = () => {
    console.log('Instruction model closed!');
    this.setState({open: false});
  };

  componentDidMount() {
    let recipes = Recipes;
    this.recipe = new Recipe(recipes.url + this.props.match.params.id + '/');
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
    });

    let instructions = new Instructions({
      url: this.allInstructionsURL + "?recipe=" + this.props.match.params.id
    });
    instructions.fetch({
      success: this.logInstructions,
      error: this.failedInst
    });
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
    if (!this.state.editMode) {
      if (!this.state.recipe) {
        return <h1>Loading recipes</h1>;
      }
      return (
        <div>
          <FoodieAppBar />

          <div className="container-fluid">
            <div className="row">
              <FoodieSidebarMenu />

              <Dialog
                title={"Adding instructions for " + this.state.recipe.title}
                actions={this.actions()}
                modal={false}
                open={this.state.addingInstruction}
                onRequestClose={this.appendInstruction}
              >
              </Dialog>

              <div className="col-xs-9 col-md-9">
                <Paper>
                  <div className="login-box-body">
                    <Card>
                      <CardHeader title={this.state.recipe['title']}
                        subtitle={this.state.recipe['description']}
                      >
                      </CardHeader>
                      <hr />
                      <CardText>
                        <RecipeInstructions instructions={this.state.instructions} />
                      </CardText>

                      <CardActions>
                        <FlatButton
                          label="Edit Recipe" recipemodel={this.state.recipe}
                          onClick={(ev, recipe) => this.editRecipe(ev, this.state.recipe)}
                        />

                        <FlatButton
                          label="Add Instruction" recipemodel={this.state.recipe}
                          onClick={(ev, recipe) => this.addInstruction(ev, this.state.recipe)}
                          primary={true}
                        />

                        <FlatButton
                          label="Delete Recipe"
                          onClick={(ev, recipe) => this.deleteRecipe(ev, this.state.recipe)}
                          secondary={true}
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
