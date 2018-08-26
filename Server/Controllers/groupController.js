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
            else
                res.send(JSON.stringify(results));
        });
    },

    postUserToGroup : function(req, res) {
        var body = req.body;
        var userId = body['userId'];
        var groupId = body['groupId'];

        let query = 'SELECT * FROM users WHERE id = ?';
        conn.query(query, userId, function (err, results, field) {
            if (err)
                console.log(err);
            else {
                let success = true;
                if (results.length == 0) {
                    success = postUser(userId);
                }
                if (success) {
                    query = 'INSERT INTO users_groups VALUES (?, ?);';
                    conn.query(query, [userId, groupId], function (err, results, fields) {
                        if (err)
                            console.log(err);
                        else
                            res.send(JSON.stringify({ results: "OK" }));
                    });
                }
            }
        });
    },

    postUser : function(req, res) {
        var body = req.body;
        var userId = body['userId'];
        if (postUser(userId))
            res.send(JSON.stringify({ response: 'OK' }));
    }
}

function postUser(userId) {
    conn.query('INSERT INTO users VALUES(?);', [userId], function(err, results, fields) {
        if (err) {
            console.log(err);
            return false;
        }
        return true;
    });
}