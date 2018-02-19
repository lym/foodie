import React from 'react';
import { expect } from 'chai';
import {shallow, mount} from 'enzyme';
import { spy } from 'sinon';

import {withRouter, MemoryRouter} from 'react-router-dom';
import RecipeShowView from '../recipe-show-view';


describe('RecipeShowView', () => {
  it('Should not allow non-logged-in users to access a recipe show view', () => {
    let TestRecipeShowView = withRouter(RecipeShowView);
    const wrapper = shallow(<MemoryRouter><TestRecipeShowView/></MemoryRouter>);
    expect(wrapper.html()).to.contain(
      '<h1>Your session expired, please sign in</h1>'
    );
  });
});
