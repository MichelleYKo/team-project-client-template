import React from 'react';

export default class SidebarHeader extends React.Component {
  render() {
    return (
      <div id="sidebar-header">
        <Link className="btn btn-primary btn-lg btn-block createPlaylistBtn" data-toggle="modal" data-target="#cpModal" to="#">Create New Playlist</Link>
      </div>
    )
  }
}
