concatem (Concat 'em)
====================

A Node.js app for concatenating files according to predefined settings.

Suitable for authoring simple static website or generating files.

Usage
------

Go to a folder with `concatemfile.js` files inside, and then:

`concatem [task]`

If no `task` parameter presented, process all tasks defined in `concatemfile.js`.

Config.js
---------

Sample:

~~~javascript
{
  "define": {

    "header": "config.js",
    "copyright": {"text": "All rights reserved by me."}

  },

  "concat": {

    "html": {
      "src": ["*.html"],
      "dest": "./dist"
    },

    "dist": {
      "src": ["*.txt"],
      "dest": "./dist/",
      "extension": ".md"
    }

  }
}
~~~
