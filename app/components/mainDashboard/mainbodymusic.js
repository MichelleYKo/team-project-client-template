import React from 'react';
import MainTable from './maintable'
import MusicPlayer from './musicplayer'


export default class MainBodyMusic extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
			<Sidebar />
			<MainTable />
			<MusicPlayer />
		</div>
	</div>
    )
  }
}
