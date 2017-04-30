import React from 'react';

export default class Albums extends React.Component {
  constructor(props) {
     super(props);
   }
  render() {
    var filterAlbums = this.props.albums.filter(function(album) {
        return album.images[0].url !== undefined;
      });
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

                  {filterAlbums.map(function(album) {
                    return (
                      <tr>
                        <td>{<a href={'https://open.spotify.com/album/' + album.id} target="_blank">{album.name}</a>}</td>
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
