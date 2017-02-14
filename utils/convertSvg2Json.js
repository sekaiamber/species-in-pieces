var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();
var files = fs.readdirSync(__dirname + '/images');
files = files.filter(function(filename) {
  return path.extname(filename) === '.svg';
});

if (!fs.existsSync(__dirname + '/out_images')) {
  fs.mkdirSync(__dirname + '/out_images');
}

for (var i = 0; i < files.length; i++) {
  var filecontent = fs.readFileSync(__dirname + '/images/' + files[i], 'utf8');
  parser.parseString(filecontent, function (err, result) {
    var svg = result.svg;
    var outJson = {
      width: parseInt(svg.$.width),
      height: parseInt(svg.$.height),
      background: svg.rect[0].$.fill,
      polygons: [],
    };
    outJson.polygons = svg.g[0].polygon.map(function(polygon) {
      return polygon.$;
    });
    fs.writeFileSync(__dirname + '/out_images/' + files[i] + '.json', JSON.stringify(outJson));
    console.log(files[i] + ' done.');
  });
}

// fs.readFile(__dirname + '/foo.xml', function (err, data) {
//   parser.parseString(data, function (err, result) {
//     console.dir(result);
//     console.log('Done');
//   });
// });
