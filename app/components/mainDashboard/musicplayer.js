import React from 'react';

export default class MusicPlayer extends React.Component {
  render() {
    return (
      <div className = "music-popup">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-3" style = {{paddingTop: 15}}>
              <span className = "play-button">
                <button type="button" className="btn btn-secondary play-button">
                  <span className="glyphicon glyphicon-play-circle white"></span>
                </button> 
              </span>               
            </div>

            <div className="col-md-11" style={{paddingTop: 6}}>
              {this.props.currentSong.title}
              <br></br>
              {this.props.currentSong.artists.map((artist, i) => {
                if(i != this.props.currentSong.artists.length-1){
                    return(artist + ", ")
                }
                else{
                    return(artist)
                }
              })}
              <br></br>
              {this.props.currentSong.album}
            </div>

          </div>
        </div>          
      </div>
    )
  }
}