import { useState, useEffect } from "react"
import GroovyLayout from "./GroovyLayout"
import { requestAccessToken, refreshAccessToken } from "@/helpers/spotifyAuth"

export default function GroovyApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null if loading
  const [searchText, setSearchText] = useState('')
  const [searchOption, setSearchOption] = useState('track')
  const [searchResults, setSearchResults] = useState([
    {
      name: 'Children',
      artist: 'Robert Miles',
      album: 'Children (Dance Vault Remixes)',
      id: '4wtR6HB3XekEengMX17cpc',
      uri: 'spotify:track:4wtR6HB3XekEengMX17cpc'
    },
    {
      name: 'Rush Over Me (feat. HALIENE) - Seven Lions 1999 Remix',
      artist: 'Seven Lions',
      album: 'Rush Over Me (Seven Lions 1999 Remix)',
      id: '2pZL9DNKxnPwRk7hQPUvrL',
      uri: 'spotify:track:2pZL9DNKxnPwRk7hQPUvrL'
    },
    {
      name: 'Say Hello - Darren Porter Radio Edit',
      artist: 'MaRLo',
      album: 'Say Hello',
      id: '0jddySnJ0G958xzJE8OhAN',
      uri: 'spotify:track:0jddySnJ0G958xzJE8OhAN'
    }
  ])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [tracklist, setTracklist] = useState([])

  // User may have been redirected to the app from Spotify auth flow
  // On load, check if the url contains 'code' query parameter
  // Else, attempt to find an existing access_token in localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const accessTokenExpiry = parseInt(localStorage.getItem('access_token_expiry'));
    const secondsUntilExpiry = (accessTokenExpiry - new Date().getTime()) / 1000;

    async function getToken() {
      setIsAuthenticated(null)
      try {
        await requestAccessToken(code)
        // If no errors, access_token has been written to local storage
        setIsAuthenticated(true)
        // Remove Spotify's params from the window location
        window.history.replaceState(null, '', window.location.pathname);
      } catch (err) {
        console.error(err)
      }
    }

    async function updateToken() {
      setIsAuthenticated(null)
      try {
        await refreshAccessToken()
        setIsAuthenticated(true)
      } catch (err) {
        console.error(err)
      }
    }

    if (accessToken && secondsUntilExpiry > 0) {
      console.log(`Found valid access token expiring in ${secondsUntilExpiry} seconds`)
      setIsAuthenticated(true)
      // TODO: Set timeout to refresh token when it expires
    } else if (refreshToken) {
      console.log(`Found expired access token, refreshing...`)
      updateToken()
    } else if (code) {
      // Use authorization code to request access token
      console.log('Requesting access token')
      getToken()
    } else {
      console.log('No local access token found')
      setIsAuthenticated(false)
    }

  }, [])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleOptionChange = (newOption) => {
    setSearchOption(newOption)
  }

  const handlePlaylistNameChange = (newPlaylistName) => {
    setPlaylistName(newPlaylistName)
  }

  const handleAddTrack = (newTrack) => {
    // Add track if it does not exist in playlist
    if (tracklist.find(e => e.id === newTrack.id)) {
      alert('Track already in playlist')
    } else {
      setTracklist(prev => [...prev, newTrack])
    }
  }

  const handleRemoveTrack = (trackToRemove) => {
    // Remove given track from the tracklist state
    setTracklist(prev => prev.filter(e => e.id !== trackToRemove.id))
  }

  return (
    <GroovyLayout {
      ...{
        isAuthenticated,
        searchText,
        handleSearchChange,
        searchOption,
        handleOptionChange,
        searchResults,
        playlistName,
        handlePlaylistNameChange,
        tracklist,
        handleAddTrack,
        handleRemoveTrack
      }
    } />
  )
}