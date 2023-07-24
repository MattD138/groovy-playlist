import { Box, Flex, Container, Heading } from "@chakra-ui/react";

export default function NavBar() {
  return (
    <Box >
      <Flex justify="center" bg="purple.900" py="4">
        <Heading color="gray.50">Groovy Playlist</Heading>
      </Flex>
    </Box >
  )
}