import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBody from './mainDashboard/maintable';

export default class mainDashboard extends React.Component {
  render() {
    return (
		<div>
			<Navbar />
			<MainBody />   
		</div>
    )
  }
}
