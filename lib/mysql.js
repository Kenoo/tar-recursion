/**
 * @auth czt
 */

var mysql = require('mysql');

module.exports = {
    
    connect () {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: '3306',
            database: 'uea',
        });
        this.connection.connect();
    },
    end () {
        this.connection.end();
    },
    
    query (table = 'test') {
        let sql = 'select * from ' + table;
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
        });
    },
    muti_insert (data) {
        let current = this;
        this.connection.beginTransaction(function(err) {
            current.insert();
            current.connection.commit(function(err) {
                if (err) {
                    return current.connection.rollback(function() {
                        throw err;
                    });
                }
                console.log('success!');
            });
        });
        
    },
    
    insert (table = 'test', columns = [],  data = []) {
        //var columns = ['name', 'title'].join(',');
       // var addSqlParams = [['a', 'c'], ['b', 'd']];
        var sql = `INSERT INTO ${table}(${columns}) VALUES ?`;
        this.connection.query(sql, [data], function (err) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
    },
    
    create_table (name) {
        var sql = `
        CREATE TABLE IF NOT EXISTS ${name} (
          id INT(11) NOT NULL AUTO_INCREMENT,
          name VARCHAR(45) DEFAULT NULL,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB;
        `;
        this.connection.query(sql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        });
        return name;
    }
    
};

