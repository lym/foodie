import React from 'react';
import { expect } from 'chai';
import {shallow, mount} from 'enzyme';

import {withRouter, Router, MemoryRouter} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import SearchBar from 'material-ui-search-bar';
import RecipesIndex from '../recipes_index';
import {FoodieAppBar} from '../components/foodie-app-bar';
import {FoodieSidebarMenu} from '../components/foodie-sidebar-menu';


describe('the environment', () => {
  it('works, hopefully', () => {
    expect(true).to.be.true;
  });
});

describe('RecipesIndex', () => {
  it('Should not allow non-logged-in users to access the recipes list', () => {
    const wrapper = shallow(<MemoryRouter><RecipesIndex/></MemoryRouter>);
    console.log(wrapper.html());
    expect(wrapper.html()).to.contain(
      '<h1>Your session expired, please sign in</h1>'
    );
  });
});
