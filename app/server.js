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

export function calculateVotes(upvotes, downvotes){
  //Take a song and all of the user IDs associated with it
  return upvotes-downvotes;
}
