import axios from 'axios';

const host = 'https://api.spotify.com/v1';

export const searchSongs = (song, token) => {
  return axios.get(host + '/search', {
    params: {
      q: song,
      type: 'track'
    },
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then((response) => {

    console.log(response.data);

    let songs = [];

    const uriToId = (uri) => {
      return uri.split(':').pop();
    };

    response.data.tracks.items.forEach((track) => {
      songs.push({
        id: uriToId(track.uri),
        artist: track.artists[0].name,
        name: track.name,
        img: track.album.images[2].url
      });
    });

    return songs;
  }).catch((error) => {
    console.log(error);
    return [];
  });
};

export const getSong = (id, token) => {
  return axios.get(host + '/tracks/' + id, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then((response) => {
    return {
      id: id,
      artist: response.data.artists[0].name,
      name: response.data.name,
      img: response.data.album.images[2].url
    };
  }).catch((error) => {
    return {};
  });
};

export const getUserId = (token) => {
  return axios.get(host + '/me', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  }).then((response) => {
    console.log(response.data);
    return response.data.id;
  }).catch((error) => {
    console.log(error);
    return '';
  });
};
