import React from 'react';

import SidebarHeader from './sidebarheader';
import SidebarList from './sidebarlist';
import SidebarFooter from './sidebarfooter';

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
