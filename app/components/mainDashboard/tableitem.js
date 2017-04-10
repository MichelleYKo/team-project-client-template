import React from 'react'

export default class TableItem extends React.Component {

  render() {
    return (
        <tr>
          <td>  {this.props.playlistItem._id} </td>
          <td>  {this.props.playlistItem.title} </td>
          <td>  {this.props.playlistItem.artists[0]} </td>
          <td>  {this.props.playlistItem.album} </td>
          <td>
            <span className="input-group-btn">
              <button type="button" className="btn btn-success">
                <span className="glyphicon glyphicon-menu-up white"></span>
              </button>
              <button type="button" className="btn btn-danger">
                <span className="glyphicon glyphicon-menu-down white"></span>
              </button>
            </span>
          </td>
        </tr>
      )
  }
}
