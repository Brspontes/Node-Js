var mysql = require('mysql');

var conMySQL = function(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'portalnoticias'
    });  
}

module.exports = function(){
    return conMySQL;
}

