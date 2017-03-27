import React from 'react';

export default class search_results extends React.Component {
  render() {
    return (

        <div id="myModal" className = "modal fade">
          <div className = "modal-dialog">
            <div className = "modal-content">

              <div className = "modal-header">

                <input type="text" className =  "form-control" placeholder="Search"></input>
                <button type="submit" className =  "btn btn-default">
                  <span className =  "glyphicon glyphicon-search"></span>
                </button>
                <div className =  "btn-group">
                  <button type="button" data-toggle="dropdown" className =  "btn btn-default dropdown-toggle ">Search By <span className =  "caret"></span>
                  </button>
                  <ul className =  "dropdown-menu">
                    <li><a href="#">All</a></li>
                    <li><a href="#">Song</a></li>
                    <li><a href="#">Artist</a></li>
                    <li><a href="#">Album</a></li>
                    <li><a href="#">Genre</a></li>
                    <li><a href="#">User</a></li>
                    <li><a href="#">Playlist</a></li>
                  </ul>
                </div>
              </div>

              <div className =  "Songs">
                  <div className =  "panel-heading">
                    <h4 className =  "panel-title">
                      <a data-toggle="collapse" href="#collapseSONGS" aria-expanded="true"> SONGS<i className =  "glyphicon glyphicon-menu-down"></i><i className =  "glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapseSONGS" className =  "panel-collapse in collapse in">
                    <div className =  "panel-body">
                      <table className =  "table table-hover">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Genre</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><button type="submit" className =  "btn btn-default">
                              <span className =  "glyphicon glyphicon-play"></span>
                            </button></td>
                            <td>Fire</td>
                            <td>Carter</td>
                            <td>Blood</td>
                            <td>Rock</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>
                            <td><button type="submit" className =  "btn btn-default">
                              <span className =  "glyphicon glyphicon-play"></span>
                            </button></td>
                            <td>Dope</td>
                            <td>Parker</td>
                            <td>Sweat</td>
                            <td>R&B</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>
                            <td><button type="submit" className =  "btn btn-default">
                              <span className =  "glyphicon glyphicon-play"></span>
                            </button></td>
                            <td>Save Me</td>
                            <td>Rambo</td>
                            <td>Tears</td>
                            <td>Pop</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              <div className =  "artists">
                  <div className =  "panel-heading">
                    <h4 className =  "panel-title">
                      <a data-toggle="collapse" href="#collapseARTISTS" aria-expanded="true"> ARTISTS<i className =  "glyphicon glyphicon-menu-down"></i><i className =  "glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapseARTISTS" className =  "panel-collapse in collapse">
                    <div className =  "panel-body">

                      <table className =  "table table-hover">

                        <tbody>
                          <tr>
                            <td>Rihanna</td>

                          </tr>
                          <tr>
                            <td>Big Bang</td>

                          </tr>
                          <tr>
                            <td>Kanye</td>

                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>


              <div className =  "albums">
                  <div className =  "panel-heading">
                    <h4 className =  "panel-title">
                      <a data-toggle="collapse" href="#collapseALBUMS" aria-expanded="true"> ALBUMS<i className =  "glyphicon glyphicon-menu-down"></i><i className =  "glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapseALBUMS" className =  "panel-collapse in collapse in">
                    <div className =  "panel-body">

                      <table className =  "table table-hover">

                        <tbody>
                          <tr>

                            <td>What's My Name</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>
                            <td>Map of the Human Soul</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>
                            <td>Born Hater</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>

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
                            <td>Rock</td>

                          </tr>
                          <tr>
                            <td>Trap</td>

                          </tr>
                          <tr>
                            <td>Hip Hop</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>

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
                            <td>Michelle</td>
                          </tr>
                          <tr>
                            <td>Jake</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>


              <div className =  "playlists">
                  <div className =  "panel-heading">
                    <h4 className =  "panel-title">
                      <a data-toggle="collapse" href="#collapsePLAYLISTS" aria-expanded="true"> PLAYLISTS<i className =  "glyphicon glyphicon-menu-down"></i><i className =  "glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapsePLAYLISTS" className =  "panel-collapse in collapse">
                    <div className =  "panel-body">
                      <table className =  "table table-hover">

                        <tbody>
                          <tr>
                            <td>Rock Stuff</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>

                            <td>Road Trip Music</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>

                            <td>Study Playlist</td>
                            <td><button type="submit" className =  "btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span className =  "glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
