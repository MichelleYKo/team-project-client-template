import React from 'react';
import Sidebar from './mainDashboard/sidebar';
import MainBodyMusic from './mainDashboard/maintable';

export default class mainDashboardMusic extends React.Component {
  render() {
    return (
		<div>
			<Navbar />
			<Sidebar /> 
			<MainBodyMusic />   
		</div>
    )
  }
}