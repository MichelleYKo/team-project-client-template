import React from 'react';

export default class Albums extends React.Component {
  render() {
    return (
      <div className="albums">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" href="#collapseALBUMS" aria-expanded="true"> ALBUMS<i className="glyphicon glyphicon-menu-down"></i><i className="glyphicon glyphicon-menu-up"></i></a>
            </h4>
          </div>
          <div id="collapseALBUMS" className="panel-collapse in collapse in">
            <div className="panel-body">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <td>{"What's My Name"}</td>
                    <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
                      <span className="glyphicon glyphicon-plus-sign"></span>
                    </button></td>
                  </tr>
                  <tr>
                    <td>{"Map of the Human Soul"}</td>
                    <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
                      <span className="glyphicon glyphicon-plus-sign"></span>
                    </button></td>
                  </tr>
                  <tr>
                    <td>{"Born Hater"}</td>
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
