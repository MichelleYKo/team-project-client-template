import React from 'react';
import Songs from './search_results/songs';
import Artists from './search_results/artists';
import Genre from './search_results/genre';
import Albums from './search_results/albums';
import Playlists from './search_results/playlists';
import Users from './search_results/users';

export default class SRModal extends React.Component {
  render() {
    return(
      <div id="srModal" className="modal fade">
        <div className= "modal-dialog">
          <div className= "modal-content" id="srmodal-content">
            <div className= "modal-header">
              <input type="text" className="form-control" placeholder="Search"></input>
              <button type="submit" className="btn btn-default">
                <span className="glyphicon glyphicon-search"></span>
              </button>
                 <div className="btn-group">
                   <button type="button" data-toggle="dropdown" className="btn btn-default dropdown-toggle ">Search By <span className="caret"></span>
                   </button>
                   <ul className="dropdown-menu">
                     <li><a href="#">All</a></li>
                     <li><a href="#">Song</a></li>
                     <li><a href="#">Artist</a></li>
                     <li><a href="#">Album</a></li>
                     <li><a href="#">Genre</a></li>
                     <li><a href="#">User</a></li>
                     <li><a href="#">Playlist</a></li>
                   </ul>
                 </div>
            </div>
            <Songs />
            <Artists />
            <Genre />
            <Albums />
            <Playlists />
            <Users />
            </div>
          </div>
        </div>
    )
  }
}
