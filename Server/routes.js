var express = require('express');
var playlistCtrl = require('./Controllers/playlistController.js');
var groupCtrl = require('./Controllers/groupController.js');

var router = express.Router();

router.route('/playlist').post(playlistCtrl.postPlaylist);
router.route('/group').get(groupCtrl.getGroups);
router.route('/group/songs').post(groupCtrl.postSongsFromGroup);

module.exports = router;