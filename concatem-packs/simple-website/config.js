{
  "define": {
    "title": {"text": "My Static Website"},
    "subtitle": {"text": "This is the subtitle of my website"},
    "copyright": {"text": "2014 - Concatem"},

    "head": "_asset/html/head.html",
    "foot": "_asset/html/foot.html",
    "nav": "_asset/html/nav.html"

  },

  "concat": {
    "index": {
      "src": ["index.html"],
      "dest": "_dist/"
    },

    "js": {
      "src": ["js/*.js"],
      "dest": "_dist/"
    },

    "css": {
      "src": ["css/*.css"],
      "dest": "_dist/"
    }
  }
}