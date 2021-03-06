var axios = require('axios');
var dbManager = require('./dbModule.js');
var loginCtrl = require('./loginController.js');

module.exports = {
    postPlaylist : function(req, res) {
        var body = req.body;
        var userId = body['userId'];
        var playlistName = body['playlistName'];
        loginCtrl.retrieveTokenFromUser(userId).then((authToken) => {
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
              let query = 'INSERT INTO groups (id, group_name, user_owner) VALUES (?, ?, ?);';
              let conn = dbManager.newConnection();
              conn.query(query, [response.data['id'], playlistName, userId], function (err, results, fields) {
                  if (err) {
                      console.log(err);
                      dbManager.closeConnection(conn);
                  } else {
                      query = 'INSERT INTO users_groups VALUES (?, ?);';
                      conn.query(query, [userId, response.data['id']], function (err, results, fields) {
                          if (err)
                              console.log(err);
                          else
                              res.send(JSON.stringify({
                                  response: 'OK'
                              }));

                          dbManager.closeConnection(conn);
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
        });
    }
}
