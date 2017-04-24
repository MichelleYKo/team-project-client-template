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

  return playlist;
}
function getPlaylistItemData(playlist) {
  var playlistData = readDocument('playlists', playlist);
  var playlistItemData = readDocument('playlistItems', playlistData.playlistItems);

  playlistData.contents = playlistData.contents.map(getPlaylistItemSync);

  return playlistItemData;
}



//---------- addUser
app.post('/user:userid', validate({ body: UserSchema }), function(req, res) {
  var body = req.body;

  var newUser = addUser(body.name, body.email);

  res.status(201);
  res.set('Location', '/user/' + newUser._id);
  res.send(newUser);
});

function addUser(name, email) {

  // Get the current UNIX time.
  var time = new Date().getTime();

  // The new user
  var newUser = {
    "name": name,
    "email": email,
    "connectedAccounts": [],
    "friends": []
  };

  addDocument('Users', newUser);

  // Return the new user
  return newUser;
}


// ------ editUserName
app.put('/user:userid/name', function(req, res) {
  var userId = req.params.userid;
  var user = readDocument('users', userID);

  if (typeof(req.body) !== 'string') {
   // 400: Bad request.
   res.status(400).end();
   return;
  }

  user.name = req.body
  writeDocument('users', user)

  res.send(getUserItemSync(UserId));
});


// ------ editUserEmail
app.put('/user/:userid/email', function(req, res) {
  var userId = req.params.userid;
  var user = readDocument('users', userID);

  if (typeof(req.body) !== 'string') {
   // 400: Bad request.
   res.status(400).end();
   return;
  }

  user.email = req.body
  writeDocument('users', user)

  res.send(getUserItemSync(UserId));
});


// ------ deletePlaylist
app.delete('/user/:userid/playlistCollection/:playlistid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  // Convert params from string to number.
  var userId = parseInt(req.params.userid, 10);
  var playlistId = parseInt(req.params.playlistid, 10);

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
});

// ------ addNewPlaylist
app.put('/user/:userid/playlistCollection/:playlistid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Convert params from string to number.
  var playlistId = parseInt(req.params.playlistid, 10);
  var userId = parseInt(req.params.userid, 10);

  if (fromUser === userId) {
    var user = readDocument('feedItems', userId);
    // Add to likeCounter if not already present.
    if (user.playlistCollection.indexOf(playlistId) === -1) {
      user.playlistCollection.push(userId);
      writeDocument('feedItems', feedItem);
    }
    // Return a resolved version of the likeCounter
    res.send(feedItem.likeCounter.map((userId) => readDocument('users', userId)));
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
});

// ------- getPlaylistData
app.get('/user/:userid/playlistCollection', function(req, res) {
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
app.post('/playlist/:playlistid',
         validate({ body: PlaylistSchema }), function(req, res) {
  var playlistId = req.params.playlistid;

  var body = re.body;

  var newPlaylist = addPlaylist(body.name, body.description);
  // When POST creates a new resource, we should tell the client about it
  // in the 'Location' header and use status code 201.
  res.status(201);
  res.set('Location', '/playlist/' + newPlaylist._id);
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
    "playlistItemDownvotes": [],
  };

  addDocument('playlists', newPlaylist);

  // Return the newly-posted object.
  return newUser;
}


// ------ editPlaylistName
app.put('/playlist/:playlistid/name', function(req, res) {
  var playlistId = req.params.playlistid;
  var playlist = readDocument('playlists', playlistID);

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
app.put('/playlist/:playlistid/description', function(req, res) {
  var playlistId = req.params.playlistid;
  var playlist = readDocument('playlists', playlistID);

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
app.put('/playlist/:playlistid/playlistItems/:playlistitemid', function(req, res) {
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
  var playlistId = req.params.playlistid;
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
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
  var playlistId = req.params.playlistid;
  var userId = req.params.playlistitemid;

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
