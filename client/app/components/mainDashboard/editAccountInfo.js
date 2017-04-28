  import React from 'react';
import {Link} from 'react-router';
var white = "#ffffff";

export default class editAccountInfo extends React.Component {
  constructor(props) {

    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = {
      tempName: "",
      tempEmail: ""
    }
  }

  handleNameChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the input event -- the
    // <textarea> element. The textarea's `value` is the entire contents of
    // what the user has typed in so far.
    this.setState({tempName: e.target.value});
  }

  handleEmailChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the input event -- the
    // <textarea> element. The textarea's `value` is the entire contents of
    // what the user has typed in so far.
    this.setState({tempEmail: e.target.value});

  }

  handleSubmit(clickEvent) {
    // Stop the event from propagating up the DOM tree, since we handle it here.
    // Also prevents the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();

    var name = this.state.tempName.trim();
    var email = this.state.tempEmail.trim();
    if(name !== "" || email !== "" && clickEvent.button == 0){
      //server function
      window.alert("Currently updating server support")
    }
  }


  render() {
    return (
      <div id="mainPanel" className="main-page col-md-10 col-md-offset-2" style={{height:999}} >
        <div className = "container-fluid">
          <table className="table table-hover table-borderless">
            <thead>
                <th className="page-header" style={{color: white}}>
                    Account Settings
                    <Link className="btn btn-default pull-right" to={"/mainBodyAccount/" + this.props.user}>
                        Cancel
                        <span className="glyphicon glyphicon-remove"> </span>
                    </Link>
                    <Link type="submit" className="btn btn-default pull-right" to={"/mainBodyAccount/" + this.props.user} onClick = {(clickEvent) => this.handleSubmit(clickEvent)}>
                        Save
                        <span className="glyphicon glyphicon-pencil"> </span>
                    </Link>
              </th>
            </thead>

            <tbody>
                <tr className="info-borders">
                  <td><strong>Name:</strong></td>
                  <td>
                    <input type="text" className="form-control input-filter" placeholder={this.props.name} value = {this.state.tempName} onChange={(e) => this.handleNameChange(e)}></input>
                  </td>
                </tr>
                <tr className="info-borders">
                  <td><strong>Email:</strong></td>
                  <td>
                    <input type="text" className="form-control input-filter" placeholder={this.props.email} value = {this.state.tempEmail} onChange={(e) => this.handleEmailChange(e)}></input>
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
