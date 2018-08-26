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
    postPlaylist : function(req, res) {
        var body = req.body;
        var userId = body['userId'];
        var authToken = body['authToken'];
        var playlistName = body['playlistName'];

        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        };

        axios.post('https://api.spotify.com/v1/users/' + userId + '/playlists', {
            name: playlistName,
            public: false,
            collaborative: true
        }, config)
        .then(function (response) {
            let query = 'INSERT INTO groups (id, group_name, token) VALUES (?, ?, ?);';
            conn.query(query, [response.data['id'], playlistName, authToken], function (err, results, fields) {
                if (err)
                    console.log(err);
                else {
                    query = 'INSERT INTO users_groups VALUES (?, ?);';
                    conn.query(query, [userId, response.data['id']], function (err, results, fields) {
                        if (err)
                            console.log(err);
                        else
                            res.send(JSON.stringify({
                                response: 'OK'
                            }));
                    });
                }
            });
        })
        .catch(function (error) {
            console.log(error);
            res.send(JSON.stringify({
                response: 'error'
            }));
        });
    }
}