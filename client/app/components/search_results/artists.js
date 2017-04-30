import React from 'react';

export default class Artists extends React.Component {
  constructor(props) {
     super(props);
   }

  render() {
    var filterArtists = this.props.artists.filter(function(artist) {
        return artist.images[0] !== undefined;
      });
    return (
      <div className="artists">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" href="#collapseARTISTS" aria-expanded="true"> ARTISTS<i className="glyphicon glyphicon-menu-down"></i><i className="glyphicon glyphicon-menu-up"></i></a>
            </h4>
          </div>
          <div id="collapseARTISTS" className="panel-collapse in collapse">
            <div className="panel-body">
              <table className="table table-hover">
                <tbody>

                  {filterArtists.map(function(artist) {
                    return (
                      <tr>
                        <td>{<a href={'https://open.spotify.com/artist/' + artist.id} target="_blank">{artist.name}</a>}</td>
                      </tr>
                    )
                  }
                )}

                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
  }
}
