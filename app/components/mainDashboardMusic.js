import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBodyMusic from './mainDashboard/mainbodymusic';
import CPModal from './cpmodal';
import ASModal from './asmodal';
import SRModal from './srmodal';
import {getPlaylistCollection} from '../server';

export default class mainDashboardMusic extends React.Component {

  constructor(props){
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this);
    this.handleSelectSong = this.handleSelectSong.bind(this);
    this.state = {
      user: 1,
      playlistCollection: [],
      currentPlaylist: {
        _id: 1,
        name: "",
        description: "",
        authors: [],
        dateCreated: 0,
        playlistItems: [],
        numSongs: 0
      },
      currentSong: {
        _id: 1,
        title: "",
        artists: [],
        album: "",
        genres: [],
        duration_ms: 0,
        upvotes: [0],
        downvotes: [0],
        associatedPlaylists: [0]

      }
    };
  }

  handleUserChange(e){
    e.preventDefault();
    var newID = parseInt(window.prompt("Enter a user ID:"), 10);
    this.setState({user: newID});
    getPlaylistCollection(newID, (playlistCollection) => {
      this.setState({playlistCollection: playlistCollection});
      this.setState({currentPlaylist: this.state.playlistCollection[0]})
    });
  }

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
		<div>
			<Navbar user={this.state.user} handleUserChange={this.handleUserChange} />
			<MainBodyMusic playlistCollection={this.state.playlistCollection} currentPlaylist = {this.state.currentPlaylist} currentSong = {this.state.currentSong} handleSelectPlaylist = {this.handleSelectPlaylist} handleSelectSong= {this.handleSelectSong}/>
      <CPModal />
      <ASModal />
      <SRModal />
		</div>
    )
  }
}
