import React from 'react';

export default class Playlists extends React.Component {
  render() {
    return (
      <div className="playlists">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a data-toggle="collapse" href="#collapsePLAYLISTS" aria-expanded="true"> PLAYLISTS<i className="glyphicon glyphicon-menu-down"></i><i className="glyphicon glyphicon-menu-up"></i></a>
          </h4>
        </div>
        <div id="collapsePLAYLISTS" className="panel-collapse in collapse">
          <div className="panel-body">
            <table className="table table-hover">
              <tbody>
                <tr>
                  <td>{"Rock Stuff"}</td>
                  <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
                  <span className="glyphicon glyphicon-plus-sign"></span>
                  </button></td>
                </tr>
                <tr>
                  <td>{"Road Trip Music"}</td>
                  <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
                  <span className="glyphicon glyphicon-plus-sign"></span>
                  </button></td>
                </tr>
                <tr>
                    <td>{"Study Playlist"}</td>
                    <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                    </button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
