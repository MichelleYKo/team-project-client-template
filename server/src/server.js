// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
// Parses response bodies.
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var deleteDocument = database.deleteDocument;
var addDocument = database.addDocument;
var getCollection = database.getCollection;
var validate = require('express-jsonschema').validate;
var UserSchema = require('./schemas/userSchema.json');
var PlaylistSchema = require('./schemas/playlistSchema.json');


app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static('../client/build'));


function getPlaylistSync(playlistId) {
  var playlist = readDocument('playlists', playlistId);
  // Resolve authors
  playlist.authors = playlist.authors.map((id) => readDocument('users', id));
  // Resolve playlist items
  playlist.playlistItems = playlist.playlistItems.map((id) => readDocument('playlistItems', id));

  return playlist;
}

function getPlaylistData(user) {
  var userData = readDocument('users', user);
  var playlistData = readDocument('playlists', userData.playlistCollection);

  playlistData.contents = playlistData.contents.map(getPlaylistSync);

  return playlistData;
}

function getPlaylistItemSync(playlistItemId) {
  var playlistItems = readDocument('playlistItems', playlistItemId);

  return playlistItems;
}
function getPlaylistItemData(playlist) {
  var playlistData = readDocument('playlists', playlist);
  var playlistItemData = readDocument('playlistItems', playlistData.playlistItems);

  playlistData.contents = playlistData.contents.map(getPlaylistItemSync);

  return playlistItemData;
}

function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}


//---------- addUser
app.post('/user/:userid', validate({ body: UserSchema }), function(req, res) {
  var body = req.body;

  var newUser = addUser(body.name, body.email);

  newUser.playlistCollection = newUser._id;

  res.status(201);
  res.set('Location', '/user/' + newUser._id);
  res.send(newUser);
});

function addUser(name, email) {

  // The new user
  var newUser = {
    "name": name,
    "email": email,
    "connectedAccounts": [],
    "playlistCollection": 0
  };

  addDocument('Users', newUser);

  // Return the new user
  return newUser;
}


// ------ editUserName
app.put('/user/:userid/name', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = req.params.userid;
  var user = readDocument('users', userId);

  if (typeof(req.body) !== 'string') {
   // 400: Bad request.
   res.status(400).end();
   return;
  }

  user.name = req.body
  writeDocument('users', user)

  res.send(readDocument('users', userId));
});


// ------ editUserEmail
app.put('/user/:userid/email', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = req.params.userid;
  var user = readDocument('users', userId);

  if (typeof(req.body) !== 'string') {
   // 400: Bad request.
   res.status(400).end();
   return;
  }

  user.email = req.body
  writeDocument('users', user)

  res.send(readDocument('users', userId));
});


/*// ------ deletePlaylist
app.delete('/user/:userid/playlistCollection/:playlistid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  var userId = req.params.userid
  var playlistId = req.params.playlistid

  if (fromUser === userId) {
    var user = readDocument('users', userId);
    var playlistIndex = user.playlistCollection.indexOf(playlistId);

    // Remove from likeCounter if present
    if (playlistIndex !== -1) {
      user.playlistCollection.splice(playlistIndex, 1);
      writeDocument('users', user);
    }

    res.send(user.playlistCollection.map((userId) => readDocument('users', userId)));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});*/


app.delete('/playlistCollections/:playlistCollectionid', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));

  var playlistCollectionId = req.params.playlistCollectionid

  var playlistCollection = readDocument('playlistCollections', playlistCollectionId);
  var index = playlistCollection.contents.indexOf(playlistCollectionId);

  // Remove from likeCounter if present
  if (index !== -1) {
    playlistCollection.contents.splice(index, 1);
    writeDocument('playlistCollections', playlistCollection);
  }

  res.send(playlistCollection.contents.map((playlistId) => readDocument('playlists', playlistId)));

});

// ------ addNewPlaylist
app.put('playlistCollections/:playlistid', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var authors = req.params.authors;

  authors.foreach(function(userId) {
    var playlistCollection = readDocument('playlistCollections', userId);
    // Add to likeCounter if not already present.
    if (playlistCollection.contents.indexOf(userId) === -1) {
      playlistCollection.contents.push(userId);
      writeDocument('playlistCollections', playlistCollection);
    }
    // Return a resolved version of the likeCounter
    res.send(playlistCollection.contents.map((playlistId) => readDocument('playlists', playlistId)));
  });

});

// ------- getPlaylistData
app.get('/user/:userid/playlistCollection', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userid = req.params.userid;
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  // userid is a string. We need it to be a number.
  //var useridNumber = parseInt(userid, 10);
  //if (fromUser === useridNumber) {
    // Send response.
  res.send(getPlaylistData(userid));
  //} else {
    // 403: Unauthorized request.
  //  res.status(403).end();
  //}
});


