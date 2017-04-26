import React from 'react';
import EditAccountInfo from './editAccountInfo';

export default class mainBodyEditProfile extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
      <EditAccountInfo playlistCollection={this.props.playlistCollection} name={this.props.name} email={this.props.email}/>
		</div>
	</div>
    )
  }
}
