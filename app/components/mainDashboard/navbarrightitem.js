import React from 'react';

export default class NavbarRightItem extends React.Component {
  render() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="accountSettings.html"><span className="glyphicon glyphicon-user"></span> Settings</a></li>
        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
      </ul>
    )
  }
}
