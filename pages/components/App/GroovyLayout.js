import { Box, Container, Flex, Stack } from '@chakra-ui/react'
import NavBar from '../Nav/NavBar'
import SearchSection from '../Search/SearchSection'
import ResultsSection from '../Results/ResultsSection'
import PlaylistSection from '../Playlist/PlaylistSection'

export default function GroovyLayout(props) {
  return (
    <Box height="100vh" width="100vw" bgGradient='linear(to-br, purple.400, purple.700)'>
      <NavBar />
      <Container maxW="container.xl" h="100%">
        <Stack direction='column' spacing='4'>
          <SearchSection
            searchText={props.searchText}
            handleSearchChange={props.handleSearchChange}
            searchOption={props.searchOption}
            handleOptionChange={props.handleOptionChange}
          />
          <Stack direction={['column', 'row']} spacing='4'>
            <ResultsSection
              searchResults={props.searchResults}
            />
            <PlaylistSection playlist={props.playlist} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}