import React from 'react';
import Sidebar from './mainDashboard/sidebar';
import MainBody from './mainDashboard/maintable';

export default class mainDashboard extends React.Component {
  render() {
    return (
		<div>
			<Navbar />
			<Sidebar /> 
			<MainBody />   
		</div>
    )
  }
}