import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBodyMusic from './mainDashboard/maintable';

export default class mainDashboardMusic extends React.Component {
  render() {
    return (
		<div>
			<Navbar />
			<MainBodyMusic />   
		</div>
    )
  }
}