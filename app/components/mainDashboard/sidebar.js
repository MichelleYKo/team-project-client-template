import React from 'react';
import SidebarHeader from './mainDashboard/sidebarheader';
import SidebarList from './mainDashboard/sidebarlist';
import SidebarFooter from './mainDashboard/sidebarfooter';

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
