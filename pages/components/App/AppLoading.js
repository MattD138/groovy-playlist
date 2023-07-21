import { Box, Center, Spinner } from "@chakra-ui/react"

export default function AppLoading() {
  return (
    <Box bg="blackAlpha.500" w="100%" p='12' borderRadius='12'>
      <Center>
        <Spinner size='lg' color='gray.50' />
      </Center>
    </Box>
  )
}