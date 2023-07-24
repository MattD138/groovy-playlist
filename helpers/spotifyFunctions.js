const baseUrl = 'https://api.spotify.com/v1/'

export function search(text, option) {
  const accessToken = localStorage.getItem('access_token');

  const params = new URLSearchParams({
    q: `${option}:${text}`,
    type: 'track',
    market: 'AU',
    limit: 20
  });

  const response = fetch('https://api.spotify.com/v1/search?' + params, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
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

  return response;
}

export default {
  search
};