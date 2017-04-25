import React from 'react';
import SidebarMusic from './sidebarmusic';
import MainTable from './maintable'



export default class MainBodyMusic extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
      //<SidebarMusic playlistCollection={this.props.playlistCollection} currentSong = {this.props.currentSong} handleSelectPlaylist={this.props.handleSelectPlaylist}/>
      <MainTable currentPlaylist={this.props.currentPlaylist} handleSelectSong={this.props.handleSelectSong}/>
		</div>
	</div>
    )
  }
}
