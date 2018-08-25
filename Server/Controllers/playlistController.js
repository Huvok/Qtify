var axios = require('axios');

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
            name: "Test",
            public: false,
            collaborative: true
        }, config)
        .then(function (response) {
            res.send(JSON.stringify({
                response: 'Playlist created'
            }));
        })
        .catch(function (error) {
            res.send(JSON.stringify({
                response: error
            }));
        });
    }
}