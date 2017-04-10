import React from 'react';
import Sidebar from './sidebar';
import MainTable from './maintable';
//import {getPlaylistASync} from '../../server';

export default class MainBody extends React.Component {
  /*constructor(props){
    super(props);

    this.state = {
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

  componentDidMount() {
    this.setState({currentPlaylist: this.props.currentPlaylist});
  }*/

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar playlistCollection={this.props.playlistCollection} handleSelectPlaylist={this.props.handleSelectPlaylist}/>
          <MainTable currentPlaylist={this.props.currentPlaylist} />
        </div>
      </div>
    )
  }
}
