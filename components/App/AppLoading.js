import { Box } from "@chakra-ui/react"
import Loading from "./Loading"

export default function AppLoading() {
  return (
    <Box bg="blackAlpha.500" w="100%" p='12' borderRadius='12'>
      <Loading />
    </Box>
  )
}