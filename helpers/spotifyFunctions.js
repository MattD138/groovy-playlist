import { prepareAuth } from "./spotifyAuth";

export async function getCurrentUserId() {
  return prepareAuth()
    .then(authValid => {
      if (!authValid) {
        throw new Error('Auth failed');
      }
      const accessToken = localStorage.getItem('access_token');
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
      return userData.id;
    })
}

export async function search(text, option) {
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

export async function getUserPlaylists() {
  let accessToken;
  let userId;
  return prepareAuth()
    .then(authValid => {
      if (!authValid) {
        throw new Error('Auth failed');
      }
      accessToken = localStorage.getItem('access_token');
      return getCurrentUserId();
    })
    .then(userIdResponse => {
      userId = userIdResponse;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
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
    .then(playlistData => {
      return playlistData.items
        .filter(p => (
          p.owner.id === userId
        ))
        .map(p => ({
          id: p.id,
          name: p.name
        }));
    })
}

export async function getPlaylist(id) {
  return prepareAuth()
    .then(authValid => {
      if (!authValid) {
        throw new Error('Auth failed');
      }
      const accessToken = localStorage.getItem('access_token');
      return fetch(`https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
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
      console.log(data);
      return data.items.map(obj => ({
        addedAt: obj.added_at,
        name: obj.track.name,
        artists: obj.track.artists.map(a => a.name).join(', '),
        album: obj.track.album.name,
        id: obj.track.id,
        uri: obj.track.uri
      }))
    })
}

// Writing the playlist to a user's account requires three steps
// 1. Get the Spotify user ID
// 2. Create a new (empty) playlist
// 3. Add songs to the playlist
export async function savePlaylist(name, tracks, id) {
  let accessToken;
  return prepareAuth()
    .then(authValid => {
      if (!authValid) {
        throw new Error('Auth failed');
      }
      accessToken = localStorage.getItem('access_token');
      return getCurrentUserId();
    })
    .then(userId => {
      // If id was supplied, update name for the given playlist
      // Else, create a new playlist
      if (id) {
        return fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name
          })
        })
      } else {
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
      }
    })
    .then(response => {
      if (response.status === 200) {
        return; // Contains no body, so response.json() throws an error
      } else if (response.status === 201) {
        return response.json();
      } else {
        throw new Error('HTTP status ' + response.status);
      }
    })
    .then(playlistData => {
      let playlistId;
      if (id) {
        playlistId = id;
      } else {
        playlistId = playlistData.id;
      }
      const uris = tracks.map(t => t.uri);
      // Replace songs in playlist with the given tracklist
      return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
          uris: uris
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
  getUserPlaylists,
  getPlaylist,
  savePlaylist
};