import React from 'react';
import AccountInfo from './accountInfo';

export default class mainbodyAccount extends React.Component {
  render() {
    return (
	<div className="container-fluid">
		<div className="row">
      <AccountInfo playlistCollection={this.props.playlistCollection} name={this.props.name} email={this.props.email} connectedAccts={this.props.connectedAccts} user = {this.props.user}/>
		</div>
	</div>
    )
  }
}
