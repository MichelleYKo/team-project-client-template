import React from 'react';
import Songs from './search_results/songs';
import Artists from './search_results/artists';
import Genre from './search_results/genre';
import Albums from './search_results/albums';
import Playlists from './search_results/playlists';
import Users from './search_results/users';

export default class SRModal extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     query: this.props.query
  //     songs: []
  //     artists: []
  //     genre: []
  //     albums: []
  //     playlists: []
  //     users: []
  //   }
  // }

  // componentDidMount(){
  //   this.searchSpotify(this.state.text, this.addItems);
  // }

  // searchSpotify(query, handleData) {
  //   $.ajax({
  //     url: 'https://api.spotify.com/v1/search',
  //     data: {
  //       q: query,
  //       type: 'track,artist,album',
  //       market: 'US',
  //       limit: 10
  //     },
  //     success: function(response) {
  //       handleData(response);
  //     }
  //   });
  // }

  // addItems(data) {
  //   this.setState({
  //     albums: data.albums.items,
  //     artists: data.artists.items,
  //     tracks: data.tracks.items
  //   });
  // }



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

            </div>

            <Songs/>

            <Artists/>

            <Genre/>

            <Albums />

            <Playlists />

            <Users />

            </div>
          </div>
        </div>
    )
  }
}
