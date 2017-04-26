import React from 'react';
import {Link} from 'react-router';

var white = "#ffffff";

export default class accountInfo extends React.Component {
  constructor(props) {
    super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = props.data;
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

    var searchTerm = this.state.searchTerm.trim();
    if(searchTerm == ""){
      window.alert("Please enter a valid, non-empty search term.");
    }
    if (clickEvent.button === 0 && searchTerm !== "") {
      /*
      * Do the following:
      * 1) Navigate to Search Results Page
      * 2) Use search term and some algorithm on server to retrieve relevant data from spotify (or nothing if nothing is related to search term)
      * 3) Populate search results page with the results.
      */
      window.alert("Currently working on implementing a search results algorithm for your query.");
    }
  }


  render() {
    return (
      <div id="mainPanel" className="main-page col-md-10 col-md-offset-2" style={{height:999}} >
        <div className = "container-fluid">
          <table className="table table-hover table-borderless">
            <thead>
              <th className="page-header" style={{color: white}}>

                    Account Overview
              
                    <Link className="btn btn-default pull-right" to={"/mainBodyEditProfile/" + this.props.user}>
                        Edit Profile
                        <span className="glyphicon glyphicon-pencil"> </span>
                    </Link>
              </th>
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
                  <td>{this.props.connectedAccts.map((acct, i) => {
                    if(i != this.props.connectedAccts.length-1){
                      return(acct + ", ")
                    }
                    else{
                      return(acct)
                    }
                  })}</td>
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
