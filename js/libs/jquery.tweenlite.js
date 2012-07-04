;['to', 'from', 'fromTo', 'set'].forEach(function (methodName) {
  $.fn[methodName] = function (css, time, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    options = options || {}
    options.css = css
    options.onComplete = options.onComplete || callback

    TweenLite[methodName](this[0], time, options)
    return this
  }
})