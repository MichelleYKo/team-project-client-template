var ObjectID = require('mongodb').ObjectID;

var databaseName= "kiwi";

var initialData = {
  "users": {
    "1": { // This user has id "1".
      "_id": new ObjectID("000000000000000000000001"),
      "name": "Tim Richards", // Name of user.
      "email": "trichards@cs.umass.edu", // Email associated with account.
      "playlistCollection": new ObjectID("000000000000000000000001") // List of playlist IDs that this user has been an author of.
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "name": "Jon Bailey",
      "email": "jonathanbail@umass.edu",
      "playlistCollection": new ObjectID("000000000000000000000002")
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "name": "Jake Magier",
      "email": "jmagier@umass.edu",
      "playlistCollection": new ObjectID("000000000000000000000003")
    }
  },
  // The "playlist" collection. Contains all of the playlists that have been created.
  "playlists": {
    // This playlist has id "1".
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "name": "Homework Jammin'", // Playlist name.
      "description": "", // The description of this playlist, created by the user.
      "authors": [new ObjectID("000000000000000000000002")], // Users who contributed to this playlist.
      "dateCreated": 1453690800000, // Date of playlist creation.
      "playlistItems": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")], // List of playlistitem IDs associated with this playlist.
      "playlistItemUpvotes": [0, 0],
      "playlistItemDownvotes": [0, 1]
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "name": "Working Out",
      "description": "",
      "authors": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")],
      "dateCreated": 1453690800000,
      "playlistItems": [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000004")],
      "playlistItemUpvotes": [2, 1],
      "playlistItemDownvotes": [0, 1]
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "name": "House Party",
      "description": "",
      "authors": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")],
      "dateCreated": 1453668480000,
      "playlistItems": [new ObjectID("000000000000000000000003"), new ObjectID("000000000000000000000004")],
      "playlistItemUpvotes": [1, 0],
      "playlistItemDownvotes": [0, 2]
    }
  },
  // The "playlist item" collection. Contains a few sample song items which will later be pulled in from Spotify dynamically.
  "playlistItems": { // NOTE that all datatypes listed here match with what the Spotify API returns.
    "1": {
      "_id": new ObjectID("000000000000000000000001"), // The Spotify ID for this track, NOTE the API returns a STRING, not integer!
      "title": "Welcome to the Jungle", // The title of this track. (String ... track.name)
      "artists": ["Guns N' Roses"], // The artist(s) of this track. (String[] ... track.artists.name), API returns array of artist objects which contain names.
      "album": "Appetite for Destruction", // The album this track is in. (String ... track.album.name), API returns album object which contains a name. Can be empty.
      "genres": ["Hard Rock"], // The genre(s) of this track. (String[] ... track.album.genres), API returns array of strings representing classified genres. Can be empty.
      "duration_ms": 1100 // The duration of the track in milliseconds. (Integer ... track.duration_ms)
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "title": "Toxic",
      "artists": ["Britney Spears"],
      "album": "In the Zone",
      "genres": ["Pop"],
      "duration_ms": 1200
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "title": "Africa",
      "artists": ["Toto"],
      "album": "Toto IV",
      "genres": ["Classic Rock", "Pop"],
      "duration_ms": 1300
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
      "title": "We Are the World",
      "artists": ["Michael Jackson", "Lionel Richie", "USA for Africa"],
      "album": "Single",
      "genres": ["Pop"],
      "duration_ms": 1400
    }
  },
  "playlistCollections": {
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "contents": [new ObjectID("000000000000000000000003")]
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "contents": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")]
    },
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "contents": [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")]
    }
  }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Adds any desired indexes to the database.
 */
function addIndexes(db, cb) {
  db.collection('feedItems').createIndex({ "contents.contents": "text" }, null, cb);
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      addIndexes(db, cb);
  }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
