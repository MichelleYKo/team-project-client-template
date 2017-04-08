import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBody from './mainDashboard/mainbody';
import { getPlaylistCollection } from '../server';

export default class mainDashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playlistCollection: []
    };
  }

  refresh() {
    getPlaylistCollection(1, (playlistCollection) => {
      this.setState({playlistCollection: playlistCollection});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    return (
		<div>
			<Navbar />
			<MainBody playlistCollection={this.state.playlistCollection} />
		</div>
    )
  }
}
