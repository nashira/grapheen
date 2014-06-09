var GraphView = require('./src/graph_view.js');
var Parser = require('./src/parser.js');

module.exports = {
  GraphView: GraphView,
  Parser: Parser,
  insFiles: function (directory) {
    var fs = require('fs');
    var path = require('path');
    var p = new Parser();
    var files = fs.readdirSync(directory);
    var source = '';
    for (var i = 0; i < files.length; i++) {
      var infile = path.join(directory, files[i])
      var out = path.join(directory, 'ins', files[i]);
      var stat = fs.statSync(infile);
      if (stat.isFile()) {
        source = fs.readFileSync(infile, 'utf8');
        p.parse(source);
        // console.log(p)
        var modSource = p.instrument('window.ins_enter', 'window.ins_exit');
        console.log(out)
        fs.writeFileSync(out, modSource);
      }
    }
  }
}
