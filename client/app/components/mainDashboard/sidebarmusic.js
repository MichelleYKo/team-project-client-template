import React from 'react';
import SidebarHeader from './sidebarheader';
import SidebarList from './sidebarlist';
import SidebarFooterMusic from './sidebarfootermusic';

export default class SidebarMusic extends React.Component {

  render() {
    return (
      <div id="sidebar" className="col-md-2 sidebar">
        <SidebarHeader />
        <hr />
        <SidebarList playlistJSON={this.props.playlistJSON} playlistCollection={this.props.playlistCollection} handleSelectPlaylist={this.props.handleSelectPlaylist}/>
        <SidebarFooterMusic currentSong={this.props.currentSong} />
      </div>
    )
  }
}
