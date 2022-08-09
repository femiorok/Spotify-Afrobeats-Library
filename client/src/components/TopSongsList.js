import React from 'react'
import { useState, useEffect} from 'react'

function TopSongsList({ songProps, readyToRender }) {

const [songDetails, setSongDetails] = useState();

// useEffect(() => {
//     if (Array.isArray(songProps))
//     console.log(songProps, "checking song props from child")

// }, [songProps])

function songDetailsRenderCheck() {
    if (songProps != null && songProps.length === 100) {
        return <div>{songProps.map((song, index) => 
                    <div className="flex mx-8 w-full h-40 bg-slate-50 hover:bg-slate-300 border-y-2 self-center">
                    <h1 className='text-black self-center flex'>
                        <span className='font-bold mx-10'>{index + 1}</span> 
                        <a href={song.external_urls.spotify}><img className='h-24 mr-8 hover:animate-pulse' src={song.album.images[1].url} alt="album cover" /></a>
                        {song.name} by {song.artists[0].name}
                    </h1>
                    </div>)}
                </div>
    } else {
        return <h1>goodbye</h1>
    }
}


  return (
    <div>
       {songDetailsRenderCheck()}
    </div>
  )
}

export default TopSongsList