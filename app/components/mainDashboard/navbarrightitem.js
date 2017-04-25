import React from 'react';

export default class NavbarRightItem extends React.Component {

  render() {

    return (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="#" onClick={(e) => this.props.handleUserChange(e)}>Change Active User</Link></li>
        <li><Link to="#" data-toggle="modal" data-target="#asModal"><span className="glyphicon glyphicon-user"></span> Settings</Link></li>
        <li><Link to="#" onClick={ () => window.alert("Authentication and logout features coming soon!") }><span className="glyphicon glyphicon-log-in"></span> Logout</Link></li>
      </ul>
    )
  }
}
