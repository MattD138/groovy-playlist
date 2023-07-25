import { Heading, Stack } from "@chakra-ui/react";
import Track from "../Track/Track";
import AddTrackButton from "../Track/AddTrackButton";
import Loading from "../App/Loading";

export default function ResultsSection(props) {
  return (
    <Stack bg="blackAlpha.500" w="100%" p="4" borderRadius='12' spacing='4'>
      <Heading size="lg" color="gray.50">Search Results</Heading>
      <Stack>
        {props.isSearchLoading
          ? <Loading />
          : props.searchResults.map(track => (
            <Track
              actionButton={<AddTrackButton track={track} handleAddTrack={props.handleAddTrack} />}
              name={track.name}
              artists={track.artists}
              album={track.album}
              key={track.id}
            />
          ))}
      </Stack>
    </Stack>
  )
}