import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBodyMusic from './mainDashboard/mainbodymusic';

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