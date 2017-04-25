import React from 'react';
import SidebarMusic from './sidebarmusic';
import EditAccountInfo from './editAccountInfo';

export default class mainBodyEditProfile extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
			<SidebarMusic playlistCollection={this.props.playlistCollection} handleSelectPlaylist={this.props.handleSelectPlaylist}/>
      <EditAccountInfo playlistCollection={this.props.playlistCollection} name={this.props.name} email={this.props.email} connectedAccts={this.props.connectedAccts}/>
		</div>
	</div>
    )
  }
}
