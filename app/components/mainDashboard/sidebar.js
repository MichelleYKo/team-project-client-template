import React from 'react';
import SidebarHeader from './sidebarheader.js';
import SidebarList from './sidebarlist.js';
import SidebarFooter from './sidebarfooter.js';

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
