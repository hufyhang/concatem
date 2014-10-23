{
  "define": {

    "header": "config.js",
    "copyright": {"text": "All rights reserved by me."}

  },

  "concat": {

    "html": {
      "src": ["*.html", "web/*.html"],
      "dest": "./dist"
    },

    "dist": {
      "src": ["*.txt"],
      "dest": "./dist/",
      "extension": ".md"
    }

  }
}