import React from 'react';

export default class NavbarRightItem extends React.Component {

  handleUserChange(clickEvent){
    clickEvent.preventDefault();
  }

  render() {

    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={(e) => this.props.handleUserChange(e)}>Change Active User</a></li>
        <li><a href="accountSettings.html"><span className="glyphicon glyphicon-user"></span> Settings</a></li>
        <li><a href="#" onClick={ () => window.alert("Authentication and logout features coming soon!") }><span className="glyphicon glyphicon-log-in"></span> Logout</a></li>
      </ul>
    )
  }
}
