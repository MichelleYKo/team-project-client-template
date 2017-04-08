import React from 'react';
import SidebarListItem from './sidebarlistitem';
//import {getPlaylistCollection} from '../../server';

export default class SidebarList extends React.Component {

  render() {
    var collection = this.props.playlistCollection;
    return (
      <div id="sidebar-list">
        <ul className="nav nav-sidebar">
          {collection.map((playlist) => {
            return (
              <SidebarListItem key={playlist._id} playlist={playlist} />
            )
          })}
        </ul>
      </div>
    )
  }
}
