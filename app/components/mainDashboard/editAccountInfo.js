import React from 'react';

var white = "#ffffff";

export default class editAccountInfo extends React.Component {
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
              <h1 style={{color: white}}><strong>Account Settings</strong>
                    <a className="btn btn-default pull-right" href="accountOverview.html">
                        Cancel
                        <span className="glyphicon glyphicon-remove"> </span>
                    </a>
                    <button type="submit" className="btn btn-default pull-right" href="editProfile.html">
                        Save
                        <span className="glyphicon glyphicon-pencil"> </span>
                    </button>
              </h1>
            </thead>
            <tbody>
                <tr className="info-borders">
                  <td><strong>Name:</strong></td>
                  <td>
                    <input type="text" className="form-control input-filter" placeholder={this.props.name}></input>
                  </td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Email:</strong></td>
                  <td>
                    <input type="text" className="form-control input-filter" placeholder={this.props.email}></input>
                  </td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Connected Accounts:</strong> </td>
                  <td>
                    <button type="submit" className="btn btn-default pull-right" onClick={() => window.alert("Coming Soon!")}>
                      Connect/Remove Accounts
                      <span className="glyphicon glyphicon-link"> </span>
                    </button>
                </td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Friends:</strong> </td>
                  <td>17</td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Playlists:</strong></td>
                  <td>
                    <button type="submit" className="btn btn-default pull-right" onClick={() => window.alert("Coming Soon!")}>
                      Manage Playlists
                      <span className="glyphicon glyphicon-music"> </span>
                    </button>
                </td>
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
