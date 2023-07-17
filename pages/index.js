import { Flex, Heading } from '@chakra-ui/react'
import NavBar from './components/Nav/NavBar'

export default function Home() {
  return (
    <Flex height="100vh" width="100vw" bgGradient='linear(to-br, purple.400, purple.700)'>
      <NavBar />
    </Flex>
  )
}
