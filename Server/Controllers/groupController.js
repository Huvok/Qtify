var dbManager = require("./dbModule.js");

module.exports = {
    getGroups : function(req, res) {
        let conn = dbManager.newConnection();
        conn.query('SELECT id, group_name FROM groups', function(err, results, fields) {
            if (err)
                console.log(err);
            else
                res.send(JSON.stringify(results));
            dbManager.closeConnection(conn);
        });
    },

    postSongsFromGroup : function(req, res) {
        var body = req.body;
        var groupId = body['groupId'];
        
        let conn = dbManager.newConnection();
        conn.query('SELECT song_id FROM groups_songs WHERE group_id = ?', [groupId], function (err, results, fields) {
            if (err)
                console.log(err);
            else
                res.send(JSON.stringify(results));
            dbManager.closeConnection(conn);
        });
    },

    postUserToGroup : function(req, res) {
        var body = req.body;
        var userId = body['userId'];
        var groupId = body['groupId'];

        let query = 'SELECT * FROM users WHERE id = ?';
        let conn = dbManager.newConnection();
        conn.query(query, userId, function (err, results, field) {
            if (err) {
                console.log(err);
                dbManager.closeConnection(conn);
            }
            else {
                let success = true;
                if (results.length == 0) {
                    success = postUser(conn, userId);
                }
                if (success) {
                    query = 'INSERT INTO users_groups VALUES (?, ?);';
                    conn.query(query, [userId, groupId], function (err, results, fields) {
                        if (err)
                            console.log(err);
                        else
                            res.send(JSON.stringify({ results: "OK" }));
                        dbManager.closeConnection(conn);
                    });
                }
            }
        });
    },

    postUser : function(req, res) {
        var body = req.body;
        var userId = body['userId'];
        let conn = dbManager.newConnection();
        if (postUser(conn, userId))
            res.send(JSON.stringify({ response: 'OK' }));
        dbManager.closeConnection(conn);
    }
}

function postUser(conn, userId) {
    conn.query('INSERT INTO users VALUES(?);', [userId], function(err, results, fields) {
        if (err) {
            console.log(err);
            return false;
        }
        return true;
    });
}