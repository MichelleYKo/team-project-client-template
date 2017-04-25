import React from 'react';
import SidebarHeader from './sidebarheader';
import SidebarList from './sidebarlist';
import SidebarFooterMusic from './sidebarfootermusic';
import {getPlaylistCollection} from '../../server';

export default class SidebarMusic extends React.Component {

  handleSelectPlaylist(clickEvent, selectedPlaylist) {
    clickEvent.preventDefault();
    this.setState({currentPlaylist: selectedPlaylist});
  }

  handleSelectSong(clickEvent, selectedSong) {
    clickEvent.preventDefault();
    this.setState({currentSong: selectedSong});
  }

  refresh() {
    getPlaylistCollection(this.state.user, (playlistCollection) => {
      this.setState({playlistCollection: playlistCollection});
      this.setState({currentPlaylist: this.state.playlistCollection[0]})
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div id="sidebar" className="col-md-2 sidebar">
        <SidebarHeader />
        <hr />
        <SidebarList playlistCollection={this.props.playlistCollection} handleSelectPlaylist={this.props.handleSelectPlaylist}/>
        <SidebarFooterMusic currentSong={this.props.currentSong} />
      </div>
    )
  }
}
