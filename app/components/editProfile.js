import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBodyEditProfile from './mainDashboard/mainBodyEditProfile';
import {getPlaylistCollection} from '../server';
import {getEmail} from '../server';
import {getName} from '../server';
import {getConnectedAccts} from '../server';

export default class editProfile extends React.Component {
  constructor(props){
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this);
    this.state = {
      user: 1,
      name: "",
      email: "",
      connectedAccts: [],
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
  }

  handleSelectPlaylist(clickEvent, selectedPlaylist) {
    clickEvent.preventDefault();
    this.setState({currentPlaylist: selectedPlaylist});
  }

  refresh() {
    getPlaylistCollection(this.state.user, (playlistCollection) => {
      this.setState({playlistCollection: playlistCollection});
      this.setState({currentPlaylist: this.state.playlistCollection[0]})
    });
    getEmail(this.state.user, (email) => {
      this.setState({email: email})
    });
    getName(this.state.user, (name) => {
      this.setState({name: name})
    });
    getConnectedAccts(this.state.user, (connectedAccts) => {
      this.setState({connectedAccts: connectedAccts})
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
      <div>
        <Navbar user={this.state.user} handleUserChange={this.handleUserChange}/>
        <MainBodyEditProfile playlistCollection={this.state.playlistCollection} currentPlaylist={this.state.currentPlaylist} handleSelectPlaylist={this.handleSelectPlaylist} email={this.state.email} connectedAccts={this.state.connectedAccts} name={this.state.name}/>
      </div>
    )
  }
}
