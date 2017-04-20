import React from 'react';

export default class users extends React.Component {
  render() {
    return (
      <div className =  "users">
          <div className =  "panel-heading">
            <h4 className =  "panel-title">
              <a data-toggle="collapse" href="#collapseUSERS" aria-expanded="true"> USERS<i className =  "glyphicon glyphicon-menu-down"></i><i className =  "glyphicon glyphicon-menu-up"></i></a>
            </h4>
          </div>
          <div id="collapseUSERS" className =  "panel-collapse in collapse">
            <div className =  "panel-body">

              <table className =  "table table-hover">
                <tbody>
                  <tr>
                    <td>{"Michelle"}</td>
                  </tr>
                  <tr>
                    <td>{"Jake"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
                  )
}
}
