import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBanner from './components/errorbanner';
import Navbar from './components/mainDashboard/navbar';
import SidebarMusic from './components/mainDashboard/sidebarmusic';
import {getPlaylistCollection} from './server';
import {getEmail} from './server';
import {getName} from './server';
import {getConnectedAccts} from './server';
import CPModal from './components/CPModal';
import ASModal from './components/ASModal';
import SRModal from './components/SRModal';

// Each major browser view user interface must be imported.
import MainBodyMusic from './components/mainDashboard/mainbodymusic.js';
import MainBodyAccount from './components/mainDashboard/mainBodyAccount.js';
import MainBodyEditProfile from './components/mainDashboard/mainBodyEditProfile.js';
import { IndexRoute, Router, Route, browserHistory } from 'react-router'


////////////////
/*
class ProfilePage extends React.Component {
  render() {
    return <accountSettings user={this.props.params.id}/>
  }
}

class MainDashboard extends React.Component {
  render() {
    return <MainDashboard user={this.props.params.id}/>;
  }
}
*/

class MainBodyMusicPage extends React.Component {
  render() {
    return <MainBodyMusic  playlistCollection={this.props.playlistCollection} currentPlaylist = {this.props.currentPlaylist} currentSong = {this.props.currentSong} handleSelectPlaylist = {this.props.handleSelectPlaylist} handleSelectSong= {this.props.handleSelectSong}/>;
  }
}

class AccountOverviewPage extends React.Component{
  render(){
    return <MainBodyAccount playlistCollection={this.props.playlistCollection} currentPlaylist={this.props.currentPlaylist} handleSelectPlaylist={this.props.handleSelectPlaylist} email={this.props.email} connectedAccts={this.props.connectedAccts} name={this.props.name}/>
  }
}

class EditProfilePage extends React.Component{
  render(){
    return <MainBodyEditProfile playlistCollection={this.props.playlistCollection} currentPlaylist={this.props.currentPlaylist} handleSelectPlaylist={this.handleSelectPlaylist} email={this.props.email} connectedAccts={this.props.connectedAccts} name={this.props.name}/>
  }
}

class App extends React.Component {
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
    //var childrenWithProps = React.cloneElement(this.props.children, this.state);
    var childrenWithProps = React.cloneElement(this.props.children, {
      user: this.state.user,
      playlistCollection: this.playlistCollection,
      currentPlaylist: this.state.currentPlaylist,
      currentSong: this.state.currentSong,
      handleSelectSong: this.handleSelectSong
    });
    return (
      <div>
      <ErrorBanner />
      <Navbar user={this.state.user} handleUserChange={this.handleUserChange}/>
      <SidebarMusic playlistCollection={this.state.playlistCollection} handleSelectPlaylist={this.handleSelectPlaylist} currentSong={this.state.currentSong}/>
      <CPModal />
      <ASModal user = {this.state.user}/>
      <SRModal />
      {childrenWithProps}
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MainBodyMusicPage} />
      <Route path="mainBodyAccount/:user" component={AccountOverviewPage}/>
      <Route path="mainBodyEditProfile/:user" component={EditProfilePage}/>
    </Route>
  </Router>
),document.getElementById('dashboard'));
