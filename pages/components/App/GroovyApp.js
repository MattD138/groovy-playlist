import { useState } from "react"
import GroovyLayout from "./GroovyLayout"

export default function GroovyApp() {
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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleOptionChange = (newOption) => {
    console.log(newOption)
    setSearchOption(newOption)
    console.log(searchOption)
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