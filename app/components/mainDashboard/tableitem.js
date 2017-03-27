import React from 'react'

export default class TableItem extends React.Component {
  render() {
    return (
        <tr>
          <td>  1 </td>
          <td>  Song 1 </td>
          <td>  Album 1 </td>
          <td>  Artist 1 </td>
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