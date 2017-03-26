import React from 'react';

export default class createPlaylist extends React.Component {
  render() {
    return (
      <div>
      <ul className="friend-list">
        <li className="friend-listitem">
          <div className="friend-container">
            <div className="friend-content">
              <h5 className="friend-name">
                Jacob Magier
                <button type="button" className="close" id="remove-friend">
                  <span>{'\u00D7'}</span>
                </button>
              </h5>
            </div>
          </div>
        </li>
        <li className="friend-listitem">
          <div className="friend-container">
            <div className="friend-content">
              <h5 className="friend-name">
                Jonathan Bailey
                <button type="button" className="close" id="remove-friend">
                  <span>{'\u00D7'}</span>
                </button>
              </h5>
            </div>
          </div>
        </li>
        <li className="friend-listitem">
          <div className="friend-container">
            <div className="friend-content">
              <h5 className="friend-name">
                Michelle Ko
                <button type="button" className="close" id="remove-friend">
                  <span>{'\u00D7'}</span>
                </button>
              </h5>
            </div>
          </div>
        </li>
        <li className="friend-listitem">
          <div className="friend-container">
            <div className="friend-content">
              <h5 className="friend-name">
                Nicholas Cummings
                <button type="button" className="close" id="remove-friend">
                  <span>{'\u00D7'}</span>
                </button>
              </h5>
            </div>
          </div>
        </li>
        <li className="friend-listitem">
          <div className="friend-container">
            <div className="friend-content">
              <h5 className="friend-name">
                Samuel McGuire
                <button type="button" className="close" id="remove-friend">
                  <span>{'\u00D7'}</span>
                </button>
              </h5>
            </div>
          </div>
        </li>
      </ul>
    </div>
    )
  }
}
