import React from 'react'


function PlaylistCard({ playlistObject, index, id }) {

  
  return (
    <div>
      <a href={playlistObject.external_urls.spotify}>
      <img src={playlistObject.images[0].url} alt='Playlist cover' className="h-48 hover:animate-pulse"></img>
      <h1>{id}</h1>
      </a>
    </div>
  )
}

export default PlaylistCard