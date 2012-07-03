var http = require('http');
    express = require('express'),
    io = require('socket.io'),
    version = require('./package').version

var app = express()
var server = http.createServer(app)
var io = io.listen(server)

app.use(express.static(__dirname + '/public'))

io.set('log level', 0)
io.sockets.on('connection', function (socket) {
  socket.on('move', function (data) {
    data.id = socket.id
    socket.broadcast.volatile.emit('move', data)
  })
  socket.on('disconnect', function () {
    socket.broadcast.emit('disconnect', socket.id)
  })
})

server.listen(process.env.PORT || 80)