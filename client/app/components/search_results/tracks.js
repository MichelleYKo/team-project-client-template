import React from 'react';

export default class Tracks extends React.Component {
  constructor(props) {
     super(props);
   }

  render() {
    return (
      <div className="Tracks">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a data-toggle="collapse" href="#collapseTRACKS" aria-expanded="true"> TRACKS<i className="glyphicon glyphicon-menu-down"></i><i className="glyphicon glyphicon-menu-up"></i></a>
          </h4>
        </div>
        <div id="collapseTRACKS" className="panel-collapse in collapse in">
          <div className="panel-body">
            <table className="table table-hover">
              <tbody>
                {this.props.tracks.map(function(track) {
                  return (
                    <tr>
                    <td><button type="submit" className="btn btn-default btn-sr">
                      <span className="glyphicon glyphicon-play"></span>
                    </button></td>
                    <td>{<a href={'https://open.spotify.com/track/' + track.id} target="_blank">{track.name}</a>}</td>
                    <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
                      <span className="glyphicon glyphicon-plus-sign"></span>
                    </button></td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
