import React from 'react'
import PlaylistCard from './PlaylistCard'
import { useState, useEffect } from 'react';

function PlaylistLibrary({ playlists, playlist_IDs }) {
  // const playlistMap = playlists.map(playlist => <h1>{playlist.name}</h1>)
  // just testing
  const [playlistInfo, setPlaylistInfo] = useState([]);

  useEffect(() => {
    playlists.data && (setPlaylistInfo(playlists.data.playlists.items));
  }, [playlists]);

  return (
    <div className="flex shrink-0 justify-between flex-wrap gap-y-4">
      {playlistInfo === [] ? (<h1>Loading Playlists...</h1>) :
      (playlistInfo.map((playlist, index) => 
      <PlaylistCard playlistObject={playlist} index={index} id={playlist_IDs} />))
      }
    </div>
  )
}

export default PlaylistLibrary