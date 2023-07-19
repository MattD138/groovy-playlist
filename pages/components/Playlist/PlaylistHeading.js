import { Editable, EditableInput, EditablePreview, Heading, Tooltip } from "@chakra-ui/react"

export default function PlaylistHeading({ playlistName, handleChange }) {
  return (
    <Heading size="lg" color="gray.50">
      <Editable value={playlistName} onChange={handleChange}>
        <Tooltip label='Click to edit' shouldWrapChildren={true} placement='right' hasArrow>
          <EditablePreview p='0' _hover={{
            background: 'blackAlpha.500'
          }} />
        </Tooltip>
        <EditableInput p='0' />
      </Editable>
    </Heading>
  )
}