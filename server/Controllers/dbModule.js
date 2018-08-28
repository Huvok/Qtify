var mysql = require('mysql2');
const config = require('../config.js');

module.exports = {
    newConnection : function() {
        let conn = mysql.createConnection(config.db);
        conn.connect(function(err) {
        if (err)
            console.log("Cannot connect to the database");
        else
            console.log("Connection to the database established");
        });
        return conn;
    },

    closeConnection : function (conn) {
        conn.end(function (err) {
            if (err)
                console.log(err);
            else
                console.log("Closing connection.");
        });
    }
}
