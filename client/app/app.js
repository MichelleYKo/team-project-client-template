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
  }
}

class AccountOverviewPage extends React.Component{
  render(){
    return <MainBodyAccount user = {this.props.user} playlistCollection={this.props.playlistCollection} currentPlaylist={this.props.currentPlaylist} handleSelectPlaylist={this.props.handleSelectPlaylist} email={this.props.email} connectedAccts={this.props.connectedAccts} name={this.props.name}/>
  }
}

class EditProfilePage extends React.Component{
  render(){
    return <MainBodyEditProfile user = {this.props.user} playlistCollection={this.props.playlistCollection} currentPlaylist={this.props.currentPlaylist} handleSelectPlaylist={this.props.handleSelectPlaylist} email={this.props.email} connectedAccts={this.props.connectedAccts} name={this.props.name}/>
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this);
    this.handleSelectSong = this.handleSelectSong.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchRequest = this.handleSearchRequest.bind(this);
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
      },
      searchTerm: ""
    };
  }



  handleUserChange(e){
    e.preventDefault();
  //  var currentLocation = this.props.location.pathname
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
    getEmail(newID, (email) => {
      this.setState({email: email})
    });
    getName(newID, (name) => {
      this.setState({name: name})
    });
    getConnectedAccts(newID, (connectedAccts) => {
      this.setState({connectedAccts: connectedAccts})
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

  handleSearchChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the input event -- the
    // <textarea> element. The textarea's `value` is the entire contents of
    // what the user has typed in so far.
    this.setState({searchTerm: e.target.value});
  }

  handleSearchRequest(clickEvent) {
    // Stop the event from propagating up the DOM tree, since we handle it here.
    // Also prevents the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();

    var searchTerm = this.state.searchTerm.trim();
    if(searchTerm == ""){
      window.alert("Please enter a valid, non-empty search term.");
    }
    if (clickEvent.button === 0 && searchTerm !== "") {
      /*
      * Do the following:
      * 1) Navigate to Search Results Page
      * 2) Use search term and some algorithm on server to retrieve relevant data from spotify (or nothing if nothing is related to search term)
      * 3) Populate search results page with the results.
      */
      window.alert("Currently working on implementing a search results algorithm for your query.");
    }
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
      <SidebarMusic playlistJSON={this.state.playlistJSON} playlistCollection={this.state.playlistCollection} handleSelectPlaylist={this.handleSelectPlaylist} currentSong={this.state.currentSong}/>
      <CPModal user={this.state.user}/>
      <Navbar user={this.state.user} handleUserChange={this.handleUserChange} handleSearchChange={this.handleSearchChange} handleSearchRequest = {this.handleSearchRequest} searchTerm = {this.state.searchTerm}/>
      <ASModal user = {this.state.user}/>
      <SRModal searchTerm = {this.state.searchTerm}/>
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
