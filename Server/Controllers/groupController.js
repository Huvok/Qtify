var axios = require('axios');
var mysql = require('mysql2');

const config = require('../config.js');

const conn = new mysql.createConnection(config.db);
conn.connect(function(err) {
    if (err) {
        console.log("Cannot connect to the database");
    } else {
        console.log("Connection to the database established");
    }
});

module.exports = {
    getGroups : function(req, res) {
        conn.query('SELECT id, group_name FROM groups', function(err, results, fields) {
            if (err)
                console.log(err);
            else
                res.send(JSON.stringify(results));
        });
    },

    postSongsFromGroup : function(req, res) {
        var body = req.body;
        var groupId = body['groupId'];
        
        conn.query('SELECT song_id FROM groups_songs WHERE group_id = ?', [groupId], function (err, results, fields) {
            if (err)
                console.log(err);
            else {
                res.send(JSON.stringify(results));
            }
        });
    }
}