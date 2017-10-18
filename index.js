/**
 * Created by czt on 2017/10/18.
 */

var filePath = __dirname + "/input/2.tar";
var destPath = __dirname + '/input/result';
let uea = require('./lib/tar-recursion');
//uea.extract(filePath, destPath);
var files = uea.ls(destPath + '/matrix/data/dev_proxy/file_data');
console.log(files);