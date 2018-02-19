import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';


class RecipeInstructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <strong>Method:</strong>
        <List>
          {this.props.instructions.map((instruction) => (
            <ListItem
              key={instruction.id.toString()}
              leftCheckbox={<Checkbox />}
              primaryText={instruction.title + ': ' + instruction.description}
            />
          ))}
        </List>
      </div>
    );
  }
}

export default RecipeInstructions;
