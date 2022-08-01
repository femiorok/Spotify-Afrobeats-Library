import React from 'react'
import { useState, useEffect } from 'react';


function PlaylistCard({ playlists }) {
  const [playlistInfo, setPlaylistInfo] = useState([]);

  useEffect(() => {
    playlistInfo.push(playlists);
    console.log(playlistInfo)
  
  }, [playlists]);

  return (
    <div>
      {playlistInfo.length > 0 && 
      <img src={playlists.data.playlists.items.images}></img>
      }
      </div>
  )
}

export default PlaylistCard