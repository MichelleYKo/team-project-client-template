import React from 'react';
import TableBody from './tablebody'
import TableHead from './tablehead'


export default class MainTable extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        contents: []
      }
  }

  componentDidMount() {
    getFeedData(this.props.user, (playlistData) => {
      this.setState(playlistData);
    });
  }


  render() {
    return (
        <div id="mainPanel" className="main-page col-md-10 col-md-offset-2" style={{height:999}} >
          <div className = "container-fluid">
            <table className="table table-hover table-borderless">
              <TableHead />
              <TableBody />
            </table>
          </div>
        </div>
    )
  }
}
