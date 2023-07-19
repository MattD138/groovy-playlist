import { Heading, Stack } from "@chakra-ui/react";
import Track from "../Track/Track";

export default function ResultsSection({ searchResults }) {
  return (
    <Stack bg="blackAlpha.500" w="100%" p="4" borderRadius='12'>
      <Heading size="lg" color="gray.50" mb='2'>Search Results</Heading>
      {searchResults.map(track => (
        <Track
          name={track.name}
          artist={track.artist}
          album={track.album}
          id={track.id}
          key={track.id}
        />
      ))}
    </Stack>
  )
}