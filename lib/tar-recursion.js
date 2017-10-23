/**
 * Created by czt on 2017/10/18.
 */

var fs = require("fs"),
    tar = require('tar'),
    path = require("path");

var obj = {
    extract (dir = '.') {
        var files = fs.readdirSync(dir),
            data = [];
        for (var f in files) {
            var name = dir + path.sep + files[f];
            var stat = fs.lstatSync(name);
            if (stat.isDirectory() === true) {
                data = data.concat(this.extract(name));
            } else {
                data.push({src : name, dst : dir});
            }
        }
        return data;
    },

    tar (filePath, destPath, cb) {
        var res = fs.createReadStream(filePath).pipe(
            tar.x({
                strip: 1,
                C: destPath
            })
        );
        res.on('end', function () {
            cb && cb();
        });
    },

    ini (dir = '.') {
        var files = fs.readdirSync(dir),
            data = [];
        for (var f in files) {
            var name = dir + path.sep + files[f];
            var stat = fs.lstatSync(name);
            if (stat.isDirectory() === true) {
                data = data.concat(this.ini(name));
            } else {
                if (/\.ini$/.test(name)) {
                    data.push({
                        path : name
                    });
                }
            }
        }
        return data;
    }
};

module.exports = obj;

