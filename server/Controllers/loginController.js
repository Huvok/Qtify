var request = require('request');
var dbManager = require('./dbModule.js');
var config = require("../config.js");

var client_id = config.client.id; // Your client id
var client_secret = config.client.secret; // Your secret

module.exports = {
  postLogin : function(req, res) {
    var body = req.body;
    var userId = body['userId'];
    var accessToken = body['accessToken'];
    var refreshToken = body['refreshToken'];

    let conn = dbManager.newConnection();
    conn.query('INSERT INTO users VALUES (?, ?, ?);', [userId, accessToken, refreshToken], function(err, results, fields) {
      if (err)
        console.log(err);
      else
        res.send(JSON.stringify({ results: "OK" }));
      dbManager.closeConnection(conn);
    });

    // Executes a function that refreshes the access token every 3300000 ms (= 55 minutes).
    setInterval(function() {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        data: {}
      };

      console.log()

      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (error || response.statusCode != 200)
          console.log(error);
        else {
          let newAccessToken = body.access_token;
          let conn = dbManager.newConnection();
          conn.query('UPDATE users SET token = ? WHERE id = ?', [newAccessToken, userId], function (err, results, fields) {
            if (err)
              console.log(err);
            else
              console.log("Access Token Refreshed!");
            dbManager.closeConnection(conn);
          });
        }
      });
    }, 3300000);
  },

  retrieveTokenFromPlaylist : function(playlistId) {
    let conn = dbManager.newConnection();
    let query = 'SELECT token FROM groups G JOIN users U ON G.user_owner = U.id WHERE G.id = ?';
    conn.query(query, [playlistId], function(err, results, fields) {
      if (err) {
        console.log(err);
        return null;
      }
      else
        return results[0]['token'];
    });
  },

  retrieveTokenFromUser : function(userId) {
    let conn = dbManager.newConnection();
    let query = 'SELECT token FROM users WHERE id = ?';
    conn.query(query, [userId], function(err, results, fields) {
      if (err) {
        console.log(err);
        return null;
      }
      else
        return results[0]['token'];
    });
  } 
}