/*!
 * server.js
 * Created by Kilian Ciuffolo on July 3, 2012
 * (c) 2012
 */

'use strict'

const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)
const serve = require('express').static

app.use(serve(__dirname + '/public'))

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

server.listen(8080)

/**
 * Quit if SIGINT
 */
process.on('SIGINT', function() {
  console.log('Caught interrupt signal')
  process.exit()
})