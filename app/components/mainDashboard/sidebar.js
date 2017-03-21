import React from 'react';
import SidebarHeader from './mainDashboard/sidebarheader';
import SidebarList from './mainDashboard/sidebarlist';
import SidebarFooter from './mainDashboard/sidebarfooter';

export default class Sidebar extends React.Component {
  render() {
    return (
      <div>
        <SidebarHeader />
        <hr />
        <SidebarList />
        <SidebarFooter />
      </div>
    )
  }
}
