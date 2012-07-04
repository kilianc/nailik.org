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
      guests[data.id] = guest = $('<div class="pointer">').css({
        left: data.x - 5 + offsetTop,
        top: data.y - 5 + offsetLeft
      }).appendTo(document.body)[0]
      TweenLite.to(guest, 1, { css: { opacity: 0.5 } })
    }
    TweenLite.to(guest, 0.5, { css: {
      left: data.x - 5 + offsetLeft,
      top: data.y - 5 + offsetTop
    }})
  }).on('disconnect', function (id) {
    var guest = guests[id]
    if (!guest) return
    TweenLite.to(guest, 0.5, { css: { opacity: 0 }, onComplete: function () {
        $(guest).remove()
        ;delete guests[id]
    }})
  })
})