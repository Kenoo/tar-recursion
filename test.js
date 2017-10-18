/**
 * Created by czt on 2017/10/18.
 */

var fs = require("fs"),
    unzip = require('unzip'),
    pth = require("path");

fs.createReadStream('./input/1.zip')
    .pipe(unzip.Parse())
    .on('entry', function (entry) {
        var fileName = entry.path;
        var type = entry.type; // 'Directory' or 'File'
        var size = entry.size;
        if (fileName === "this IS the file I'm looking for") {
            entry.pipe(fs.createWriteStream('output/path'));
        } else {
            entry.autodrain();
        }
    });