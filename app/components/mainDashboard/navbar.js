import React from 'react';
import NavbarLeftItem from './navbarleftitem';
import NavbarRightItem from './navbarrightitem';
import {getPlaylistCollection} from '../../server';


export default class Navbar extends React.Component {

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
  render() {
    var divStyle = {
        width: 40,
        height: 40
    };
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/mainDashboard">
            <img src="img/Logo_HeadphonesOuterGlow.png" style={divStyle}/>
          </Link>
          <NavbarLeftItem />
          <NavbarRightItem handleUserChange={this.props.handleUserChange}/>
          <li role="presentation" id="db-reset"></li>
        </div>
      </nav>
    )
  }
}
