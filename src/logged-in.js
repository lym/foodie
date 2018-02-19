import React from 'react';
import {withRouter} from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import session from './models/session';


class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
  }
  static muiName = 'IconMenu';

  logout = () => {
    session.delete();
    this.props.history.push('/login');
  }

  render () {
    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Settings" />
        <MenuItem primaryText="Sign Out" onClick={this.logout} />
      </IconMenu>
    );
  }
}

export default withRouter(LoggedIn);
