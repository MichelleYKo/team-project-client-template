import React from 'react';

export default class search_results extends React.Component {
  render() {
    return (

        <div id="myModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-header">

                <input type="text" class="form-control" placeholder="Search">
                <button type="submit" class="btn btn-default">
                  <span class="glyphicon glyphicon-search"></span>
                </button>
                <div class="btn-group">
                  <button type="button" data-toggle="dropdown" class="btn btn-default dropdown-toggle ">Search By <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">
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
              <!-- Music Table -->

              <div class="Songs">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" href="#collapseSONGS" aria-expanded="true"> SONGS<i class="glyphicon glyphicon-menu-down"></i><i class="glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapseSONGS" class="panel-collapse in collapse in">
                    <div class="panel-body">
                      <table class="table table-hover">
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
                            <td><button type="submit" class="btn btn-default">
                              <span class="glyphicon glyphicon-play"></span>
                            </button></td>
                            <td>Fire</td>
                            <td>Carter</td>
                            <td>Blood</td>
                            <td>Rock</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>
                            <td><button type="submit" class="btn btn-default">
                              <span class="glyphicon glyphicon-play"></span>
                            </button></td>
                            <td>Dope</td>
                            <td>Parker</td>
                            <td>Sweat</td>
                            <td>R&B</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>
                            <td><button type="submit" class="btn btn-default">
                              <span class="glyphicon glyphicon-play"></span>
                            </button></td>
                            <td>Save Me</td>
                            <td>Rambo</td>
                            <td>Tears</td>
                            <td>Pop</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>
              <div class="artists">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" href="#collapseARTISTS" aria-expanded="true"> ARTISTS<i class="glyphicon glyphicon-menu-down"></i><i class="glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapseARTISTS" class="panel-collapse in collapse">
                    <div class="panel-body">

                      <table class="table table-hover">

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


              <div class="albums">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" href="#collapseALBUMS" aria-expanded="true"> ALBUMS<i class="glyphicon glyphicon-menu-down"></i><i class="glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapseALBUMS" class="panel-collapse in collapse in">
                    <div class="panel-body">

                      <table class="table table-hover">

                        <tbody>
                          <tr>

                            <td>What's My Name</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>
                            <td>Map of the Human Soul</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>
                            <td>Born Hater</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
              </div>

              <div class="genre">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" href="#collapseGENRE" aria-expanded="true"> GENRE<i class="glyphicon glyphicon-menu-down"></i><i class="glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapseGENRE" class="panel-collapse in collapse">
                    <div class="panel-body">
                      <table class="table table-hover">
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

              <div class="users">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" href="#collapseUSERS" aria-expanded="true"> USERS<i class="glyphicon glyphicon-menu-down"></i><i class="glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapseUSERS" class="panel-collapse in collapse">
                    <div class="panel-body">

                      <table class="table table-hover">
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


              <div class="playlists">
                  <div class="panel-heading">
                    <h4 class="panel-title">
                      <a data-toggle="collapse" href="#collapsePLAYLISTS" aria-expanded="true"> PLAYLISTS<i class="glyphicon glyphicon-menu-down"></i><i class="glyphicon glyphicon-menu-up"></i></a>
                    </h4>
                  </div>
                  <div id="collapsePLAYLISTS" class="panel-collapse in collapse">
                    <div class="panel-body">
                      <table class="table table-hover">

                        <tbody>
                          <tr>
                            <td>Rock Stuff</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>

                            <td>Road Trip Music</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
                            </button></td>
                          </tr>
                          <tr>

                            <td>Study Playlist</td>
                            <td><button type="submit" class="btn btn-default" data-toggle="popover" data-content="Add to Playlist">
                              <span class="glyphicon glyphicon-plus-sign"></span>
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
