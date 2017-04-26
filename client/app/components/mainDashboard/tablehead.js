import React from 'react';

var white = "#ffffff";

export default class TableHead extends React.Component {



  render() {
    return (
      <thead>
        <tr>
          <th className="page-header" style={{color: white}}> {this.props.currentPlaylist.name} </th>
        </tr>
        <tr>
          <th colSpan="999" className="th-Filter">
            <div className="form-inline div-filter">
              <div className="input-group div-filter">
                <input type="text" className="form-control input-filter" placeholder="Filter" value = {this.props.filterTerm} onChange = { (e) => this.props.handleFilterChange(e)}></input>
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-secondary" onClick = { (clickEvent) => this.props.clearFilterField(clickEvent) }>
                    <span className="glyphicon glyphicon-remove-circle"></span>
                  </button>
                </span>
              </div>
              <button type="submit" className="btn btn-default pull-right" onClick={() => window.alert("Playlist settings will be coming in a later update!")}>
                <span className="glyphicon glyphicon-music"> </span>
                Playlist settings
              </button>
            </div>
          </th>
        </tr>
        <tr>
          <th>
          </th>
          <th><span>SONG</span></th>
          <th><span>ARTIST</span></th>
          <th>
            <span>ALBUM</span>
            <span>
            </span>
          </th>
          <th></th>
        </tr>
      </thead>
    )
  }
}
