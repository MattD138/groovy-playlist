import { Box, Container, Flex } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import SearchButton from "./SearchButton";
import SearchOptions from "./SearchOptions";

export default function SearchSection(props) {
  return (
    <Box bg="blackAlpha.500" w="100%" py="4" borderRadius='12'>
      <Container maxW="container.sm">
        <Flex direction='column' alignItems='center' gap='4'>
          <SearchBar
            searchText={props.searchText}
            handleChange={props.handleSearchChange}
          />
          <SearchOptions
            searchOption={props.searchOption}
            handleChange={props.handleOptionChange}
          />
          <SearchButton handleClick={props.handleSearch} />
        </Flex>
      </Container>
    </Box>
  )
}