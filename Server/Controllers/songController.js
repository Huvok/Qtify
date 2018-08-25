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

        conn.query('SELECT token FROM groups WHERE id = ?', [playlistId], function(err, results, fields) {
            if (err)
                console.log(err);
            else {
                var authToken = results[0]['token'];

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
                                        postSongToGroup(songId, playlistId, authToken);
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
                            postSongToGroup(songId, playlistId, authToken);
                            res.send(JSON.stringify({
                                response: 'OK'
                            }));
                        }
                    }
                });
            }
        });
    },
    putSong : function(req, res) {
        var songId = req.body['songId'];
        var playlistId = req.body['playlistId'];
        var vote = req.body['vote'];

        conn.query('UPDATE groups_songs SET votes = votes + ? WHERE group_id = ? AND song_id = ?', [vote, playlistId, songId],
            function(err, results, fields) {
            if (err)
                console.log(err);
            else {
                console.log('Vote received');
                res.send(JSON.stringify({
                    response: 'Vote received'
                }));
            }
        });
    }
}

function postSongToGroup(songId, playlistId, authToken) {
    conn.query('INSERT INTO groups_songs(group_id, song_id, votes) VALUES(?, ?, ?)', [playlistId, songId, 1],
        function(err, results, fields) {
        if (err)
            console.log(err);
        else {
            console.log('Song proposed');
            setTimeout(function() {
                conn.query('SELECT * FROM groups_songs WHERE group_id = ? AND song_id = ?', [playlistId, songId], function(err, results, fields) {
                    if (err)
                        console.log(err);
                    else {
                        if (results[0]['votes'] >= 0) {

                            var config = {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + authToken
                                }
                            };
                    
                            axios.post('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
                                uris: ["spotify:track:" + songId]
                            }, config);

                            conn.query('DELETE FROM groups_songs WHERE group_id = ? AND song_id = ?', [playlistId, songId],
                                function(err, results, fields) {
                                if (err)
                                    console.log(err);
                            });
                        } else {
                            conn.query('DELETE FROM groups_songs WHERE group_id = ? AND song_id = ?', [playlistId, songId],
                                function(err, results, fields) {
                                if (err)
                                    console.log(err);
                            });
                        }
                    }
                });
            }, 10000);
        }
    });
}