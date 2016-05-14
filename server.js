var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var IDcount = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/main.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

io.on('connection', function(socket){
	console.log('Jugador conectado!');

	socket.on('new', function(){
		io.emit('new', IDcount);
		socket.broadcast.emit('add', IDcount);
		IDcount++;
	});

	socket.on('pos', function(msg){
		//console.log('pos: ' + msg);
		socket.broadcast.emit('pos', msg);
	});

	socket.on('disconnect', function(){
		console.log('Jugador desconectado.');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});