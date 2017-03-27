import React from 'react';
<<<<<<< HEAD
import SidebarHeader from './sidebarheader';
import SidebarList from './sidebarlist';
import SidebarFooter from './sidebarfooter';
=======
import SidebarHeader from './sidebarheader.js';
import SidebarList from './sidebarlist.js';
import SidebarFooter from './sidebarfooter.js';
>>>>>>> 26e4ac246332fac82812f8ace37018ba34a2a269

export default class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar" className="col-md-2 sidebar">
        <SidebarHeader />
        <hr />
        <SidebarList />
        <SidebarFooter />
      </div>
    )
  }
}
