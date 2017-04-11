import React from 'react';
import MusicPlayer from './musicplayer'

export default class SidebarFooterMusic extends React.Component {
  render() {
    return (
      <div id="sidebar-footer-music">
        <ul className="nav nav-sidebar nav-sidebar-footer">
          <MusicPlayer currentSong = {this.props.currentSong} />
        </ul>
      </div>
    )
  }
}
