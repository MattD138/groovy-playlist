import { IconButton } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

export default function AddTrackButton({ track, handleAddTrack }) {
  return (
    <IconButton
      aria-label={`Add ${track.name} to playlist`}
      icon={<AddIcon />}
      onClick={() => handleAddTrack(track)}
    />
  )
}