/**
 * Created by czt on 2017/10/18.
 */

var fs = require("fs"),
    tar = require('tar'),
    path = require("path");

var obj = {
    
    /**
     * 列举第1层所有tar进行解压
     */
    list_l1_tar (dir = '.') {
        var files = fs.readdirSync(dir),
            data = [];
        for (var f in files) {
            var name = dir + path.sep + files[f];
            var stat = fs.lstatSync(name);
            if (stat.isDirectory() !== true) {
                data.push(name);
            }
        }
        return data;
    },
    
    extract (dir = '.') {
        var files = fs.readdirSync(dir),
            data = [];
        for (var f in files) {
            var name = dir + path.sep + files[f];
            var stat = fs.lstatSync(name);
            if (stat.isDirectory() === true) {
                data = data.concat(this.extract(name));
            } else {
                data.push({src: name, dst: dir});
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
                        path: name,
                        date: name.match(/\\(\d+)/)[1],
                        name: name.match(/\\(\w+)\\often/)[1]
                    });
                }
            }
        }
        return data;
    }
};

module.exports = obj;

