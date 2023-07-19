import { Editable, EditableInput, EditablePreview, Heading } from "@chakra-ui/react"

export default function PlaylistHeading({ playlistName, handleChange }) {
  return (
    <Heading size="lg" color="gray.50">
      <Editable value={playlistName} onChange={handleChange}>
        <EditablePreview />
        <EditableInput />
      </Editable>
    </Heading>
  )
}