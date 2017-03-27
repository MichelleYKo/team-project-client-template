import React from 'react';

export default class TableHead extends React.Component {
  render() {
    return (
      <thead>

        <tr>
          <h2 className="page-header" style="color:white;"> Playlist name </h2>
        </tr>
        
        <tr>
          <th colSpan="999" className="th-Filter">
            <div className="form-inline div-filter">
              <div className="input-group div-filter">

                <span className="input-group-btn">
                  <button type="submit" className="btn btn-secondary">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>

                <input type="text" className="form-control input-filter" placeholder="Filter"></input>

                <span className="input-group-btn">
                  <button type="submit" className="btn btn-secondary">
                    <span className="glyphicon glyphicon-remove-circle"></span>
                  </button>
                </span> 
              </div>

              <button type="submit" className="btn btn-default pull-right">
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
          <th><span>ALBUM</span></th>
          <th>
            <span>ARTIST</span>

            <span>
            </span>

          </th>
          <th></th>
        </tr>
      </thead>
    )
  }
}
