import axios from 'axios';

const host = 'http://10.12.222.51:3000/api';

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
  }).catch((error) => {
    return [];
  });
};

export const sendSong = (id, playlist) => {
  return axios.post(host + '/song', {
    songId: id,
    playlistId: playlist
  }).then((response) => {
    return response.status == 200;
  }).catch((error) => {
    return false;
  });
};

export const getSongs = (playlistId) => {
  return axios.post(host + '/group/songs', {
    playlistId: playlistId
  }).then((response) => {
    console.log(response.data);
    return response.data;
  }).catch((error) => {
    console.log("Error");
    return [];
  });
};

export const voteSong = (songId, playlistId, vote) => {
  axios.post(host + '/put/songs', {
    songId: songId,
    playlistId: playlistId,
    vote: vote
  }).then((response) => {
    return response.status == 200;
  }).catch((error) => {
    return false;
  });
};
