import React from 'react';
import SidebarListItem from './sidebarlistitem';

export default class SidebarList extends React.Component {

  render() {
    var collection = this.props.playlistJSON;
    return (
      <div id="sidebar-list">
        <ul className="nav nav-sidebar">
          {collection.map((playlist) => {
            return (
              <SidebarListItem key={playlist._id} playlist={playlist} handleSelectPlaylist={this.props.handleSelectPlaylist}/>
            )
          })}
        </ul>
      </div>
    )
  }
}
