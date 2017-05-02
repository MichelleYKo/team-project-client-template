import React from 'react'
import {Link} from 'react-router';
export default class ASModal extends React.Component {

  render() {
    return (
      <div className="modal fade grey" id="asModal">
        <div className="modal-dialog">
          <div className="modal-content account-pop">
            <div className="modal-header electric account-top">
                <h3 className="modal-title electric"><strong>Account Settings</strong></h3>
            </div>
            <ul className="nav nav-pills center-pills text-center pill-top">
              <li id="submenu-item-account-overview" className="large-button">
                  <Link to={"/mainBodyAccount/" + this.props.user} >
                    <h1 className="glyphicon glyphicon-home style-icon"></h1>
                    <br />
                    <strong className="white">Account Overview</strong>
                  </Link>
              </li>
              <li id="submenu-item-edit-profile"  className="large-button">
                  <Link to={"/mainBodyEditProfile/" + this.props.user}><h1 className="glyphicon glyphicon-pencil style-icon">
                  </h1> <br /><strong className="white">Edit Profile</strong></Link>
              </li>
              <li id="submenu-item-change-password" className="large-button">
                  <Link to="#"><h1 className="glyphicon glyphicon-lock style-icon">
                  </h1> <br /><strong className="white">Change Password</strong></Link>
              </li>
              </ul>
              <ul className="nav nav-pills center-pills text-center electric pill-bottom">
              <li id="submenu-item-recover-playlists" className="large-button">
                  <Link to="#"><h1 className="glyphicon glyphicon-search style-icon">
                  </h1> <br /><strong className="white">Recover Playlists</strong></Link>
              </li>
              <li id="submenu-item-connect-accounts" className="large-button">
                  <Link to="#"><h1 className="glyphicon glyphicon-link style-icon">
                  </h1> <br /><strong className="white">Connect Accounts</strong></Link>
              </li>
              <li id="submenu-music-settings" className="large-button">
                  <Link to="#"><h1 className="glyphicon glyphicon-headphones style-icon">
                  </h1> <br /><strong className="white">Music Settings</strong></Link>
              </li>
              </ul>
            <div className="modal-footer account-bottom">
                <button type="button" className="btn btn-default butt" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
