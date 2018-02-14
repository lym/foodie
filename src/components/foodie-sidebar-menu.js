import React from 'react';
import {withRouter} from 'react-router-dom';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';

class FoodieSidebarMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = (event) => {
    this.props.history.push('/new_recipe');
  }

  renderRecipes = () => {
    // window.location = '/recipes';
    this.props.history.push('/recipes');
  }

  render() {
    return (
        <div className="col-xs-3 col-md-3">
          <Paper>
            <List>
              <ListItem
                primaryText="New Recipe"
                onClick={this.handleClick}
              />
              <ListItem
                primaryText="All Recipes"
                onClick={this.renderRecipes}
              />
            </List>
          </Paper>
        </div>
    );
  }
}

FoodieSidebarMenu = withRouter(FoodieSidebarMenu);
export {FoodieSidebarMenu};
