import React from 'react';
import {Link} from 'react-router-dom';

import $ from "jquery";
import _ from "underscore";

import session from "./models/session";
import Dashboard from './dashboard';
import MaterialUITestView from './material_ui_test_view';

class NewRecipeForm extends React.Component {
  constructor(props) {
    console.log(session.get('token'));
    super(props);
    this.state = {
      userId     : session.get('token'),
      title       : '',
      description : '',
      fulfilled   : '',
    };
    this.baseURL = 'http://127.0.0.1:5000'
    this.newRecipeEndpoint = this.baseURL + '/recipes/';

    // this.handleChange = this.handleChange.bind(this);
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
    // TODO: Render recipe show page here
  }

  failure() {
    console.log('Data submission failed');
    // this.setState({errorMessage: 'Please check email or password!'});
  }

  submitData(data) {
    /* Does the actual submission of the data to the server */
    $.post(this.newRecipeEndpoint, data)
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

class NewRecipeView extends React.Component {
  render() {
    return (
      <div>
        <div className="hold-transition login-page">
          <div className="login-box">
            <div className="login-logo">
              <a href="#"><b>New Recipe</b></a>
            </div>

            <div className="login-box-body">
              <p className="login-box-msg">Create New Recipe</p>
              <NewRecipeForm />


              <br />

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewRecipeView;
