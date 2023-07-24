import { Box, Card, Flex, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

export default function Track({ actionButton, name, artists, album }) {
  return (
    <Card p='4'>
      <Flex justifyContent='space-between'>
        <Box>
          <Heading size='sm'>{name}</Heading>
          <Text>{artists} | {album}</Text>
        </Box>
        {actionButton}
      </Flex>
    </Card>
  )
}