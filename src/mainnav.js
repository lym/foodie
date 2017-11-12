import React from 'react';

class MainNav extends React.Component {
  /* Contains logic for the MainNav which is situated in the left sidebar area
   */
  render () {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src="../../dist/img/user2-160x160.jpg" className="img-circle" alt="User's thumbnail" />
            </div>
            <div className="pull-left info">
              <p>Alexander Pierce</p>
              <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>

          {/* Sidebar (Main Navigation) */}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="treeview">
              <a href="#">
                <i className="fa fa-dashboard"></i> <span>New Recipe</span>
                <span className="pull-right-container">
                  <i className="fa fa-angle-left pull-right"></i>
                </span>
              </a>
            </li>
            <li className="treeview">
              <a href="#">
                <i className="fa fa-files-o"></i>
                <span>All Recipes</span>
                <span className="pull-right-container">
                  <span className="label label-primary pull-right">4</span>
                </span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}

export default MainNav;
