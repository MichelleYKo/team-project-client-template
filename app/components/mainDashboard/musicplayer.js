import React from 'react';

export default class MusicPlayer extends React.Component {
  render() {
    return (
      <div className = "music-popup">
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-2" style = {{paddingTop: 6}}>
              <span className = "play-button">
                <button type="button" className="btn btn-secondary play-button">
                  <span className="glyphicon glyphicon-play-circle white"></span>
                </button> 
              </span>               
            </div>

            <div className="col-md-10" style={{paddingTop: 14}}>
              Internet Dating - Theoretical Girls
            </div>

          </div>
        </div>          
      </div>
    )
  }
}