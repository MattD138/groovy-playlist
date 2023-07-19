import { useState } from "react"
import GroovyLayout from "./GroovyLayout"

export default function GroovyApp() {
  const [searchText, setSearchText] = useState('')
  const [searchOption, setSearchOption] = useState('track')
  const [searchResults, setSearchResults] = useState([
    {
      name: 'Quack Quack',
      artist: 'Donald Duck',
      album: 'Best of Donald Duck 1997',
      id: 100
    },
    {
      name: 'Children',
      artist: 'Robert Miles',
      album: 'Children',
      id: 101
    }
  ])
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [tracklist, setTracklist] = useState([
    {
      name: 'Rush Over Me',
      artist: 'Seven Lions',
      album: 'Rush Over Me',
      id: 102
    },
    {
      name: 'Say Hello',
      artist: 'MaRLo',
      album: 'Altitude',
      id: 103
    }
  ])

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
        handleAddTrack
      }
    } />
  )
}