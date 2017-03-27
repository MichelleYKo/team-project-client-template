import React from 'react';
import Sidebar from './mainDashboard/sidebar';
import MainTable from './mainDashboard/maintable';

export default class MainBody extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
			<Sidebar />
			<MainTable />
		</div>
	</div>
    )
  }
}