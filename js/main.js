/*global TweenLite io*/

$().ready(function () {
  "use strict";

  var guests = {}
  var socket = io.connect()
  var octocat = $('#github')
  var offsetLeft, offsetTop

  socket.on('connect', function () {
    $(window).on('mousemove', function (e) {
      socket.emit('move', {
        x: e.clientX - offsetLeft,
        y: e.clientY - offsetTop
      })
    }).on('resize', function () {
      var offset = octocat.offset()
      offsetTop = offset.top
      offsetLeft = offset.left
    }).trigger('resize')
  }).on('move', function (data) {
    var guest = guests[data.id]
    if (guest === undefined) {
      guest = guests[data.id] = $('<div class="pointer">').css({
        left: data.x - 5 + offsetTop,
        top: data.y - 5 + offsetLeft
      }).to({ opacity: 0.5 }, 1).appendTo(document.body)
    }
    guest.to({
      left: data.x - 5 + offsetLeft,
      top: data.y - 5 + offsetTop
    }, 0.5)
  }).on('disconnect', function (id) {
    var guest = guests[id]
    if (!guest) return
    guest.to({ opacity: 0 }, 1, function () {
        $(guest).remove()
        ;delete guests[id]
    })
  })
})