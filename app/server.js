import {readDocument, writeDocument, addDocument} from './database.js';

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

//NOTE Not storing the playlists correctly...
export function getPlaylistCollection(user, cb) {
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Get the PlaylistCollection object for the user.
  //var playlistCollection = readDocument('users', userData.playlistCollection);
  var playlistCollection = readDocument('users', userData.playlistCollection);
  // Map the PlaylistCollection's PlaylistItem references to actual PlaylistItem objects.
  // Note: While map takes a callback function as an argument, it is
  // synchronous, not asynchronous. It calls the callback immediately.
  playlistCollection = userData.playlistCollection.map(getPlaylistSync);
  // Return PlaylistCollection with resolved references.
  // emulateServerReturn will emulate an asynchronous server operation, which
  // invokes (calls) the "cb" function some time in the future.
  emulateServerReturn(playlistCollection, cb);
}

//NOTE THIS WORKS
function getPlaylistSync(playlistId) {
  var playlist = readDocument("playlists", playlistId);
  //Resolve all data fields
  playlist.authors.map((author) => readDocument('playlists', author));
  playlist.playlistItems = playlist.playlistItems.map(getPlaylistItemSync);
  playlist.numSongs = playlist.playlistItems.length;

  return playlist;
}

//NOTE THIS WORKS
function getPlaylistItemSync(playlistItemId) {
  var playlistItem = readDocument('playlistItems', playlistItemId);
  //Resolve all data fields.
  playlistItem.data.artists.map((artist) => readDocument('playlistItems', artist));
  playlistItem.data.genres.map((genre) => readDocument('playlistItems', genre));
  playlistItem.data.upvotes.map((upvote) => readDocument('playlistItems', upvote));
  playlistItem.data.downvotes.map((downvotes) => readDocument('playlistItems', downvotes));
  playlistItem.data.associatedPlaylists.map((associatedPlaylist) => readDocument('playlistItems', associatedPlaylist));

  return playlistItem;
}

export function calculateVotes(upvotes, downvotes){
  //Take a song and all of the user IDs associated with it
  return upvotes-downvotes;
}
