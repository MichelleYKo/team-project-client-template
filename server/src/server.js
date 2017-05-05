// Imports the express Node module.
var express = require('express');
// Creates an Express server.
var app = express();
// Parses response bodies.
var bodyParser = require('body-parser');
var database = require('./database');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
//var deleteDocument = database.deleteDocument;
var addDocument = database.addDocument;
//var getCollection = database.getCollection;
var validate = require('express-jsonschema').validate;
var UserSchema = require('./schemas/userSchema.json');
var PlaylistSchema = require('./schemas/playlistSchema.json');
var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/kiwi';
var ResetDatabase = require('./resetdatabase');

MongoClient.connect(url, function(err, db) {
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(express.static('../client/build'));
  app.use('/mongo_express', mongo_express(mongo_express_config));


  function resolveUserObjects(userList, callback) {
  if (userList.length === 0) {
    callback(null, {});
  }
  else {
    var query = {
      $or: userList.map((id) => { return {_id: id } })
    };
    // Resolve stuff
    db.collection('users').find(query).toArray(function(err, users) {
      if (err) {
        return callback(err);
      }
      var userMap = {};
      users.forEach((user) => {
        userMap[user._id] = user;
      });
      callback(null, userMap);
    });
  }
}

  function getPlaylist(playlistId, callback) {
    db.collection('playlists').findOne({
      _id: playlistId
    }, function(err, playlist){
      if (err){
        return callback(err);
      }
    else if(playlist === null){
      return callback(null,null);
    }

    var userList = [playlist._id];
    userList=userList.concat(playlist.authors);
    userList=userList.concat(playlist.playlistItems);
    resolveUserObjects(userList, function(err, userMap){
      if (err) {
        return callback(err);
      }
    playlist._id = userMap[playlist._id];
    playlist.authors=playlist.authors.map((userId)=>userMap[userId]);
    playlist.playlistItems=playlist.playlistItems.map((userId)=>userMap[userId]);
    });
    callback(null, playlist);
    });
    //var playlist = readDocument('playlists', playlistId);
    // Resolve authors
    //playlist.authors = playlist.authors.map((id) => readDocument('users', id));
    // Resolve playlist items
    //playlist.playlistItems = playlist.playlistItems.map((id) => readDocument('playlistItems', id));
    //return playlist;
  }

  function getPlaylistData(user, callback) {
  db.collection('users').findOne({
    _id: user
  }, function(err, userData) {
  if (err) {
    return callback(err);
  } else if (userData === null) {
    // User not found.
    return callback(null, null);
  }

  db.collection('playlists').findOne({
    _id: userData.playlistCollections
  }, function(err, playlistData) {
    if (err) {
      return callback(err);
    } else if (playlistData === null) {
      // Playlist not found.
      return callback(null, null);
    }
    var resolvedContents = [];
    function processNextPlaylist(i) {
    getPlaylist(playlistData.contents[i], function(err, playlist) {
    if (err) {
      callback(err);
    }
    else {
      resolvedContents.push(playlist);
      if (resolvedContents.length === playlistData.contents.length) {
        // I am the final feed item; all others are resolved.
        // Pass the resolved feed document back to the callback.
        playlistData.contents = resolvedContents;
        callback(null, playlistData);
      } else {
        // Process the next feed item.
        processNextPlaylist(i + 1);
      }
      }
    });
    }
    // Empty Case
    if (playlistData.contents.length === 0) {
      callback(null, playlistData);
    } else {
      processNextPlaylist(0);
    }
    });
    });
    /*
    var userData = readDocument('users', user);
    var playlistData = readDocument('playlistCollections', user);

    var playlists = playlistData.contents.map(getPlaylistSync);

    return playlists;
    */
  }

  function getPlaylistItem(playlistItemId, callback) {
    db.collection('playlistsItems').findOne({
      _id: playlistItemId
    }, function(err, playlistItem){
      if (err){
        return callback(err);
      }
    else if(playlistItem === null){
      return callback(null,null);
    }
    var playlistItemList = [playlistItem._id];
    //playlistItemList=playlistItemList.concat(playlistItems.);
    resolveUserObjects(playlistItemList, function(err, playlistItemMap){
      if (err) {
        return callback(err);
      }
    playlistItem._id = playlistItemMap[playlistItem._id];
    //playlistItem.playlistItems=playlistItem.playlistItems.map((userId)=>userMap[userId]);
    });
    callback(null, playlistItem);
    });
    /*
    var playlistItems = readDocument('playlistItems', playlistItemId);

    return playlistItems;
    */
  }

  function getPlaylistItemData(playlist, callback) {
    db.collection('playlists').findOne({
      _id: playlist
    }, function(err, playlistData) {
    if (err) {
      return callback(err);
    } else if (playlistData === null) {
      // Playlist not found.
      return callback(null, null);
    }
    db.collection('playlistItems').findOne({
      _id: playlistData.playlistItems
    }, function(err, playlistItemData) {
      if (err) {
        return callback(err);
      } else if (playlistItemData === null) {
        // PlaylistItem not found.
        return callback(null, null);
      }
      var resolvedContents = [];
      function processNextPlaylistItem(i) {
      getPlaylistItem(playlistItemData.contents[i], function(err, playlist) {
      if (err) {
        callback(err);
      }
      else {
        resolvedContents.push(playlist);
        if (resolvedContents.length === playlistItemData.contents.length) {
          // I am the final feed item; all others are resolved.
          // Pass the resolved feed document back to the callback.
          playlistData.contents = resolvedContents;
          callback(null, playlistItemData);
        } else {
          // Process the next feed item.
          processNextPlaylistItem(i + 1);
        }
        }
      });
      }
      // Empty Case
      if (playlistItemData.contents.length === 0) {
        callback(null, playlistItemData);
      } else {
        processNextPlaylistItem(0);
      }
      });
      });
    /*
    var playlistData = readDocument('playlists', playlist);
    var playlistItemData = readDocument('playlistItems', playlistData.playlistItems);

    playlistData.contents = playlistData.contents.map(getPlaylistItemSync);

    return playlistItemData;
    */
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
        // Not a string. Return "", an invalid ID.
        return "";
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
    /*  // Send response.
      res.send(getPlaylistData(userid));
    } else {
      // 403: Unauthorized request.
      res.status(403).end();
    }
    */
    getPlaylistData(new ObjectID(userid), function(err, playlistData) {
      if (err) {
        // A database error happened.
        // Internal Error: 500.
        res.status(500).send("Database error: " + err);
      } else if (playlistData === null) {
        // Couldn't find the feed in the database.
        res.status(400).send("Could not look up playlist for user " + userid);
      } else {
        // Send data.
        res.send(playlistData);
      }
      });
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
    //var time = new Date().getTime();

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

    var query = req.params.query;
    console.log(query);

    res.redirect('https://api.spotify.com/v1/search/?q=' + query + '&type=track'
      /*querystring.stringify({
        query: query,
        type: type
      })*/);

    //not actually sending the response back to the client side...

  });

  // Reset the database.
  app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    ResetDatabase(db, function() {
      res.send();
    });
  });

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
