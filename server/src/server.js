// Imports the express Node module.
var express = require('express');
var request = require('request');
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


var clientID = '516d3e7895814f35a45f419a114e37b3';
var clientSecret = 'd8d330c4c35d430dbf45f6edbcb9a4ef';
var access_token = '';


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
  var playlistData = readDocument('playlistCollections', user);

  var playlists = playlistData.contents.map(getPlaylistSync);

  return playlists;
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
    if (typeof id === 'string') {
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

// ------- getUserData
app.get('/user/:userid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = req.params.userid;

  if (fromUser === userId) {
    // Send response.
  res.send(readDocument('users', userId));
  } else {
    // 403: Unauthorized request.
    res.status(403).end();
  }
});

// ------ editUserName
app.put('/user/:userid/name', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = req.params.userid;
  var user = readDocument('users', userId);

  if (fromUser === userId) {
    if (typeof(req.body) !== 'string') {
     // 400: Bad request.
     res.status(400).end();
     return;
    }

    user.name = req.body
    writeDocument('users', user)

    res.send(readDocument('users', userId));
  } else {
    res.status(401).end();
  }
});


// ------ editUserEmail
app.put('/user/:userid/email', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = req.params.userid;
  var user = readDocument('users', userId);

  if (fromUser === userId) {
    if (typeof(req.body) !== 'string') {
     // 400: Bad request.
     res.status(400).end();
     return;
    }

    user.email = req.body
    writeDocument('users', user)

    res.send(readDocument('users', userId));
  } else {
    res.status(401).end();
  }
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

// deletePlaylist
app.delete('/playlistCollections/:playlistCollectionsid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));

  var playlistCollectionId = req.params.playlistCollectionid

  if (fromUser === playlistCollectionId){
    var playlistCollection = readDocument('playlistCollections', playlistCollectionId);
    var index = playlistCollection.contents.indexOf(playlistCollectionId);

    // Remove from likeCounter if present
    if (index !== -1) {
      playlistCollection.contents.splice(index, 1);
      writeDocument('playlistCollections', playlistCollection);
    }

    res.send(playlistCollection.contents.map((playlistId) => readDocument('playlists', playlistId)));
  } else {
    res.status(401).end();
  }

});

// ------ addPlaylistToCollection
app.put('/playlistCollections/:playlistCollectionsid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistCollectionId = req.params.playlistCollectionsid
  var playlistCollection = readDocument('playlistCollections', req.params.playlistCollectionsid)


  if (fromUser === playlistCollectionId){
    if (playlistCollection.contents.indexOf(playlistCollectionId) === -1) {
      playlistCollection.contents.push(playlistCollectionId);
      writeDocument('playlistCollections', playlistCollection);
    }

    res.send(playlistCollection);
  } else {
    res.status(401).end();
  }
});

// ------- getPlaylistData
app.get('/user/:userid/playlistCollection', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userid = req.params.userid;

  // userid is a string. We need it to be a number.
  //var useridNumber = parseInt(userid, 10);
  if (fromUser === userid) {
    // Send response.
    res.send(getPlaylistData(userid));
  } else {
    // 403: Unauthorized request.
    res.status(403).end();
  }
});

// ------ getPlaylistCollection
app.get('/playlistCollections/:playlistCollectionid', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var playlistCollectionId = req.params.playlistCollectionid;

  if (fromUser === playlistCollectionId) {
    // Send response.
  res.send(readDocument('playlistCollections', playlistCollectionId));
  } else {
    // 403: Unauthorized request.
    res.status(403).end();
  }
});

// ------ addPlaylist
app.post('/playlists',
         validate({ body: PlaylistSchema }), function(req, res) {
  //var playlistId = req.params.playlistid;
  //var fromUser = getUserIdFromToken(req.get('Authorization'));
  var body = req.body;

  var newPlaylist = addPlaylist(body.name, body.description, body.authors);
  // When POST creates a new resource, we should tell the client about it
  // in the 'Location' header and use status code 201.
  res.status(201);
  res.set('Location', '/playlists/' + newPlaylist._id);
   // Send the update!
  res.send(newPlaylist);
});

function addPlaylist(name, description, authors) {

  // Get the current UNIX time.
  var time = new Date().getTime();

  // The new user
  var newPlaylist = {
    "name": name,
    "description": description,
    "authors": authors,
    "dateCreated": 1453690800000,
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
  var fromUser = parseInt(getUserIdFromToken(req.get('Authorization')), 10);
  var playlistId = req.params.playlistid;
  var playlist = readDocument('playlists', playlistId);

  if(playlist.authors.indexOf(fromUser) !== -1){
    if (typeof(req.body) !== 'string') {
     // 400: Bad request.
     res.status(400).end();
     return;
    }

    playlist.name = req.body;
    writeDocument('playlists', playlist)

    res.send(playlist);

  } else {
    res.status(403).end();
  }

  //res.send(getUserItemSync(playlistId));
});


