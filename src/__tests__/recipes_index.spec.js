import React from 'react';
import { expect } from 'chai';
import {shallow, mount} from 'enzyme';
import { spy } from 'sinon';

import {withRouter, Router, MemoryRouter} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import SearchBar from 'material-ui-search-bar';
import RecipesIndex from '../recipes_index';
import {FoodieAppBar} from '../components/foodie-app-bar';
import {FoodieSidebarMenu} from '../components/foodie-sidebar-menu';

spy(RecipesIndex.prototype, 'componentDidMount');

describe('the environment', () => {
  it('works, hopefully', () => {
    expect(true).to.be.true;
  });
});

describe('RecipesIndex', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<RecipesIndex />);
    console.log(wrapper.instance());
    expect(RecipesIndex.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('Should not allow non-logged-in users to access the recipes list', () => {
    const wrapper = shallow(<MemoryRouter><RecipesIndex/></MemoryRouter>);
    expect(wrapper.html()).to.contain(
      '<h1>Your session expired, please sign in</h1>'
    );
  });

  it('Should be in logged-out state initially', () => {
    const wrapper = shallow(<RecipesIndex/>);
    expect(wrapper.state('logged_in')).to.equal(false);
  });

  it('should have an empty recipes list', () => {
    const wrapper = shallow(<RecipesIndex/>);
    expect(wrapper.state('recipes').length).to.equal(0);
  })
});
