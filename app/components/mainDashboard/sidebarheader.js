import React from 'react';

export default class SidebarHeader extends React.Component {
  render() {
    return (
      <div id="sidebar-header">
        <ul className="nav nav-sidebar">
          <a href="createPlaylist.html" className="btn btn-primary btn-lg btn-block createPlaylistBtn">Create New Playlist</a>
        </ul>
      </div>
    )
  }
}
