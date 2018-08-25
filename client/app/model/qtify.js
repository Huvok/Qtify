import axios from 'axios';

const host = 'http://131.178.201.53:3000/api';

export const createPlaylist = (userid, name, token) => {
  return axios.post(host + '/playlist', {
    userId: userid,
    playlistName: name,
    authToken: token
  }).then((response) => {
    return response.status == 200;
  }).catch((error) => {
    return false;
  });
};

export const getPlaylists = () => {
  return axios.get(host + '/group').then((playlists) => {
    return playlists.data;
  });
};

export const sendSong = (id, playlist) => {
  return axios.post(host + '/group', {
    songId: id,
    playlistId: playlist
  }).then((response) => {
    return response.status == 200;
  });
};
