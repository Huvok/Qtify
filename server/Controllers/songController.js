var axios = require('axios');
var dbManager = require('./dbModule.js');
var loginCtrl = require('./loginController.js');

module.exports = {
    postSong : function(req, res) {
        var songId = req.body['songId'];
        var playlistId = req.body['playlistId'];
        loginCtrl.retrieveTokenFromPlaylist(playlistId).then((authToken) => {
          let conn = dbManager.newConnection();
          conn.query('SELECT * FROM songs WHERE id = \'' + songId + '\'', function(err, results, fields) {
              if (err) {
                  console.log(err);
                  dbManager.closeConnection(conn);
              } else {
                postSongToGroup(conn, songId, playlistId, authToken);
                res.send(JSON.stringify({
                    response: 'OK'
                }));
                dbManager.closeConnection(conn);
              }
          });
        });
    },

    putSong : function(req, res) {
        var songId = req.body['songId'];
        var playlistId = req.body['playlistId'];
        var vote = req.body['vote'];
        let conn = dbManager.newConnection();

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
            dbManager.closeConnection(conn);
        });
    }
}

function postSongToGroup(conn, songId, playlistId, authToken) {
    conn.query('INSERT INTO groups_songs(group_id, song_id, votes) VALUES(?, ?, ?)', [playlistId, songId, 1],
        function(err, results, fields) {
        if (err)
            console.log(err);
        else {
            console.log('Song proposed');
            setTimeout(function() {
                let conn = dbManager.newConnection();
                conn.query('SELECT * FROM groups_songs WHERE group_id = ? AND song_id = ?', [playlistId, songId], function(err, results, fields) {
                    if (err)
                        console.log(err);
                    else {
                        console.log(results);
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

                                dbManager.closeConnection(conn);
                            });
                        } else {
                            conn.query('DELETE FROM groups_songs WHERE group_id = ? AND song_id = ?', [playlistId, songId],
                                function(err, results, fields) {
                                if (err)
                                    console.log(err);

                                dbManager.closeConnection(conn);
                            });
                        }
                    }
                });
            }, 60000);
        }

        dbManager.closeConnection(conn);
    });
}
