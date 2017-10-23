/**
 * Created by czt on 2017/10/19.
 */

var fs = require('fs'),
    ini = require('ini');

var config = ini.parse(fs.readFileSync('../input/1.ini', 'utf-8'));
