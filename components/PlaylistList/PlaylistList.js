import { Select } from "@chakra-ui/react";
import Loading from "../App/Loading";

export default function PlaylistList({ playlist, playlists, handleLoadPlaylist }) {
  const handleChange = (e) => {
    const id = e.target.value;
    const currentPlaylist = playlists.find(p => p.id === id);
    let name;
    if (currentPlaylist) {
      name = currentPlaylist.name;
    }
    handleLoadPlaylist(id, name);
  }

  return (
    <>
      {
        playlists ? (
          <Select
            placeholder='Select playlist'
            variant='filled'
            value={playlist ? (playlist.id ? playlist.id : 'new') : ''}
            onChange={handleChange}
          >
            <option value='new' style={{ fontWeight: 'bold' }}>Create a new playlist</option>
            {playlists && playlists.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Select >
        ) : (
          <Loading />
        )
      }
    </>

  )
}