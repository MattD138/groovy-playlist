import { Button, Heading, Stack } from "@chakra-ui/react"
import PlaylistHeading from "./PlaylistHeading"
import Track from "../Track/Track"
import RemoveTrackButton from "../Track/RemoveTrackButton"

export default function PlaylistSection(props) {
  return (
    <Stack bg="blackAlpha.500" w="100%" h="100%" p="4" borderRadius='12' spacing='4'>
      <PlaylistHeading
        playlistName={props.playlistName}
        handleChange={props.handlePlaylistNameChange}
      />
      <Stack>
        {props.tracklist.map(track => (
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