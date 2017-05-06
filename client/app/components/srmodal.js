import React from 'react';
import Songs from './search_results/songs';
import Artists from './search_results/artists';
import Albums from './search_results/albums';
import Playlists from './search_results/playlists';
import Users from './search_results/users';
import {Link} from 'react-router';

export default class SRModal extends React.Component {

  render() {
    return(
      <div id="srModal" className="modal fade">
        <div className= "modal-dialog">
          <div className= "modal-content" id="srmodal-content">
            <div className= "modal-header">
              <form value={this.props.searchTerm} onChange={(e) => this.props.handleSearchChange(e)}>
                <div className="row">
                  <input type="text" placeholder="Search"/>
                </div>
              </form>
            </div>

            <Songs searchResults = {this.props.searchResults}/>

            <Artists />

            <Albums searchResults = {this.props.searchResults}/>

            <Playlists searchResults = {this.props.searchResults}/>

            <Users />

            </div>
          </div>
        </div>
    )
  }
}


              //<Link to="#" data-toggle="modal" data-target="#srModal">
              //   <button type="button" className="btn btn-default btn-sr push-right" onClick={(e) => {
              //     e.preventDefault();
              //     this.props.handleSearchRequest(e)}}>
              //     <span className="glyphicon glyphicon-search"></span>
              //   </button>
              // </Link>