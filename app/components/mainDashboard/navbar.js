import React from 'react';
import NavbarLeftItem from './navbarleftitem';
import NavbarRightItem from './navbarrightitem';
//import ResetDatabase from '../../database';
//import {Link} from 'react-router';
//import {getPlaylistCollection} from '../../server';


export default class Navbar extends React.Component {

  render() {
    var divStyle = {
        width: 40,
        height: 40
    };
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="img/Logo_HeadphonesOuterGlow.png" style={divStyle}/>
          </a>
          <NavbarLeftItem />
          <NavbarRightItem handleUserChange={this.props.handleUserChange}/>

        </div>
      </nav>
    )
  }
}
