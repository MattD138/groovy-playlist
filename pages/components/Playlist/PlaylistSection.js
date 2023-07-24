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
            actionButton={<RemoveTrackButton track={track} handleRemoveTrack={props.handleRemoveTrack} />}
            name={track.name}
            artists={track.artists}
            album={track.album}
            key={track.id}
          />
        ))}
      </Stack>
      <Button
        onClick={props.handleSavePlaylist}
        isLoading={props.isSavingPlaylist}
        isDisabled={props.tracklist.length === 0}
        colorScheme='orange'
      >Save to Spotify</Button>
    </Stack>
  )
}