import { Box } from "@chakra-ui/react";
import PlaylistList from "./PlaylistList";

export default function PlaylistListSection(props) {
  return (
    <Box bg="blackAlpha.500" p="4" borderRadius='12'>
      <PlaylistList
        playlist={props.playlist}
        playlists={props.playlists}
        handleLoadPlaylist={props.handleLoadPlaylist}
      />
    </Box>
  )
}