// Your startup's initial mock objects go here
var initialData = {
  // The "user" collection. Contains all of the users in our Facebook system.
  "users": {
    "1": { // This user has id "1".
      "_id": 1,
      "name": "Tim Richards", // Name of user.
      "email": "trichards@cs.umass.edu", // Email associated with account.
      "connectedAccts": ["Spotify", "Facebook"], // Linked accounts with application.
      "playlistCollection": 1 // List of playlist IDs that this user has been an author of.
    },
    "2": {
      "_id": 2,
      "name": "Jon Bailey",
      "email": "jonathanbail@umass.edu",
      "connectedAccts": ["Spotify"],
      "playlistCollection": 2
    },
    "3": {
      "_id": 3,
      "name": "Jake Magier",
      "email": "jmagier@umass.edu",
      "connectedAccts": ["Napster", "MySpace", "Facebook"],
      "playlistCollection": 3
    }
  },
  // The "playlist" collection. Contains all of the playlists that have been created.
  "playlists": {
    // This playlist has id "1".
    "1": {
      "_id": 1,
      "name": "Homework Jammin'", // Playlist name.
      "description": "", // The description of this playlist, created by the user.
      "authors": [2], // Users who contributed to this playlist.
      "dateCreated": 1453690800000, // Date of playlist creation.
      "playlistItems": [1, 2], // List of playlistitem IDs associated with this playlist.
      "playlistItemUpvotes": [0, 0],
      "playlistItemDownvotes": [0, 1]
    },
    "2": {
      "_id": 2,
      "name": "Working Out",
      "description": "",
      "authors": [1, 2],
      "dateCreated": 1453690800000,
      "playlistItems": [2, 4],
      "playlistItemUpvotes": [2, 1],
      "playlistItemDownvotes": [0, 1]
    },
    "3": {
      "_id": 3,
      "name": "House Party",
      "description": "",
      "authors": [1, 2, 3],
      "dateCreated": 1453668480000,
      "playlistItems": [3, 4],
      "playlistItemUpvotes": [1, 0],
      "playlistItemDownvotes": [0, 2]
    }
  },
  // The "playlist item" collection. Contains a few sample song items which will later be pulled in from Spotify dynamically.
  "playlistItems": { // NOTE that all datatypes listed here match with what the Spotify API returns.
    "1": {
      "_id": "1", // The Spotify ID for this track, NOTE the API returns a STRING, not integer!
      "title": "Welcome to the Jungle", // The title of this track. (String ... track.name)
      "artists": ["Guns N' Roses"], // The artist(s) of this track. (String[] ... track.artists.name), API returns array of artist objects which contain names.
      "album": "Appetite for Destruction", // The album this track is in. (String ... track.album.name), API returns album object which contains a name. Can be empty.
      "genres": ["Hard Rock"], // The genre(s) of this track. (String[] ... track.album.genres), API returns array of strings representing classified genres. Can be empty.
      "duration_ms": 1100 // The duration of the track in milliseconds. (Integer ... track.duration_ms)
    },
    "2": {
      "_id": "2",
      "title": "Toxic",
      "artists": ["Britney Spears"],
      "album": "In the Zone",
      "genres": ["Pop"],
      "duration_ms": 1200
    },
    "3": {
      "_id": "3",
      "title": "Africa",
      "artists": ["Toto"],
      "album": "Toto IV",
      "genres": ["Classic Rock", "Pop"],
      "duration_ms": 1300
    },
    "4": {
      "_id": "4",
      "title": "We Are the World",
      "artists": ["Michael Jackson", "Lionel Richie", "USA for Africa"],
      "album": "Single",
      "genres": ["Pop"],
      "duration_ms": 1400
    }
  },
  "playlistCollections": {
    "3": {
      "_id": 3,
      "contents": [3]
    },
    "2": {
      "_id": 2,
      "contents": [1, 2, 3]
    },
    "1": {
      "_id": 1,
      "contents": [2, 3]
    }
  },
  "playlistItems": {
    "3": {
      "_id": 3,
      "contents": [3, 4]
    },
    "2": {
      "_id": 2,
      "contents": [2, 4]
    },
    "1": {
      "_id": 1,
      "contents": [1, 2]
    }
  }
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