// ------ addPlaylist
app.post('/playlists/:playlistid',
         validate({ body: PlaylistSchema }), function(req, res) {
  //var playlistId = req.params.playlistid;
  //var fromUser = getUserIdFromToken(req.get('Authorization'));

  var body = req.body;

  var newPlaylist = addPlaylist(body.name, body.description);
  // When POST creates a new resource, we should tell the client about it
  // in the 'Location' header and use status code 201.
  res.status(201);
  res.set('Location', '/playlists/' + newPlaylist._id);
   // Send the update!
  res.send(newPlaylist);
});

function addPlaylist(name, description) {

  // Get the current UNIX time.
  var time = new Date().getTime();

  // The new user
  var newPlaylist = {
    "name": name,
    "description": description,
    "authors": [],
    "dateCreated": time,
    "playlistItems": [],
    "playlistItemUpvotes": [],
    "playlistItemDownvotes": []
  };

  addDocument('playlists', newPlaylist);

  // Return the newly-posted object.
  return newPlaylist;
}


// ------ editPlaylistName
app.put('/playlists/:playlistid/name', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistId = req.params.playlistid;
  var playlist = readDocument('playlists', playlistId);

  if (typeof(req.body) !== 'string') {
   // 400: Bad request.
   res.status(400).end();
   return;
  }

  playlist.name = req.body
  writeDocument('playlists', playlist)

  //res.send(getUserItemSync(playlistId));
});


// ------ editPlaylistDescription
app.put('/playlists/:playlistid/description', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistId = req.params.playlistid;
  var playlist = readDocument('playlists', playlistId);

  if (typeof(req.body) !== 'string') {
   // 400: Bad request.
   res.status(400).end();
   return;
  }

  playlist.name = req.body
  writeDocument('playlists', playlist)

  //res.send(getUserItemSync(playlistId));
});

// ------ addToPlaylist
app.put('/playlists/:playlistid/playlistItems/:playlistitemid', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistId = req.params.playlistid;
  var playlistItemId = req.params.playlistitemid;

  var playlist = readDocument('playlists', playlistId);
  // Add to likeCounter if not already present.
  if (playlist.playlistItems.indexOf(playlistItemId) === -1) {
    playlist.playlistItems.push(playlistItemId);
    writeDocument('playlists', playlist);
  }
  // Return a resolved version of the likeCounter
  res.send(playlist.playlistItems.map((playlistId) => readDocument('playlists', playlistId)));

  //res.send(getUserItemSync(playlistId));
});

// ------ deleteFromPlaylist
app.delete('/playlist/:playlistid/playlistItems/:playlistitemid', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistId = req.params.playlistid;
  var playlistItemId = req.params.playlistitemid;

  var playlist = readDocument('playlists', playlistId);
  var playlistItemIndex = playlist.playlistItems.indexOf(playlistItemId)
  // Add to likeCounter if not already present.
  if (playlist.playlistItems.indexOf(playlistItemId) === -1) {
    playlist.playlistItems.splice(playlistItemIndex, 1);
    writeDocument('playlists', playlist);
  }
  // Return a resolved version of the likeCounter
  res.send(playlist.playlistItems.map((playlistId) => readDocument('playlists', playlistId)));

  //res.send(getUserItemSync(playlistId));
});

// ------- getPlaylistItemData
app.get('/playlist/:playlistid/playlistItems', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistId = req.params.playlistid;

  // userid is a string. We need it to be a number.
  //var useridNumber = parseInt(userid, 10);
  //if (fromUser === useridNumber) {
    // Send response.
  res.send(getPlaylistItemData(playlistId));
  //} else {
    // 403: Unauthorized request.
  //  res.status(403).end();
  //}
});


// ------ addPlaylistItem
// TODO: Figure out Spotify API data to put in here
/*app.post('/playlistitems/:playlistitemid',
         validate({ body: PlaylistItemSchema }), function(req, res) {
  var playlistItemId = req.params.playlistItemid;

  res.set('Location', '/playlistitems/' + playlistItemId);
  //res.send(getUserItemSync(UserId));
});*/

// ------ upvoteItem
app.put('/playlist/:playlistid/playlistItemUpvotes/', function(req, res) {
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistId = req.params.playlistid;
  var playlistItemId = req.params.playlistitemid;

  var playlist = readDocument('playlists', playlistId);
  // Add to likeCounter if not already present.
  if (playlist.playlistItemUpvotes.indexOf(playlistItemId) === -1) {
    playlist.playlistItemUpvotes.push(playlistItemId);
    writeDocument('playlists', playlist);
  }
  // Return a resolved version of the likeCounter
  res.send(playlist.playlistItemUpvotes.map((playlistId) => readDocument('playlists', playlistId)));

  //res.send(getUserItemSync(playlistId));
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
