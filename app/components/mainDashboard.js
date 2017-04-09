import React from 'react';
import Navbar from './mainDashboard/navbar';
import MainBody from './mainDashboard/mainbody';
import { getPlaylistCollection } from '../server';

export default class mainDashboard extends React.Component {
  constructor(props){
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.state = {
      user: 1,
      playlistCollection: []
    };
  }

  handleUserChange(e){
    e.preventDefault();
    var newID = parseInt(window.prompt("Enter a user ID: "), 10);
    this.setState({user: newID});
  }

  refresh() {
    getPlaylistCollection(this.state.user, (playlistCollection) => {
      this.setState({playlistCollection: playlistCollection});
    });
  }

  componentDidMount() {
    this.refresh();
  }

  componentDidUpdate() {
    this.refresh();
  }

  render() {
    return (
		<div>
			<Navbar user={this.state.user} handleUserChange={this.handleUserChange}/>
			<MainBody playlistCollection={this.state.playlistCollection} />
		</div>
    )
  }
}
