import { useState } from "react"
import GroovyLayout from "./GroovyLayout"

export default function GroovyApp() {
  const [searchText, setSearchText] = useState('')
  const [searchOption, setSearchOption] = useState('track')

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleOptionChange = (newOption) => {
    setSearchOption(newOption)
  }

  return (
    <GroovyLayout
      searchText={searchText}
      handleSearchChange={handleSearchChange}
      searchOption={searchOption}
      handleOptionChange={handleOptionChange}
    />
  )
}