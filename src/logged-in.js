import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import React from 'react';

import session from './models/session';

let logout;
logout = () => {
  session.delete();
  window.location.pathname = 'login';
}

const LoggedIn = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Help" />
    <MenuItem primaryText="Settings" />
    <MenuItem
      primaryText="Sign Out"
      onClick={logout}
    />
  </IconMenu>
);

LoggedIn.muiName = 'IconMenu';

export default LoggedIn;
