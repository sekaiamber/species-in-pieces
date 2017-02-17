var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');

var INPUT_FOLDER = __dirname + '/images';
var OUTPUT_FOLDER = __dirname + '/out_images';

var parser = new xml2js.Parser();
var files = fs.readdirSync(INPUT_FOLDER);
files = files.filter(function(filename) {
  return path.extname(filename) === '.svg';
});

if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER);
}

for (var i = 0; i < files.length; i++) {
  var filecontent = fs.readFileSync(INPUT_FOLDER + '/' + files[i], 'utf8');
  parser.parseString(filecontent, function (err, result) {
    var svg = result.svg;
    var outJson = {
      width: parseInt(svg.$.width),
      height: parseInt(svg.$.height),
      background: svg.rect[0].$.fill,
      polygons: [],
    };
    var transform = svg.g[0].$.transform;
    var scale = parseFloat(/scale\((.+?)\)/ig.exec(transform)[1]);
    var translate = /translate\((.+?)\)/ig.exec(transform)[1].split(/[ ,]/).map(function(t) { return parseFloat(t) });
    outJson.polygons = svg.g[0].polygon.map(function(polygon) {
      var attrs = polygon.$;
      attrs.points = attrs.points.split(' ');
      attrs.points = attrs.points.map(function(point) {
        point = point.split(',').map(function(p) { return parseFloat(p) });
        point[0] -= translate[0];
        point[1] -= translate[1];
        point[0] *= scale;
        point[1] *= scale;
        return point;
      });
      attrs.points = [].concat.apply([], attrs.points);
      attrs['fill-opacity'] = attrs['fill-opacity'] ? parseFloat(attrs['fill-opacity']) : 1;
      return attrs;
    });
    fs.writeFileSync(OUTPUT_FOLDER + '/' + files[i] + '.json', JSON.stringify(outJson));
    console.log(files[i] + ' done.');
  });
}
