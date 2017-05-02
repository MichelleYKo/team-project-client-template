import React from 'react';
import Songs from './search_results/songs';
import Artists from './search_results/artists';
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
              <form>
                <div className="row">
                  <input type="text" placeholder="Search"/>
                </div>
              </form>

            </div>

            <Songs />

            <Artists />

            <Albums />

            <Playlists />

            <Users />

            </div>
          </div>
        </div>
    )
  }
}
