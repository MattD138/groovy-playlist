import { IconButton } from "@chakra-ui/react"
import { MinusIcon } from "@chakra-ui/icons"

export default function RemoveTrackButton({ track, handleRemoveTrack }) {
  return (
    <IconButton
      aria-label={`Remove ${track.name} from playlist`}
      icon={<MinusIcon />}
      onClick={() => handleRemoveTrack(track)}
    />
  )
}