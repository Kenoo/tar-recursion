/**
 * Created by czt on 2017/10/19.
 */

var fs = require('fs'),
    ini = require('ini'),
    _ = require('lodash'),
    json2xls = require('json2xls'),
    mysql = require('./mysql'),
    obj = {
        
        toMysql (data) {
            let current = this;
            let columns = ['device', 'title', 'name', 'type', 'sid',
                'version', 'username', 'path', 'time', 'timeZone',
                'userAgent', 'product', 'action'
            ];
            mysql.connect();
            _.forEach(data, function (obj) {
                let json = current._parseItemData(
                    ini.parse(fs.readFileSync(obj['path'], 'utf-8'))
                );
                let mysql_data = [];
                for (let i = 0; i < json.length; i++) {
                    switch (json[i].type) {
                        case 'setup': {
                            let item = [
                                obj.name,          //device
                                '初始化',            //title
                                json[i]['data0'],   //name
                                json[i].type,       //type
                                json[i]["data5"],   //sid
                                json[i]["data1"],   //version
                                json[i]["data3"],   //username
                                '',                 //path
                                json[i]["data6"],   //time
                                '',                 //timeZone,缺失
                                json[i]["data4"],   //userAgent
                                'AF',               //product
                                '',                 //action
                            ];
                            mysql_data.push(item);
                            break;
                        }
                        case 'event': {
                            if ( json[i]['data0'] === 'click') {
                                let item = [
                                    obj.name,          //device
                                    json[i]['data2'],   //title
                                    json[i]['data3'] + '|' + json[i]['data1'],   //name
                                    json[i]['type'],    //type
                                    json[i]["data5"],   //sid
                                    '',                 //version
                                    '',                 //username
                                    json[i]["data4"],   //path
                                    json[i]["data6"],   //time
                                    '',                 //timeZone,缺失
                                    '',                 //userAgent
                                    'AF',               //product
                                    json[i]['data0'],   //action
                                ];
                                mysql_data.push(item);
                            } else {
                                let item = [
                                    obj.name,          //device
                                    json[i]['data2'],   //title
                                    json[i]['data1'],   //name
                                    json[i]['type'],    //type
                                    json[i]["data4"],   //sid
                                    '',                 //version
                                    '',                 //username
                                    json[i]["data3"],   //path
                                    json[i]["data5"],   //time
                                    '',                 //timeZone,缺失
                                    '',                 //userAgent
                                    'AF',               //product
                                    json[i]['data0'],   //action
                                ];
                                mysql_data.push(item);
                            }
                            
                            break;
                        }
                        case 'exception': {
                            let item = [
                                obj.name,          //device
                                json[i]['data1'],   //title
                                json[i]['data0'],   //name
                                json[i].type,       //type
                                json[i]["data2"],   //sid
                                '',                 //version
                                '',                 //username
                                '',                 //path
                                json[i]["data3"],   //time
                                '',                 //timeZone,缺失
                                '',                 //userAgent
                                'AF',               //product
                                'ajax',             //action
                            ];
                            mysql_data.push(item);
                            break;
                        }
                        case 'pageview': {
                            let item = [
                                obj.name,          //device
                                json[i]['data1'],   //title
                                json[i]["data2"],   //name
                                json[i]['type'],       //type
                                json[i]["data3"],   //sid
                                '',                 //version
                                '',                 //username
                                json[i]['data0'],   //path
                                json[i]["data4"],   //time
                                '',                 //timeZone,缺失
                                '',                 //userAgent
                                'AF',               //product
                                '',                 //action
                            ];
                            mysql_data.push(item);
                            break;
                        }
                        case 'task': {
                            let item = [
                                obj.name,          //device
                                json[i]['data0'],   //title
                                json[i]["data0"],   //name
                                json[i]['type'],    //type
                                json[i]["data3"],   //sid
                                '',                 //version
                                '',                 //username
                                json[i]['data2'],   //path
                                json[i]["data4"],   //time
                                '',                 //timeZone,缺失
                                '',                 //userAgent
                                'AF',               //product
                                json[i]['data1'],   //action
                            ];
                            mysql_data.push(item);
                            break;
                        }
                    }
                }
                mysql.insert('analytics', columns.join(','), mysql_data);
            });
            mysql.end();
        },
        
        toXls (path, data) {
            for (var i = 0; i < data.length; i++) {
                let json = ini.parse(fs.readFileSync(data[i]['path'], 'utf-8'));
                let xls = json2xls(this._parseItemData(json));
                fs.writeFileSync(
                    path + '/' + data[i]['name'] + '_' + data[i]['date'] + '.xls',
                    xls, 'binary'
                );
            }
        },
        
        _parseItemData (json) {
            let data = [];
            _.forEach(json, function (value, key) {
                if (key.indexOf('record') > -1) {
                    data.push(value)
                }
            });
            return data;
        }
    };

module.exports = obj;
