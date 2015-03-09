var fs = require('fs');
var _each = require('amp-each');
var jsonData = fs.readdirSync('./data');
var file = './dist/index.js';

fs.appendFile(file,
  'module.exports = {\n' +
  '  airports: [\n'
  , function (err) {
    'use strict';
  if (err){
    throw err;
  }
});

var writeJsonData = function(cb){
  _each(jsonData, function(item, index){
    'use strict';
    if (jsonData.length !== index+1){
      fs.appendFile(file, '    require("./../data/'+item+'"),\n', function (err) {
        if (err){
          throw err;
        }
      });
    }else {
      fs.appendFile(file, '    require("./../data/'+item+'")\n', function (err) {
        if (err){
          throw err;
        }
      });
    }
  });
  cb();
};

writeJsonData(function(){
  'use strict';
  fs.appendFile(file,
  '  ]\n' +
  '};\n'
  , function (err) {
      if (err){
        throw err;
      }
  });
});
