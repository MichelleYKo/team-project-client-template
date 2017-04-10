import React from 'react';
import Sidebar from './sidebar';
import MainTable from './maintable'
import MusicPlayer from './musicplayer'


export default class MainBodyMusic extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
			<Sidebar playlistCollection={this.props.playlistCollection}/>
			<MainTable currentPlaylist={this.props.playlistCollection[0]}/>
			<MusicPlayer />
		</div>
	</div>
    )
  }
}
