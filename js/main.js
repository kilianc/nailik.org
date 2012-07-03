var guests = {}
var socket = io.connect()
socket.on('move', function (data) {
  if (guests[data.id] === undefined) {
    guests[data.id] = $('<div class="pointer"></div>').appendTo(document.body)
  }
  guests[data.id].css('left', data.x-3)
  guests[data.id].css('top', data.y-3)
})
socket.on('disconnect', function (id) {
  guests[id].remove()
  delete guests[id]
})
window.addEventListener('mousemove', function (e) {
  socket.emit('move', { x: e.clientX, y: e.clientY })
})
