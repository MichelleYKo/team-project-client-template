import React from 'react';

var white = "#ffffff";

export default class accountInfo extends React.Component {
  constructor(props) {
  super(props);
  // The FeedItem's initial state is what the Feed passed to us.
  this.state = props.data;
}
  render() {
    return (
      <div id="mainPanel" className="main-page col-md-10 col-md-offset-2" style={{height:999}} >
        <div className = "container-fluid">
          <table className="table table-hover table-borderless">
            <thead>
              <h1 style={{color: white}}><strong>Account Settings</strong></h1>
            </thead>
            <tbody>
                <tr className="info-borders">
                  <td><strong>Name:</strong></td>
                  <td>{this.props.name}</td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Email:</strong></td>
                  <td>{this.props.email}</td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Connected Accounts:</strong> </td>
                  <td>{this.props.connectedAccts}</td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Friends:</strong> </td>
                  <td>17</td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Playlists:</strong> </td>
                  <td>{this.props.playlistCollection.length}</td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Date Created:</strong> </td>
                  <td>4/1/1999</td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>

    )
  }
}
