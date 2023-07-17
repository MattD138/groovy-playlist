import { Box, Flex, Container, Heading } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Box minH="sm" w="100%">
      <Flex justify="center" bg="purple.900" py="4">
        <Heading color="gray.50">Groovy Playlist</Heading>
      </Flex>
    </Box>
  )
}