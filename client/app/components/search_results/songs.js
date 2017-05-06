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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { 
                  this.props.searchResults.items.map((result, i) => {
                    return(
                      <SongInfo key = {i} result = {result} />
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class SongInfo extends React.Component {
  render(){
    return(
    <tr>
      <td><button type="submit" className="btn btn-default btn-sr">
        <span className="glyphicon glyphicon-play"></span>
      </button></td>
      <td>{this.props.result.name}</td>
      <td>{this.props.result.artists.map((artist, i) => {                      
        if(i != this.props.result.artists.length-1){
            return(artist.name + ", ")
        }
        else{
            return(artist.name)
        }
      })}</td>
      <td>{this.props.result.album.name}</td>
      <td><button type="submit" className="btn btn-default btn-sr" data-toggle="popover" data-content="Add to Playlist">
        <span className="glyphicon glyphicon-plus-sign"></span>
      </button></td>
    </tr>    
  )}
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
