import {readDocument, /*writeDocument,*/ addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {cb(data);}, 4);
}

export function addPlaylist(name, description, friendList) {
  // Since a CommentThread is embedded in a FeedItem object,
  // we don't have to resolve it. Read the document,
  // update the embedded object, and then update the
  // document in the database.
  var playlist = {
    name: name,
    description: description,
    authors: friendList,
    dateCreated: 0,
    numSongs: 0
  }

  addDocument('playlists', playlist);
}

export function getPlaylistCollection(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);

  // Map the PlaylistCollection's PlaylistItem references to actual PlaylistItem objects.
  // Note: While map takes a callback function as an argument, it is
  // synchronous, not asynchronous. It calls the callback immediately.
  var playlistCollection = userData.playlistCollection.map(getPlaylistSync);
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  emulateServerReturn(playlistCollection, cb);
}

function getPlaylistSync(playlistId) {
  var playlist = readDocument("playlists", playlistId);
  //Resolve all data fields
  playlist.playlistItems = playlist.playlistItems.map(getPlaylistItemSync);
  playlist.numSongs = playlist.playlistItems.length;
  return playlist;
}

function getPlaylistItemSync(playlistItemId) {
  return readDocument('playlistItems', playlistItemId);
}

export function calculateVotes(upvotes, downvotes){
  //Take a song and all of the user IDs associated with it
  return upvotes-downvotes;
}
