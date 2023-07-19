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

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleOptionChange = (newOption) => {
    console.log(newOption)
    setSearchOption(newOption)
    console.log(searchOption)
  }

  return (
    <GroovyLayout
      searchText={searchText}
      handleSearchChange={handleSearchChange}
      searchOption={searchOption}
      handleOptionChange={handleOptionChange}
      searchResults={searchResults}
    />
  )
}