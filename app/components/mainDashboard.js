import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBody from './mainDashboard/mainbody';
import { getPlaylistCollection } from '../server';

export default class mainDashboard extends React.Component {
  constructor(props){
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this);
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

  handlePlaySong(clickEvent, selectedSong) {
    clickEvent.preventDefault();
    this.setState({currentPlaylist: selectedPlaylist});
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
			<Navbar user={this.state.user} handleUserChange={this.handleUserChange}/>
			<MainBody playlistCollection={this.state.playlistCollection} currentPlaylist={this.state.currentPlaylist} handleSelectPlaylist={this.handleSelectPlaylist}/>
		</div>
    )
  }
}
