var express = require('express');
var playlistCtrl = require('./Controllers/playlistController.js');
var songCtrl = require('./Controllers/songController.js');
var groupCtrl = require('./Controllers/groupController.js');

var router = express.Router();

router.route('/playlist').post(playlistCtrl.postPlaylist);
router.route('/song').post(songCtrl.postSong);
router.route('/song').put(songCtrl.putSong);
router.route('/group').get(groupCtrl.getGroups);
router.route('/group/songs').post(groupCtrl.postSongsFromGroup);
router.route('/group/user').post(groupCtrl.postUserToGroup);
router.route('/user').post(groupCtrl.postUser);

module.exports = router;