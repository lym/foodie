import React from 'react';
import {withRouter, Switch, Route } from 'react-router-dom';

import LoginView from './login-view';
import MaterialUITestView from './material_ui_test_view';
import RecipesIndex from './recipes_index';
import NewRecipeView from './new-recipes-view';
import RecipeShowView from './recipe-show-view';

class Application extends React.Component {

  render () {
    return (
      <Switch>
        <Route path="/login" component={LoginView} />
        <Route path="/new_recipe" component={NewRecipeView} />
        <Route path="/material_ui_test" component={MaterialUITestView} />
        <Route path="/recipes/:id" component={withRouter(RecipeShowView)} />
        <Route path="/recipes" component={withRouter(RecipesIndex)} />
      </Switch>
    );
  }
}

export default Application;
