import React from 'react';
import {Link} from 'react-router';

export default class NavbarLeftItem extends React.Component {
  // handleSearchChange(e) {
  //   // Prevent the event from "bubbling" up the DOM tree.
  //   e.preventDefault();
  //   // e.target is the React Virtual DOM target of the input event -- the
  //   // <textarea> element. The textarea's `value` is the entire contents of
  //   // what the user has typed in so far.
  //   this.setState({searchTerm: e.target.value});
  // }

  // handleSearchRequest(clickEvent) {
  //   // Stop the event from propagating up the DOM tree, since we handle it here.
  //   // Also prevents the link click from causing the page to scroll to the top.
  //   clickEvent.preventDefault();

  //   var searchTerm = this.state.searchTerm.trim();
  //   if(searchTerm == ""){
  //     window.alert("Please enter a valid, non-empty search term.");
  //   }
  //   if (clickEvent.button === 0 && searchTerm !== "") {
  //     /*
  //     * Do the following:
  //     * 1) Navigate to Search Results Page
  //     * 2) Use search term and some algorithm on server to retrieve relevant data from spotify (or nothing if nothing is related to search term)
  //     * 3) Populate search results page with the results.
  //     */
  //     window.alert("Currently working on implementing a search results algorithm for your query.");
  //   }
  // }

  render() {
    return (
      <form className="navbar-form navbar-left">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search..." value={this.props.searchTerm} onChange={(e) => this.props.handleSearchChange(e)}/>
        </div>
        <Link to="#" data-toggle="modal" data-target="#srModal">
          <button type="submit" className="btn btn-default" onClick={(e) => this.props.handleSearchRequest(e)}>Submit</button>
        </Link>
      </form>
    )
  }
}
