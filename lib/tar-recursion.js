/**
 * Created by czt on 2017/10/18.
 */

var fs = require("fs"),
    tar = require('tar'),
    path = require("path");


const obj = {
    ls: function (dir = '.') {
        var files = fs.readdirSync(dir);
        for (var f in files) {
            var name = dir + path.sep + files[f];
            var stat = fs.lstatSync(name);
            if (stat.isDirectory() == true) {
                this.ls(name);
            }
            else {
                this.extract(name, dir);
            }
        }
    },

    read : function () {

    },

    extract: function (filePath, destPath) {
        fs.createReadStream(filePath).pipe(
            tar.x({
                strip: 1,
                C: destPath
            })
        );
    }
};

module.exports = obj;

