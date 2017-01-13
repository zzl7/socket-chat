var app = require("express")()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  /*res.send('<h1>Hello world</h1>');*/
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
	// console.log("欢迎进入聊天室")
	socket.broadcast.emit('message','欢迎新同学进入聊天室');
	socket.on("chat message", function(msg){
		io.emit('chat message', msg);
		console.log('message: ' + msg);
	})
	socket.on('disconnect', function(){
	    console.log('欢迎下次再来哦！');
	});
});
