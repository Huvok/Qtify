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
    postSong : function(req, res) {
        var songId = req.body['songId'];
        var playlistId = req.body['playlistId'];
        var authToken = req.body['authToken'];

        conn.query('SELECT * FROM songs WHERE id = \'' + songId + '\'', function(err, results, fields) {
            if (err)
                console.log(err);
            else {
                if (results.length == 0) {
                    var config = {
                        headers: {
                            'Authorization': 'Bearer ' + authToken
                        }
                    };

                    axios.get('https://api.spotify.com/v1/tracks/' + songId, config).then(function(response) {
                        var songName = response.data['name'];
                        var artist = response.data['artists'][0]['name'];
                        var imageUrl = response.data['album']['images'][0]['url'];
                        
                        conn.query('INSERT INTO songs(id, song_name, artist, image_url) VALUES(?, ?, ?, ?)', [songId, songName, artist, imageUrl],
                            function(err, results, fields) {
                            if (err)
                                console.log(err);
                            else {
                                console.log('Song inserted');
                                postSongToGroup(songId, playlistId);
                                res.send(JSON.stringify({
                                    response: 'OK'
                                }));
                            }
                        });
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                } else {
                    postSongToGroup(songId, playlistId);
                    res.send(JSON.stringify({
                        response: 'OK'
                    }));
                }
            }
        });
    }
}

function postSongToGroup(songId, playlistId) {
    conn.query('INSERT INTO groups_songs(group_id, song_id, votes) VALUES(?, ?, ?)', [playlistId, songId, 1],
        function(err, results, fields) {
        if (err)
            console.log(err);
        else
            console.log('Song proposed');
    });
}