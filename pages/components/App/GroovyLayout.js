import { Box, Container, Flex, Stack } from '@chakra-ui/react'
import NavBar from '../Nav/NavBar'
import AppLoading from './AppLoading'
import Login from './Login'
import SearchSection from '../Search/SearchSection'
import ResultsSection from '../Results/ResultsSection'
import PlaylistSection from '../Playlist/PlaylistSection'

export default function GroovyLayout(props) {
  return (
    <Box minH='100vh' bgGradient='linear(to-br, purple.400, purple.700)'>
      <NavBar />
      <Container maxW="container.xl" h="100%" py='4'>
        {props.isAuthenticated ? (
          <Stack direction='column' spacing='4'>
            <SearchSection
              searchText={props.searchText}
              handleSearchChange={props.handleSearchChange}
              searchOption={props.searchOption}
              handleOptionChange={props.handleOptionChange}
              handleSearch={props.handleSearch}
              isSearchLoading={props.isSearchLoading}
            />
            <Stack direction={['column', 'row']} spacing='4'>
              <ResultsSection
                searchResults={props.searchResults}
                handleAddTrack={props.handleAddTrack}
                isSearchLoading={props.isSearchLoading}
              />
              <PlaylistSection
                playlistName={props.playlistName}
                handlePlaylistNameChange={props.handlePlaylistNameChange}
                tracklist={props.tracklist}
                handleRemoveTrack={props.handleRemoveTrack}
                handleSavePlaylist={props.handleSavePlaylist}
                isSavingPlaylist={props.isSavingPlaylist}
              />
            </Stack>
          </Stack>
        ) : props.isAuthenticated === false ? (
          <Login />
        ) : (
          <AppLoading />
        )}

      </Container>
    </Box>
  )
}
