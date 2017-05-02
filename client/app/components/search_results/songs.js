 import React from 'react';

export default class Songs extends React.Component {

  render() {
    return (
      <div className="Songs">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a data-toggle="collapse" href="#collapseSONGS" aria-expanded="true"> SONGS<i className="glyphicon glyphicon-menu-down"></i><i className="glyphicon glyphicon-menu-up"></i></a>
          </h4>
        </div>
        <div id="collapseSONGS" className="panel-collapse in collapse in">
          <div className="panel-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>{"Title"}</th>
                  <th>{"Artist"}</th>
                  <th>{"Album"}</th>
                  <th>{"Genre"}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><button type="submit" className="btn btn-default btn-sr">
                    <span className="glyphicon glyphicon-play"></span>
                  </button></td>
                  <td>{"Fire"}</td>
                  <td>{"Carter"}</td>
                  <td>{"Blood"}</td>
                  <td>{"Rock"}</td>
                  <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                  </button></td>
                </tr>
                <tr>
                  <td><button type="submit" className="btn btn-default btn-sr">
                    <span className="glyphicon glyphicon-play"></span>
                  </button></td>
                  <td>{"Dope"}</td>
                  <td>{"Parker"}</td>
                  <td>{"Sweat"}</td>
                  <td>{"R&B"}</td>
                  <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
                    <span className="glyphicon glyphicon-plus-sign"></span>
                  </button></td>
                </tr>
                <tr>
                  <td><button type="submit" className="btn btn-default btn-sr">
                    <span className="glyphicon glyphicon-play"></span>
                  </button></td>
                  <td>{"Save Me"}</td>
                  <td>{"Rambo"}</td>
                  <td>{"Tears"}</td>
                  <td>{"Pop"}</td>
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



// songs.map( s => {
//     <tr>
//     <td><button type="submit" className="btn btn-default btn-sr">
//       <span className="glyphicon glyphicon-play"></span>
//     </button></td>
//     <td>{s.title}</td>
//     <td>{s.album}</td>
//     <td>{s.artist}</td>
//     <td>{s.genre}</td>
//     <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
//       <span className="glyphicon glyphicon-plus-sign"></span>
//     </button></td>
//   </tr>
// })
