import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import {Card, CardHeader, CardMedia, CardText, CardTitle} from 'material-ui/Card';
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
import Dashboard from './dashboard';
import MaterialUITestView from './material_ui_test_view';


class RecipeShowView extends React.Component {
  constructor(props) {
    let recipes = new Recipes();
    super(props);
    console.log('Current props' + this.props);
    console.log('URL param is: ' + props.match.params.id);  // Access url param
    console.log('inspecting recipe collection....' + recipes.length);
    console.log('Inspecting Recipe models....' + recipes.models);
    console.log('Retrieving model....' + recipes.get(props.match.params.id));
    this.state = {
      logged_in: session.authenticated() ? true : false,
      recipe: {
        'id': 2,
        'title': 'Client-side test recipe',
        'description': 'This test recipe appears only in JavaScript!',
        'fulfilled': true
      }
    };
  }

  renderRecipes() {
    window.location.pathname = 'recipes';
  }

  renderNewRecipeForm() {
    window.location.pathname = '/new_recipe';
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

                  <p>Individual recipe will be here! </p>
                  <Card>
                    <CardHeader title={this.state.recipe.title}>
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
                      {this.state.recipe.description}
                    </CardText>
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
}

export default RecipeShowView;
