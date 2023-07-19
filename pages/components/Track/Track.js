import { Box, Card, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function Track({ name, artist, album, id }) {
  return (
    <Card p='4'>
      <Flex justifyContent='space-between'>
        <Box>
          <Heading size='sm'>{name}</Heading>
          <Text>{artist} | {album}</Text>
        </Box>
        <IconButton aria-label={`Add ${name} to playlist`} icon={<AddIcon />} />
      </Flex>
    </Card>
  )
}