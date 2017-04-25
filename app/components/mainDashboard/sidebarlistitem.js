import React from 'react';
import {Link} from 'react-router';
export default class SidebarListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: this.props.playlist
    };
  }

  render() {
    return (
      <li className="active sidebarListItem"><Link className="sidebarListItem" to="#" onClick={(e) => this.props.handleSelectPlaylist(e, this.state.playlist)}>{this.state.playlist.name}</Link></li>
    )
  }
}
