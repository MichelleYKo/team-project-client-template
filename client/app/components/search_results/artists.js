import React from 'react';

export default class Artists extends React.Component {
  render() {
    return (
      <div className="artists">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" href="#collapseARTISTS" aria-expanded="true"> ARTISTS<i className="glyphicon glyphicon-menu-down"></i><i className="glyphicon glyphicon-menu-up"></i></a>
            </h4>
          </div>
          <div id="collapseARTISTS" className="panel-collapse in collapse">
            <div className="panel-body">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <td>{"Rihanna"}</td>
                  </tr>
                  <tr>
                    <td>{"Big Bang"}</td>
                  </tr>
                  <tr>
                    <td>{"Kanye"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    )
  }
}
