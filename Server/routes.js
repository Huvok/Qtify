var express = require('express');
var playlistCtrl = require('./Controllers/playlistController.js');

var router = express.Router();

router.route('/playlist').post(playlistCtrl.postPlaylist);

module.exports = router;