var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');
var fs = require('fs');

//var numUsers = 0;

io.sockets.on('connection', function(socket, username){
  var addedUser = false;
	socket.on('new-client', function(username){
		 if(username!='undefined') {
		 username = ent.encode(username);
		 socket.username = username;
		 socket.broadcast.emit('new-client', username);
		}
	});
	
	socket.on('message', function(message){
		console.log(message);
		message  = ent.encode(message);
		socket.broadcast.emit('message', message)
	});

	// when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
	console.log(data);
    socket.broadcast.emit('new message', {
      username: data.name,
      message: data.messageText
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

server.listen(8080, function(){
  console.log('server started...');
});
