import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './dashboard';
import LoginView from './login-view';
import MaterialUITestView from './material_ui_test_view';
import RecipesIndex from './recipes_index';

class Application extends React.Component {

  render () {
    return (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={LoginView} />
        <Route path="/material_ui_test" component={MaterialUITestView} />
        <Route path="/recipes" component={RecipesIndex} />
      </Switch>
    );
  }
}

export default Application;
