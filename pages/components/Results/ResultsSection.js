import { Heading, Stack } from "@chakra-ui/react";
import Track from "../Track/Track";
import AddTrackButton from "../Track/AddTrackButton";

export default function ResultsSection({ searchResults }) {
  return (
    <Stack bg="blackAlpha.500" w="100%" p="4" borderRadius='12' spacing='4'>
      <Heading size="lg" color="gray.50">Search Results</Heading>
      <Stack>
        {searchResults.map(track => (
          <Track
            actionButton={<AddTrackButton track={track} />}
            name={track.name}
            artist={track.artist}
            album={track.album}
            key={track.id}
          />
        ))}
      </Stack>
    </Stack>
  )
}