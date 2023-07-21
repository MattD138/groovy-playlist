import { Box, Button, Center, Heading, Stack, Text } from "@chakra-ui/react"
import { requestAuthCode } from "@/helpers/spotifyAuth"

export default function Login() {
  return (
    <Stack bg="blackAlpha.500" p="4" borderRadius='12' spacing='4' color='gray.50'>
      <Heading size='lg' color='gray.50'>Login</Heading>
      <Box>
        <Text>Please login to get access to Groovy Playlist.</Text>
        <Text>You will automatically be redirected to this page after login.</Text>
      </Box>
      <Button
        colorScheme='green'
        onClick={() => requestAuthCode()}
      >Log in with Spotify</Button>
    </Stack>
  )
}