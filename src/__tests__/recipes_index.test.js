import React from 'react';
import {Link, MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';

import RecipesIndex from '../recipes_index';

test('RecipesIndex renders when accessed', () => {
  const component = renderer.create(
    <MemoryRouter>
      <RecipesIndex />
    </MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  /*
  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  */
});
