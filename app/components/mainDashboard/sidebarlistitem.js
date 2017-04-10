import React from 'react';

export default class SidebarListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: this.props.playlist
    };
  }

  render() {
    return (
      <li className="active sidebarListItem"><a className="sidebarListItem" href="#" onClick={(e) => this.props.handleSelectPlaylist(e, this.state.playlist)}>{this.state.playlist.name}</a></li>
    )
  }
}
