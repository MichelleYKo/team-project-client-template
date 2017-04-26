import {readDocument /*, writeDocument, addDocument*/} from './database.js';

var token = 'eyAiaWQiOiA0IH0NCg==';

/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  /* global KiwiError */


  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      KiwiError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    KiwiError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    KiwiError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function getPlaylistData(user, cb) {
  sendXHR('GET', '/user/' + user + '/playlistCollection', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPlaylistItemData(playlistId, cb) {
  sendXHR('GET', '/playlist/' + playlistId +'/playlistItems', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getUserData(user, cb) {
  sendXHR('GET', '/user/' + user, undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPlaylistCollection(playlistCollectionId, cb) {
  sendXHR('GET', '/playlistCollections/' + playlistCollectionId, undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function editUserName(userId, cb) {
  sendXHR('PUT', '/user/' + userId + '/name', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function editUserEmail(userId, cb) {
  sendXHR('PUT', '/user/' + userId + '/name', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function deletePlaylist(playlistCollectionId, cb) {
  sendXHR('DELETE', '/playlistCollections/' + playlistCollectionId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function addPlaylistToCollection(playlistCollectionId, cb) {
  sendXHR('PUT', '/playlistCollections/' + playlistCollectionId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function editPlaylistName(playlistId, cb) {
  sendXHR('PUT', '/playlists/' + playlistId + '/name', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function editPlaylistDescription(playlistId, cb) {
  sendXHR('PUT', '/playlists/' + playlistId + '/description', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function addToPlaylist(playlistId, playlistItemId, cb) {
  sendXHR('PUT', '/playlists/' + playlistId + '/playlistItems/' + playlistItemId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function deleteFromPlaylist(playlistId, playlistItemId, cb) {
  sendXHR('DELETE', '/playlists/' + playlistId + '/playlistItems/' + playlistItemId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function addPlaylist(name, description, authors, cb) {
  sendXHR('POST', '/playlists', {
    "name": name, // Playlist name.
    "description": description, // The description of this playlist, created by the user.
    "authors": authors
  }, (xhr) => {
    // Return the new status update.
    cb(JSON.parse(xhr.responseText));
  });
}

export function upvoteItem(playlistId, cb) {
  sendXHR('PUT', '/playlist/' + playlistId + '/playlistItemUpvotes', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function downvoteItem(playlistId, cb) {
  sendXHR('DELETE', '/playlist/' + playlistId + '/playlistItemDownvotes', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function addUser(name, email, cb) {
  sendXHR('POST', '/users', {
    "name": name, // Playlist name.
    "email": email // The description of this playlist, created by the user.
  }, (xhr) => {
    // Return the new status update.
    cb(JSON.parse(xhr.responseText));
  });
}





// There are old functions that I want to keep just in case we need to reference them

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {cb(data);}, 4);
}

/*export function getPlaylistCollection(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);

  // Map the PlaylistCollection's PlaylistItem references to actual PlaylistItem objects.
  // Note: While map takes a callback function as an argument, it is
  // synchronous, not asynchronous. It calls the callback immediately.
  var playlistCollection = userData.playlistCollection.map(getPlaylistSync);
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  emulateServerReturn(playlistCollection, cb);
}*/

function getPlaylistSync(playlistId) {
  var playlist = readDocument("playlists", playlistId);
  //Resolve all data fields
  playlist.playlistItems = playlist.playlistItems.map(getPlaylistItemSync);
  playlist.numSongs = playlist.playlistItems.length;
  return playlist;
}

export function getPlaylistASync(playlistId, cb) {
  var playlist = readDocument("playlists", playlistId);
  //Resolve all data fields
  playlist.playlistItems = playlist.playlistItems.map(getPlaylistItemSync);
  playlist.numSongs = playlist.playlistItems.length;
  emulateServerReturn(playlist, cb);
}

export function getPlaylistID(playlistID, cb){
  var playlist = readDocument("playlists", playlistID);
  emulateServerReturn(playlist._id, cb);
}

function getPlaylistItemSync(playlistItemId) {
  return readDocument('playlistItems', playlistItemId);
}

export function calculateVotes(upvotes, downvotes){
  //Take a song and all of the user IDs associated with it
  return upvotes-downvotes;
}

export function getName(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  var name = userData.name;
  emulateServerReturn(name, cb);
}

export function getEmail(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  var email = userData.email;
  emulateServerReturn(email, cb);
}

export function getConnectedAccts(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  var connectedAccts = userData.connectedAccts;
  emulateServerReturn(connectedAccts, cb);
}
