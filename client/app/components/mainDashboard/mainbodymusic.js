import React from 'react';
import MainTable from './maintable'



export default class MainBodyMusic extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
      		<MainTable currentPlaylist={this.props.currentPlaylist} handleSelectSong={this.props.handleSelectSong}/>
		</div>
	</div>
    )
  }
}
