import React from 'react';

export default class SidebarHeader extends React.Component {
  render() {
    return (
      <div id="sidebar-header">
        <a className="btn btn-primary btn-lg btn-block createPlaylistBtn" data-toggle="modal" data-target="#cpModal" href="#">Create New Playlist</a>
      </div>
    )
  }
}
