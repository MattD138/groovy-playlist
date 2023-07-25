import { Button, Stack } from "@chakra-ui/react"
import PlaylistHeading from "./PlaylistHeading"
import Track from "../Track/Track"
import RemoveTrackButton from "../Track/RemoveTrackButton"
import Loading from "../App/Loading"

export default function PlaylistSection(props) {
  return (
    <Stack bg="blackAlpha.500" w="100%" p="4" borderRadius='12' spacing='4'>
      {props.playlist.isLoading ? (
        <Loading />
      ) : (
        <>
          <PlaylistHeading
            playlistName={props.playlist.name}
            handleChange={props.handlePlaylistNameChange}
          />
          <Stack>
            {props.playlist.tracks.map(track => (
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
            isLoading={props.playlist.isSaving}
            isDisabled={props.playlist.tracks.length === 0}
            colorScheme='orange'
          >Save to Spotify</Button>
        </>
      )}

    </Stack>
  )
}