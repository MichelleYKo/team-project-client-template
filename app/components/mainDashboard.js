import React from 'react';
import Sidebar from './mainDashboard/sidebar';
import Navbar from './mainDashboard/navbar';

export default class mainDashboard extends React.Component {
  render() {
    return (
      <div>
        //<Navbar />, document.body;
        <Sidebar />, document.getElementById('sidebar')
      </div>
    )
  }
}
