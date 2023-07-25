import { generateRandomString, generateCodeChallenge } from './spotifyAuthHelpers'

const clientId = '56e3609234e04566a1f1a8cc80910270';
const redirectUri = 'http://localhost:3000';

export function requestAuthCode() {
  let codeVerifier = generateRandomString(128);

  generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'playlist-read-private playlist-modify-public playlist-modify-private';

    localStorage.setItem('code_verifier', codeVerifier);

    const args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });

    window.location = 'https://accounts.spotify.com/authorize?' + args;
  })
}

export async function requestAccessToken(code) {
  let codeVerifier = localStorage.getItem('code_verifier');

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier
  });

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      const tokenExpiry = new Date().getTime() + 3600 * 1000;
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('access_token_expiry', tokenExpiry)
      localStorage.setItem('refresh_token', data.refresh_token)
    })
}

export async function refreshAccessToken() {
  let refreshToken = localStorage.getItem('refresh_token');

  let body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: clientId,
    refresh_token: refreshToken
  });

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      const tokenExpiry = new Date().getTime() + 3600 * 1000;
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('access_token_expiry', tokenExpiry)
      localStorage.setItem('refresh_token', data.refresh_token)
      console.log('Done refreshing access token')
    })
}

export async function prepareAuth() {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const accessTokenExpiry = parseInt(localStorage.getItem('access_token_expiry'));
  const secondsUntilExpiry = (accessTokenExpiry - new Date().getTime()) / 1000;

  if (accessToken && secondsUntilExpiry > 0) {
    console.log(`Found valid access token expiring in ${secondsUntilExpiry} seconds`)
    return true;
  } else if (refreshToken) {
    // Use stored refresh token to refresh access token
    console.log(`Found expired access token, refreshing...`)
    await refreshAccessToken();
    return true;
  } else {
    console.log('No local access token found')
    return false;
  }
}