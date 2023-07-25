import { Box, Card, Flex, Heading, Text } from "@chakra-ui/react";

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