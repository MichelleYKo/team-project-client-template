import React from 'react';
import ReactDOM from 'react-dom';
// Each major browser view user interface must be imported.
import MainBodyMusic from './components/mainDashboard/mainbodymusic.js';
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
    return <MainBodyMusic playlistCollection={this.state.playlistCollection} currentPlaylist = {this.state.currentPlaylist} currentSong = {this.state.currentSong} handleSelectPlaylist = {this.handleSelectPlaylist} handleSelectSong= {this.handleSelectSong}/>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div><Navbar user={this.state.user} handleUserChange={this.handleUserChange}/>
      {this.props.children}
      <Sidebar playlistCollection={this.props.playlistCollection} handleSelectPlaylist={this.props.handleSelectPlaylist}/>
      <CPModal />
      <ASModal />
      <SRModal />
      //<ResetDatabase />
      </div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MainBodyMusicPage} />
      //<Route path="profile/:id" component={ProfilePage} />
    </Route>
  </Router>
),document.getElementById('dashboard'));
