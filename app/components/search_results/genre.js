import React from 'react';

export default class genre extends React.Component {
  render() {
    return (
      <div className =  "genre">
          <div className =  "panel-heading">
            <h4 className =  "panel-title">
              <a data-toggle="collapse" href="#collapseGENRE" aria-expanded="true"> GENRE<i className =  "glyphicon glyphicon-menu-down"></i><i className =  "glyphicon glyphicon-menu-up"></i></a>
            </h4>
          </div>
          <div id="collapseGENRE" className =  "panel-collapse in collapse">
            <div className =  "panel-body">
              <table className =  "table table-hover">
                <tbody>
                  <tr>
                    <td>{"Rock"}</td>

                  </tr>
                  <tr>
                    <td>{"Trap"}</td>

                  </tr>
                  <tr>
                    <td>{"Hip Hop"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
      </div>
                  )
}
}
