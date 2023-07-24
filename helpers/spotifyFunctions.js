import { prepareAuth } from "./spotifyAuth";

export function search(text, option) {
  const params = new URLSearchParams({
    q: `${option}:${text}`,
    type: 'track',
    market: 'AU',
    limit: 20
  });

  return prepareAuth()
    .then(authValid => {
      if (!authValid) {
        throw new Error('Auth failed');
      }
      const accessToken = localStorage.getItem('access_token');
      return fetch('https://api.spotify.com/v1/search?' + params, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      return data.tracks.items.map(res => ({
        name: res.name,
        artists: res.artists.map(a => a.name).join(', '),
        album: res.album.name,
        id: res.id,
        uri: res.uri
      }))
    })
}

// Writing the playlist to a user's account requires three steps
// 1. Get the Spotify user ID
// 2. Create a new (empty) playlist
// 3. Add songs to the playlist
export function savePlaylist(name, tracklist) {
  let accessToken;
  return prepareAuth()
    .then(authValid => {
      if (!authValid) {
        throw new Error('Auth failed');
      }
      accessToken = localStorage.getItem('access_token');
      return fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(userData => {
      console.log(userData);
      const userId = userData.id;
      // Create playlist using user id
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: 'Created with Groovy Playlist',
          public: false
        })
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(playlistData => {
      console.log(playlistData);
      const playlistId = playlistData.id;
      const uris = tracklist.map(t => t.uri);
      // Add songs from tracklist to the new playlist
      return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: uris,
          position: 0
        })
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
}

export default {
  search,
  savePlaylist
};