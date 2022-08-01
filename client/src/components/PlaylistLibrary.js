import React from 'react'
import PlaylistCard from './PlaylistCard'

function PlaylistLibrary({ playlists }) {
  // const playlistMap = playlists.map(playlist => <h1>{playlist.name}</h1>)
  // just testing
  return (
    <div>
      <PlaylistCard playlists={playlists} />
    </div>
  )
}

export default PlaylistLibrary