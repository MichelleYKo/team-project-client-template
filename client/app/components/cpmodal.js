import React from 'react';
import {addPlaylist} from '../server.js';
import {addPlaylistToCollection} from '../server.js';

export default class CPModal extends React.Component {
  constructor(props) {
    super(props);
    // The Initial Friend List is empty
    this.state = {
      value: "",
      name: "",
      description: "",
      friendList: []
    };
  }

  handleChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the input event -- the
    // <textarea> element. The textarea's `value` is the entire contents of
    // what the user has typed in so far.
    this.setState({value: e.target.value});
  }

  handleNameChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the input event -- the
    // <textarea> element. The textarea's `value` is the entire contents of
    // what the user has typed in so far.
    this.setState({name: e.target.value});
  }

  handleDescriptionChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the input event -- the
    // <textarea> element. The textarea's `value` is the entire contents of
    // what the user has typed in so far.
    this.setState({description: e.target.value});
  }

  handleAddFriend(clickEvent) {
    // Stop the event from propagating up the DOM tree, since we handle it here.
    // Also prevents the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();

    var friend = this.state.value.trim();

    if (clickEvent.button === 0 && friend !== "") {
      var updatedfriendList = this.state.friendList;
      updatedfriendList.push(friend);
      this.setState({friendList: updatedfriendList});
      this.setState({value: ""});
    }
  }

  handleCreatePlaylist(clickEvent) {
    // Stop the event from propagating up the DOM tree, since we handle it here.
    // Also prevents the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();

    var name = this.state.name.trim(),
      description = this.state.description.trim(),
      friendList = this.state.friendList;

    if (clickEvent.button === 0 && name !== "") {
      addPlaylist(name, description, friendList, (x) => {
        this.setState({blank: x});
      });
      addPlaylistToCollection(this.props.user, (x) => {
        this.setState({blank: x});
      });
    }
  }

  render() {
    return (
      <div className="modal fade" id="cpModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content" id="cpmodal-content">
            <div className="modal-header" id="cpmodal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h3 className="modal-title" id="cpmodal-title">Create New Playlist</h3>
            </div>
            <div className="modal-body" id="cpmodal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12 playlist-name">
                    <div className="textfield-input-wrapper">
                      <label id="playlist-name">
                        <span className="textfield-label">Name:</span>
                      </label>
                      <input className="textfield-input" type="text" value={this.state.name}
                        onChange={(e) => this.handleNameChange(e)} placeholder="Enter Playlist name" aria-required="false">
                      </input>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 add-friends" id="add-friends">
                    <div>
                      <label>
                        <span className="textfield-label">Add Friends (Max. 5 Friends)</span>
                      </label>
                      <div className="textfield-input-wrapper" id="cptextfield-input-wrapper">
                        <input className="textfield-input" id="cptextfield-input" type="text" value={this.state.value}
                          onChange={(e) => this.handleChange(e)} placeholder="Enter Friend's Name" aria-required="false">
                        </input>
                        <button onClick={(e) => this.handleAddFriend(e)} type="button" className="btn" id="enter-button">
                          <span>Enter</span>
                        </button>
                        <div className="textfield-validation"></div>
                      </div>
                      <div id="added-friends-list">
                        <ul className="friend-list">
                          {this.state.friendList.map(function(friend){
                            return (
                                <li className="friend-listitem">
                                  {friend}
                                </li>
                              /*  <button type="button" className="close" id="remove-friend">
                                  <span>{'\u00D7'}</span>
                                </button> */
                              //TODO: Return the button on the same line
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 description">
                    <label>
                      <span className="textfield-label">Description</span>
                    </label>
                    <div className="description-text-box">
                      <textarea className="description-text" rows="10" value={this.state.description}
                        onChange={(e) => this.handleDescriptionChange(e)} placeholder="Describe your playlist!"></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer" id="cpmodal-footer">
              <button type="button" className="btn btn-default cpModal-cancel" data-dismiss="modal">Cancel</button>
              <button onClick={(e) => this.handleCreatePlaylist(e)} type="button" className="btn btn-primary cpModal-create">Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
