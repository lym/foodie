import React from 'react';
import { expect } from 'chai';
import {shallow, mount} from 'enzyme';
import { spy } from 'sinon';

import {withRouter, Router, MemoryRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NewRecipeView from '../new-recipes-view';


describe('NewRecipeView', () => {
  it('Should not allow non-logged-in users to access recipe creation view', () => {
    let TestNewRecipeView = withRouter(NewRecipeView)
    const wrapper = shallow(
      <MemoryRouter>
        <MuiThemeProvider><TestNewRecipeView/></MuiThemeProvider>
      </MemoryRouter>
    );
    expect(wrapper.html()).to.contain(
      '<h1>Your session expired, please sign in</h1>'
    );
  });

  it('Should be in logged out state initially', () => {
    const wrapper = shallow(<NewRecipeView/>);
    expect(wrapper.state('logged_in')).to.equal(false);
  });
});
