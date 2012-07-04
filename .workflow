{
  "js": {
    "targets": [{
      "output": "public/js/main.min.js --min",
      "src": [
        "js/vendor/greensock/CSSPlugin.js",
        "js/vendor/greensock/TweenLite.js",
        "js/vendor/zepto.js",
        "js/libs/jquery.tweenlite.js",
        "js/analytics.js",
        "js/main.js --check"
      ]
    }]
  },
  "stylus": {
    "targets": [{
      "src": "stylus/main.styl",
      "output": "public/css/main.css --min "
    }]
  }
}