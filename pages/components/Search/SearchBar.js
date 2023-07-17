import { Input } from "@chakra-ui/react";

export default function SearchBar({searchText, handleChange}) {
  return (
    <Input
      placeholder='Enter the name of a song, artist, or genre...'
      value={searchText}
      onChange={handleChange}
      size='lg'
      color="gray.50"
      _placeholder={{ color: 'inherit' }}
    />
  )
}