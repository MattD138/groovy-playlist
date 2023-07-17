import { Box, Container, Flex } from '@chakra-ui/react'
import NavBar from '../Nav/NavBar'
import SearchSection from '../Search/SearchSection'

export default function GroovyLayout(props) {
  return (
    <Box height="100vh" width="100vw" bgGradient='linear(to-br, purple.400, purple.700)'>
      <NavBar />
      <Container maxW="container.xl">
        <Flex direction="column">
          <SearchSection
            searchText={props.searchText}
            handleSearchChange={props.handleSearchChange}
            searchOption={props.searchOption}
            handleOptionChange={props.handleOptionChange}
          />
        </Flex>
      </Container>
    </Box>
  )
}
