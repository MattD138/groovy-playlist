import { useState, useEffect } from "react"
import GroovyLayout from "./GroovyLayout"
import { requestAccessToken, refreshAccessToken } from "@/helpers/spotifyAuth"
import spotifyFunctions from "@/helpers/spotifyFunctions"

export default function GroovyApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null if loading
  const [searchText, setSearchText] = useState('')
  const [searchOption, setSearchOption] = useState('track')
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [isSavingPlaylist, setIsSavingPlaylist] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [tracklist, setTracklist] = useState([])

  // User may have been redirected to the app from Spotify auth flow
  // On load, check if the url contains 'code' query parameter
  // Else, attempt to find an existing access_token in localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    async function getToken() {
      setIsAuthenticated(null);
      try {
        await requestAccessToken(code);
        // If no errors, access_token has been written to local storage
        setIsAuthenticated(true);
        // Remove Spotify's params from the window location
        window.history.replaceState(null, '', window.location.pathname);
      } catch (err) {
        console.error(err)
        setIsAuthenticated(false);
      }
    }

    if (code) {
      console.log('Requesting access token')
      getToken();
    } else {
      // Check local auth
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      if (accessToken && refreshToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleOptionChange = (newOption) => {
    setSearchOption(newOption)
  }

  const handleSearch = async () => {
    setIsSearchLoading(true);
    try {
      const results = await spotifyFunctions.search(searchText, searchOption);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    }
    setIsSearchLoading(false)
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

  const handleSavePlaylist = async () => {
    setIsSavingPlaylist(true);
    try {
      await spotifyFunctions.savePlaylist(playlistName, tracklist);
    } catch (err) {
      console.error(err);
    }
    setIsSavingPlaylist(false);
  }

  return (
    <GroovyLayout {
      ...{
        isAuthenticated,
        isSearchLoading,
        isSavingPlaylist,
        searchText,
        handleSearchChange,
        searchOption,
        handleOptionChange,
        handleSearch,
        searchResults,
        playlistName,
        handlePlaylistNameChange,
        tracklist,
        handleAddTrack,
        handleRemoveTrack,
        handleSavePlaylist
      }
    } />
  )
}