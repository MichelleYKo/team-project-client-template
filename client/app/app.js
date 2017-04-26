import React from 'react';
import ReactDOM from 'react-dom';
import ErrorBanner from './components/errorbanner';
import Navbar from './components/mainDashboard/navbar';
import SidebarMusic from './components/mainDashboard/sidebarmusic';
import {getPlaylistCollection} from './server';
import {getPlaylistData} from './server';
import {getPlaylistItemData} from './server';
import {getUserData} from './server';
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

    //return <MainBodyMusic />
  }
}

class AccountOverviewPage extends React.Component{
  render(){
    return <MainBodyAccount playlistCollection={this.props.playlistCollection} currentPlaylist={this.props.currentPlaylist} handleSelectPlaylist={this.props.handleSelectPlaylist} email={this.props.email} connectedAccts={this.props.connectedAccts} name={this.props.name}/>
    //return <MainBodyAccount />
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
      playlistJSON: [],
      currentPlaylist: {
        _id: 1,
        name: "",
        description: "",
        authors: [],
        dateCreated: 0,
        playlistItems: [],
        playlistItemUpvotes: [0, 0],
        playlistItemDownvotes: [0, 1]
      },
      currentSong: {
        _id: 1,
        title: "",
        artists: [],
        album: "",
        genres: [],
        duration_ms: 0
      }
    };
  }

  handleUserChange(e){
    e.preventDefault();
    var newID = parseInt(window.prompt("Enter a user ID:"), 10);
    this.setState({user: newID});
    getPlaylistCollection(newID, (playlistCollection) => {
      this.setState({playlistCollection: playlistCollection.contents});
    });
    getPlaylistData(newID, (playlistData) => {
      this.setState({playlistJSON: playlistData});
      this.setState({currentPlaylist: playlistData[0]});
    });
    var curPlaylistId = this.state.currentPlaylist._id
    getPlaylistItemData(curPlaylistId, (playlistItems) => {
      this.setState({currentSong: playlistItems[0]});
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
      this.setState({playlistCollection: playlistCollection.contents});
    });
    getPlaylistData(this.state.user, (playlistData) => {
      this.setState({playlistJSON: playlistData});
      this.setState({currentPlaylist: playlistData[0]});
    });
    getUserData(this.state.user, (user) => {
      this.setState({email: user.email});
      this.setState({name: user.name});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    //var childrenWithProps = React.cloneElement(this.props.children, this.state);
    var childrenWithProps = React.cloneElement(this.props.children, {
      user: this.state.user,
      playlistJSON: this.state.playlistJSON,
      playlistCollection: this.playlistCollection,
      currentPlaylist: this.state.currentPlaylist,
      currentSong: this.state.currentSong,
      handleSelectSong: this.handleSelectSong
    });
    return (
      <div>
      <ErrorBanner />
      <Navbar user={this.state.user} handleUserChange={this.handleUserChange}/>
      <SidebarMusic playlistJSON={this.state.playlistJSON} playlistCollection={this.state.playlistCollection} handleSelectPlaylist={this.handleSelectPlaylist} currentSong={this.state.currentSong}/>
      <CPModal user={this.state.user}/>
      <ASModal />
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
      <Route path="mainBodyAccount" component={AccountOverviewPage}/>
      <Route path="mainBodyEditProfile" component={EditProfilePage}/>
    </Route>
  </Router>
),document.getElementById('dashboard'));
