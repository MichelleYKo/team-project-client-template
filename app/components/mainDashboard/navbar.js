import React from 'react';
import NavbarLeftItem from './navbarleftitem';
import NavbarRightItem from './navbarrightitem';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="mainDashboard.html">
            <img src="img/Logo_HeadphonesOuterGlow.png" style="width:40px; height:40px;"/>
          </a>
          <NavbarLeftItem />
          <NavbarRightItem />
        </div>
      </nav>
    )
  }
}
