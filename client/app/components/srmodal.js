import React from 'react';
import Tracks from './search_results/tracks';
import Artists from './search_results/artists';
import Albums from './search_results/albums';
import Playlists from './search_results/playlists';
import Users from './search_results/users';

export default class SRModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {text: '', albums: [], artists: [], tracks: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.searchSpotify = this.searchSpotify.bind(this);
        this.addItems = this.addItems.bind(this);
  }

  componentDidMount() {
     this.searchSpotify(this.state.text, this.addItems);
     $('ul.tabs').tabs();
   }
   handleSubmit(e) {
     e.preventDefault();
     this.props.onHandleSubmit();
   }

   handleChange(e) {
     this.props.onHandleChange(e.target.value);
   }

   searchSpotify(query, handleData) {
      $.ajax({
        url: 'https://api.spotify.com/v1/search',
        data: {
          q: query,
          type: 'track,artist,album',
          market: 'US',
          limit: 10
        },
        success: function(response) {
          handleData(response);
        }
      });
    }

    addItems(data) {
        this.setState({
          albums: data.albums.items,
          artists: data.artists.items,
          tracks: data.tracks.items
        });
      }

      handleSubmit() {
        this.searchSpotify(this.state.text, this.addItems);
      }

      handleChange(text) {
        this.setState({text: text});
      }



  render() {
    return(
      <div id="srModal" className="modal fade">
        <div className= "modal-dialog">
          <div className= "modal-content" id="srmodal-content">
            <div className= "modal-header">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <input type="text" value={this.props.text} onChange={this.handleChange} placeholder="Search"/>
                </div>
              </form>

            </div>

            <Tracks tracks={this.state.tracks}/>

            <Artists artists={this.state.artists}/>

            <Albums albums={this.state.albums}/>

            <Playlists />

            <Users />

            </div>
          </div>
        </div>
    )
  }
}
