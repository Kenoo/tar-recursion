/**
 * Created by czt on 2017/10/18.
 */

var filePath = __dirname + "/input/2.tar";
var destPath = __dirname + '/input/result';
var uea = require('./lib/tar-recursion');
uea.tar(filePath, destPath, function () {
    var data = uea.extract(destPath);
    var fn = function (mid) {
            mid = mid && mid [0] || null;
            if (mid) {
                uea.tar(mid.src, mid.dst, function () {
                    fn (data.splice(0, 1));
                });
            } else {
                var ini_data =  uea.ini(destPath);
                console.log(ini_data);
            }
        };
    fn (data.splice(0, 1));
});
