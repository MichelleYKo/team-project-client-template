import React from 'react';
import ReactDOM from 'react-dom';

var startupName = 'playlistParty';

var initialData = {
  // The "user" collection. Contains all of the users in our Facebook system.
  "users": {
    "1": { // This user has id "1".
      "_id": 1,
      "name": "Tim Richards", // Name of user.
      "email": "trichards@cs.umass.edu", // Email associated with account.
      "connectedAccts": ["Spotify", "Facebook"], // Linked accounts with application.
      "preferences": { // Various values that the Spotify API will use to generate playlists.
        "artists": ["Nickelback", "Pink Floyd", "Skrillex", "Zedd"], // List of user preferred artists.
        "genres": ["EDM", "Rock", "Metal"], // List of user preferred music genres.
        "danceability": 0.8, // How suitable a track is for dancing, scale of 0.0 - 1.0 (1.0 being most danceable and 0.0 being least).
        "energy": 0.6, // Measure of intensity and activity, scale from 0.0 - 1.0 (1.0 being fast, loud and noisy while 0.0 is not).
        "instrumentalness": 0.2, // Presence of vocals in track, scale of 0.0 - 1.0 (1.0 being no vocals and 0.0 being many).
        "valence": 0.6 // "Positivity" of a track, scale of 0.0 - 1.0 (1.0 being very positive and 0.0 being sad).
      },
      "playlistCollection": [2, 3] // List of playlist IDs that this user has been an author of.
    },
    "2": {
      "_id": 2,
      "name": "Jon Bailey",
      "email": "jonathanbail@umass.edu",
      "connectedAccts": ["Spotify"],
      "preferences": {
        "artists": ["Mnozil Brass", "Snarky Puppy", "Thank You Scientist"],
        "genres": ["Classical", "Jazz", "Rock", "EDM"],
        "danceability": 0.9,
        "energy": 0.5,
        "instrumentalness": 0.5,
        "valence": 0.4
      },
      "playlistCollection": [1, 2, 3]
    },
    "3": {
      "_id": 3,
      "name": "Jake Magier",
      "email": "jmagier@umass.edu",
      "connectedAccts": ["Napster", "MySpace", "Facebook"],
      "preferences": {
        "artists": ["Michael Jackson", "Radiohead", "Peter Bradley Adams"],
        "genres": ["Indie", "Pop", "Techno", "Metal"],
        "danceability": 0.3,
        "energy": 0.2,
        "instrumentalness": 0.1,
        "valence": 0.7
      },
      "playlistCollection": [3]
    }
  },
  // The "playlist" collection. Contains all of the playlists that have been created.
  "playlists": {
    // This playlist has id "1".
    "1": {
      "_id": 1,
      "name": "Homework Jammin'", // Playlist name.
      "description": "", // The description of this playlist, created by the user.
      "authors": ["Jon Bailey"], // Users who contributed to this playlist.
      "dateCreated": 1453690800000, // Date of playlist creation.
      "playlistItems": ["1", "2"], // List of playlistitem IDs associated with this playlist.
      "numSongs": 0 // Number of songs in this playlist.
    },
    "2": {
      "_id": 2,
      "name": "Working Out",
      "description": "",
      "authors": ["Jon Bailey", "Tim Richards"],
      "dateCreated": 1453690800000,
      "playlistItems": ["2", "4"],
      "numSongs": 0
    },
    "3": {
      "_id": 3,
      "name": "House Party",
      "description": "",
      "authors": ["Jon Bailey", "Tim Richards", "Jake Magier"],
      "dateCreated": 1453668480000,
      "playlistItems": ["3", "4"],
      "numSongs": 0
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
      "duration_ms": 1100, // The duration of the track in milliseconds. (Integer ... track.duration_ms)
      "upvotes": [1, 2], // List of user IDs who "up" vote this track has. NOTE this is not from the API, this is a custom data field.
      "downvotes": [3], // List of user IDs who "down" vote this track. NOTE this is not from the API, this is a custom data field.
      "associatedPlaylists": [1] //List of playlist IDs that contain this playlist item.
    },
    "2": {
      "_id": "2",
      "title": "Toxic",
      "artists": ["Britney Spears"],
      "album": "In the Zone",
      "genres": ["Pop"],
      "duration_ms": 1200,
      "upvotes": [2],
      "downvotes": [1, 2],
      "associatedPlaylists": [1, 2]
    },
    "3": {
      "_id": "3",
      "title": "Africa",
      "artists": ["Toto"],
      "album": "Toto IV",
      "genres": ["Classic Rock", "Pop"],
      "duration_ms": 1300,
      "upvotes": [1, 2, 3],
      "downvotes": [],
      "associatedPlaylists": [3]
    },
    "4": {
      "_id": "4",
      "title": "We Are the World",
      "artists": ["Michael Jackson", "Lionel Richie", "USA for Africa"],
      "album": "Single",
      "genres": ["Pop"],
      "duration_ms": 1400,
      "upvotes": [1],
      "downvotes": [2, 3],
      "associatedPlaylists": [2, 3]
    }
  }
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
*/
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}
/**
 * Reset database button.
*/
/*
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}*/

/*
ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);*/
