/**
 * Created by czt on 2017/10/18.
 */

var inputPath = __dirname + "/input";
var destPath = __dirname + '/input';
var xlsPath = __dirname + '/output';
var tar_lib = require('./lib/tar');
var ini_lib = require('./lib/ini');
var mysql_lib = require('./lib/mysql');

//获取第一层 tar文件列表。
let tar_list = tar_lib.list_l1_tar(inputPath);


let doFn = function (filePath) {
    //解压
    tar_lib.tar(filePath, destPath, function () {
        var data = tar_lib.extract(destPath); //获取所有ini文件
        var fn = function (mid) { //每个ini文件读取
            mid = mid && mid [0] || null;
            if (mid) {
                tar_lib.tar(mid.src, mid.dst, function () {
                    fn (data.splice(0, 1));
                });
            } else {
                ini_lib.toMysql(tar_lib.ini(destPath));
                //ini_lib.toXls(xlsPath, tar_lib.ini(destPath));
            }
        };
        fn (data.splice(0, 1));
    });
};

//每个tar进行解压处理。
tar_list.forEach(function (file) {
    doFn(file);
});



