import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

export default function SearchOptions({searchOption, handleChange}) {
  return (
    <RadioGroup value={searchOption} onChange={handleChange}>
      <Stack direction='row' color='gray.50'>
        <Radio value='track' colorScheme='orange'>Song Title</Radio>
        <Radio value='artist' colorScheme='orange'>Artist</Radio>
        <Radio value='genre' colorScheme='orange'>Genre</Radio>
      </Stack>
    </RadioGroup>
  )
}