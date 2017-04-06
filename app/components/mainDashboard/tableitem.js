import React from 'react'
import {calculateVotes} from '.../server'

export default class TableItem extends React.Component {

  render() {
    //we want to render a song within the context of a playlist. 


    var data = this.props.data;


    return (
        <tr>
          <td>  //numbering relative to the order of the playlist </td>
          <td>  {data.title} </td>
          <td>  {data.album} </td>
          <td>  {data.artists} </td>
          <td>  {calculateVotes(data.upvotes.length, data.downvotes.length)} </td>
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