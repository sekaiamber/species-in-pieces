/**
 * 这个脚本会将convertSvg2Json.js输出的Json文件数据中的图片，变为800*800的大小，并且将图片数据居中
 */

var fs = require('fs');
var path = require('path');

var INPUT_FOLDER = __dirname + '/out_images';
var OUTPUT_FOLDER = __dirname + '/out_images';

var WIDTH = 800;
var HEIGHT = 800;

var files = fs.readdirSync(INPUT_FOLDER);
files = files.filter(function(filename) {
  return path.extname(filename) === '.json';
});

if (!fs.existsSync(OUTPUT_FOLDER)) {
  fs.mkdirSync(OUTPUT_FOLDER);
}

for (var i = 0; i < files.length; i++) {
  var filename = files[i];
  var filecontent = JSON.parse(fs.readFileSync(INPUT_FOLDER + '/' + filename, 'utf8'));
  
  var widthFix = (WIDTH - filecontent.width) / 2;
  var heightFix = (HEIGHT - filecontent.height) / 2;
  filecontent.width = WIDTH;
  filecontent.height = HEIGHT;

  for (var j = 0; j < filecontent.polygons.length; j++) {
    var points = filecontent.polygons[j].points;
    points[0] += widthFix;
    points[1] += heightFix;
    points[2] += widthFix;
    points[3] += heightFix;
    points[4] += widthFix;
    points[5] += heightFix;
  }

  fs.writeFileSync(OUTPUT_FOLDER + '/' + filename, JSON.stringify(filecontent));
  console.log(filename + ' done.');
}
