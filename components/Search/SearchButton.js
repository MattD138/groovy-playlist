import { Button } from "@chakra-ui/react";

export default function SearchButton({ handleClick, isLoading }) {
  return (
    <Button isLoading={isLoading} onClick={handleClick}>Search</Button>
  )
}