// ------ editPlaylistDescription
app.put('/playlists/:playlistid/description', function(req, res) {
  var fromUser = parseInt(getUserIdFromToken(req.get('Authorization')), 10);
  var playlistId = req.params.playlistid;
  var playlist = readDocument('playlists', playlistId);

  if(playlist.authors.indexOf(fromUser) !== -1){
    if (typeof(req.body) !== 'string') {
     // 400: Bad request.
     res.status(400).end();
     return;
    }

    playlist.name = req.body
    writeDocument('playlists', playlist)

    res.send(playlist);
  } else {
    res.status(403).end();
  }

});

// ------ addToPlaylist
app.put('/playlists/:playlistid/playlistItems/:playlistitemid', function(req, res) {
  var fromUser = parseInt(getUserIdFromToken(req.get('Authorization')), 10);
  var playlistId = req.params.playlistid;
  var playlistItemId = req.params.playlistitemid;
  var playlist = readDocument('playlists', playlistId);

  if(playlist.authors.indexOf(fromUser) !== -1){

    if (playlist.playlistItems.indexOf(playlistItemId) === -1) {
      playlist.playlistItems.push(playlistItemId);
      writeDocument('playlists', playlist);
    }
    // Return a resolved version of the likeCounter
    res.send(playlist.playlistItems.map((playlistItemId) => readDocument('playlistItems', playlistItemId)));
  } else {
    res.status(403).end();
  }

  //res.send(getUserItemSync(playlistId));
});

// ------ deleteFromPlaylist
app.delete('/playlist/:playlistid/playlistItems/:playlistitemid', function(req, res) {
  var fromUser = parseInt(getUserIdFromToken(req.get('Authorization')), 10);
  var playlistId = req.params.playlistid;
  var playlistItemId = req.params.playlistitemid;

  var playlist = readDocument('playlists', playlistId);

  if(playlist.authors.indexOf(fromUser) !== -1){
    var playlistItemIndex = playlist.playlistItems.indexOf(playlistItemId)
    // Add to likeCounter if not already present.
    if (playlist.playlistItems.indexOf(playlistItemId) === -1) {
      playlist.playlistItems.splice(playlistItemIndex, 1);
      writeDocument('playlists', playlist);
    }
    // Return a resolved version of the likeCounter
    res.send(playlist.playlistItems.map((playlistId) => readDocument('playlists', playlistId)));
  } else {
    res.status(403).end();
  }

  //res.send(getUserItemSync(playlistId));
});

// ------- getPlaylistItemData
app.get('/playlist/:playlistid/playlistItems', function(req, res) {
  var fromUser = parseInt(getUserIdFromToken(req.get('Authorization')), 10);
  var playlistId = req.params.playlistid;
  var playlist = readDocument('playlists', playlistId);

  if(playlist.authors.indexOf(fromUser) !== -1){

    res.send(getPlaylistItemData(playlistId));
  } else {
    res.status(403).end();
  }
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
  var fromUser = parseInt(getUserIdFromToken(req.get('Authorization')), 10);
  var playlistId = req.params.playlistid;
  var playlistItemId = req.params.playlistitemid;

  var playlist = readDocument('playlists', playlistId);

  if(playlist.authors.indexOf(fromUser) !== -1){
    if (playlist.playlistItemUpvotes.indexOf(playlistItemId) === -1) {
      playlist.playlistItemUpvotes.push(playlistItemId);
      writeDocument('playlists', playlist);
    }
    // Return a resolved version of the likeCounter
    res.send(playlist.playlistItemUpvotes.map((playlistId) => readDocument('playlists', playlistId)));
  } else {
    res.status(403).end();
  }

  //res.send(getUserItemSync(playlistId));
});

// ------ downvoteItem
app.put('/playlist/:playlistid/playlistItemUpvotes/', function(req, res) {
  var fromUser = parseInt(getUserIdFromToken(req.get('Authorization')), 10);
  var playlistId = req.params.playlistid;
  var playlistItemId = req.params.playlistitemid;

  var playlist = readDocument('playlists', playlistId);

  if(playlist.authors.indexOf(fromUser) !== -1){
    if (playlist.playlistItemUpvotes.indexOf(playlistItemId) === -1) {
      playlist.playlistItemUpvotes.splice(playlistItemId, 1);
      writeDocument('playlists', playlist);
    }
    // Return a resolved version of the likeCounter
    res.send(playlist.playlistItemUpvotes.map((playlistId) => readDocument('playlists', playlistId)));
  } else {
    res.status(403).end();
  }

  //res.send(getUserItemSync(playlistId));
});

app.get('/search/:query', function(req, res) {

  var authOptions = {
    url: 'https://api.spotify.com/v1/search/?q='  + req.params.query + '&type=track',
    headers: { 'Authorization': 'Bearer ' + access_token},
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var tracks = body.tracks;
      console.log(tracks);
      res.send({
        'results': tracks
      });
    }
  });
});

app.get('/client_credentials', function(req, res) {

  // requesting access token from refresh token
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(clientID + ':' + clientSecret).toString('base64')) },
    form: {
      grant_type: 'client_credentials',
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// app.post('/request_access_token', function(req, res) {
//   res.redirect('https://accounts.spotify.com/api/token')
// });

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
