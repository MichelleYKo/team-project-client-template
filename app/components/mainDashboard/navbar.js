import React from 'react';
import NavbarLeftItem from './navbarleftitem';
import NavbarRightItem from './navbarrightitem';



export default class Navbar extends React.Component {
  render() {
    var divStyle = {
        width: 40,
        height: 40
    };
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="mainDashboard.html">
            <img src="img/Logo_HeadphonesOuterGlow.png" style={divStyle}/>
          </a>
          <NavbarLeftItem />
          <NavbarRightItem handleUserChange={this.props.handleUserChange}/>
        </div>
      </nav>
    )
  }
}
