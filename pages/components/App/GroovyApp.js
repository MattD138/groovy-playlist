import { useState, useEffect } from "react"
import GroovyLayout from "./GroovyLayout"
import { prepareAuth, requestAccessToken } from "@/helpers/spotifyAuth"
import spotifyFunctions from "@/helpers/spotifyFunctions"

export default function GroovyApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null if loading
  const [searchText, setSearchText] = useState('')
  const [searchOption, setSearchOption] = useState('track')
  const [searchResults, setSearchResults] = useState([])
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [playlist, setPlaylist] = useState(null) // null when no playlist has been selected
  const [playlists, setPlaylists] = useState(null) // null while loading

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

    async function checkExistingAuth() {
      setIsAuthenticated(null);
      try {
        const authSuccess = await prepareAuth();
        setIsAuthenticated(authSuccess);
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
      }
    }

    if (code) {
      console.log('Requesting access token');
      getToken();
    } else {
      // Check local auth
      checkExistingAuth();
    }
  }, [])

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleOptionChange = (newOption) => {
    setSearchOption(newOption);
  }

  const handleSearch = async () => {
    setIsSearchLoading(true);
    try {
      const results = await spotifyFunctions.search(searchText, searchOption);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
    }
    setIsSearchLoading(false);
  }

  const handleLoadPlaylist = async (id, name) => {
    if (id === 'new') {
      setPlaylist({
        id: null,
        name: 'New Playlist',
        tracks: [],
        isLoading: false,
        isSaving: false
      });
    } else if (id === '') {
      setPlaylist(null);
    } else {
      // Fetch playlist contents from Spotify
      console.log('Loading playlist ' + id);
      setPlaylist({
        id: id,
        name: name,
        isLoading: true
      });
      try {
        const tracks = await spotifyFunctions.getPlaylist(id);
        setPlaylist(prev => ({
          ...prev,
          tracks: tracks,
          isLoading: false
        }))
      } catch (err) {
        console.error(err);
        setPlaylist(null);
      }
    }
  }

  const handlePlaylistNameChange = (newPlaylistName) => {
    setPlaylist(prev => ({ ...prev, name: newPlaylistName }))
  }

  const handleAddTrack = (newTrack) => {
    // Add track if it does not exist in playlist
    if (playlist.tracks.find(e => e.id === newTrack.id)) {
      alert('Track already in playlist');
    } else {
      setPlaylist(prev => ({ ...prev, tracks: [...prev.tracks, newTrack] }));
    }
  }

  const handleRemoveTrack = (trackToRemove) => {
    // Remove given track from the tracklist state
    setPlaylist(prev => ({ ...prev, tracks: prev.tracks.filter(e => e.id !== trackToRemove.id) }));
  }

  const handleSavePlaylist = async () => {
    setPlaylist(prev => ({ ...prev, isSaving: true }));
    try {
      await spotifyFunctions.savePlaylist(playlist.name, playlist.tracks, playlist.id);
    } catch (err) {
      console.error(err);
    }
    setPlaylist(prev => ({ ...prev, isSaving: false }));
  }

  return (
    <GroovyLayout {
      ...{
        isAuthenticated,
        searchText,
        searchOption,
        searchResults,
        isSearchLoading,
        playlist,
        handleSearchChange,
        handleOptionChange,
        handleSearch,
        handleLoadPlaylist,
        handlePlaylistNameChange,
        handleAddTrack,
        handleRemoveTrack,
        handleSavePlaylist
      }
    } />
  )
}