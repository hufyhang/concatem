#!/usr/bin/env node
if (process.argv[2] === '--example') {
  console.log('{\n\
  "define": {\n\
\n\
    "header": "header.txt",\n\
    "copyright": {"text": "All rights reserved by me."}\n\
\n\
  },\n\
\n\
  "concat": {\n\
\n\
    "dist": {\n\
      "src": ["*.txt"],\n\
      "dest": "./dist/"\n\
    }\n\
\n\
  }\n\
}');
  process.exit(0);
}

var DIR = process.cwd();
var CONFIG_FILE = 'config.js';
var PLACEHOLDER_HEAD = '<!--concatem:';
var PLACEHOLDER_END = '-->';

var colors = require('colors');
var mkdirp = require("mkdirp");
var fs = require('fs');
var glob = require('glob');
var path = require('path');

var targets = [];

for (var i = 2; i < process.argv.length; ++i) {
  targets.push(process.argv[i]);
}

// check is current folder has config.js
var hasConfig = fs.existsSync(path.join(DIR, CONFIG_FILE));
if (!hasConfig) {
  console.error('Fatal: could not find config.js file.'.bold.red);
  process.exit(0);
}

// read in config.js
var config = fs.readFileSync(path.join(DIR, CONFIG_FILE), 'utf-8');
config = JSON.parse(config);

var defines = {};

// read all defines
for (var item in config.define) {
  var value = config.define[item];
  // filenames should be string
  if (typeof value === 'string' && fs.existsSync(path.join(DIR, value))) {
    defines[item] = fs.readFileSync(path.join(DIR, value), 'utf-8');
  }
  // raw text should be kept in object with key name "text"
  else if (typeof value === 'object') {
    defines[item] = config.define[item].text || '';
  }
}

var concat = config.concat;
if (concat === undefined) {
  console.error('Fatal: concat configuration is missing in config.js.');
  process.exit(0);
}

if (targets.length !== 0) {
  targets.forEach(function (target) {
    processGroup(target);
  });

}
else {
  for (var group in concat) {
    processGroup(group);
  }
}

console.log('Finished.'.bold.green);

function processGroup (group) {
  if (concat[group] === undefined) {
    return;
  }

  var src = concat[group].src;
  src.forEach(function (item) {
    // use glob lib to match wildcards
    glob(path.join(DIR, item), function (err, files) {
      files.forEach(function (file) {
        var pathname = path.dirname(file).replace(DIR, '');
        var basename = path.basename(file);
        var baseext = path.extname(file);
        var extension = concat[group].extension || path.extname(file);
        if (extension[0] !== '.') {
          extension = '.' + extension;
        }
        basename = basename.replace(baseext, '');

        var output = path.join(DIR, concat[group].dest, pathname, basename + extension);

        var content = fs.readFileSync(file, 'utf-8');
        // replace placeholders with predefined values
        for (var name in defines) {
          var reg = new RegExp(PLACEHOLDER_HEAD + name + PLACEHOLDER_END, 'g');
          content = content.replace(reg, defines[name]);
        }

        writeFile(output, content);

      });
    });

  });
}

function writeFile (filename, content) {
  mkdirp(path.dirname(filename), function (err) {
    if (err) {
      console.error(err.red);
      return;
    } else {
      // replace placeholders with predefined values
      for (var name in defines) {
        var reg = new RegExp(PLACEHOLDER_HEAD + name + PLACEHOLDER_END, 'g');
        content = content.replace(reg, defines[name]);
      }

      fs.writeFileSync(filename, content);
      console.log('Generated '.bold.green + filename.blue);
    }
  });
}