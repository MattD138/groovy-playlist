import { Button, Heading, Stack } from "@chakra-ui/react"
import Track from "../Track/Track"
import RemoveTrackButton from "../Track/RemoveTrackButton"

export default function PlaylistSection({ playlist }) {
  return (
    <Stack bg="blackAlpha.500" w="100%" h="100%" p="4" borderRadius='12' spacing='4'>
      <Heading size="lg" color="gray.50">Playlist</Heading>
      <Stack>
        {playlist.map(track => (
          <Track
            actionButton={<RemoveTrackButton track={track} />}
            name={track.name}
            artist={track.artist}
            album={track.album}
            key={track.id}
          />
        ))}
      </Stack>
      <Button colorScheme='orange'>Save to Spotify</Button>
    </Stack>
  )
}