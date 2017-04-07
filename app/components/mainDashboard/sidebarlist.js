import React from 'react';
import SidebarListItem from './sidebarlistitem';
import {getPlaylistCollection} from '../../server';

export default class SidebarList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playlistCollection: []
    };
  }

  refresh() {
    getPlaylistCollection(this.props.user, (playlistCollection) => {
      this.setState({playlistCollection: playlistCollection});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div id="sidebar-list">
        <ul className="nav nav-sidebar">
          {this.state.playlistCollection.map((playlist) => {
            return (
              <SidebarListItem key={playlist._id} playlist={playlist} />
            )
          })}
        </ul>
      </div>
    )
  }
}
