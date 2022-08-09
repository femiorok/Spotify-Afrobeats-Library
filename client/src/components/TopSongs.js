import React from 'react';
import TopSongsList from './TopSongsList';
import { useEffect, useState, useMemo } from 'react';


function TopSongs({ songList }) {

  const [songProps, setSongProps] = useState(null);
  const [readyToRender, setReadyToRender] = useState();
  const [fullSongList, setFullSongList] = useState([]);
  const [songArray, setSongArray] = useState([]);
  const [songFineDetails, setSongFineDetails] = useState([]);
  const [removedSongDetailsDuplicates, setRemovedSongDetailsDuplicates] = useState([]);
  const [top100Songs, setTop100Songs] = useState();

  useEffect(() => {
    setReadyToRender(false)
  }, [])

  useEffect(() => {
    function getSongsWithNoDuplicatesAndSortedToTop100() {
      if (songList.length === 20) {
      const songs = songList.map(song=> song.data.items)
          .flat()
          .map(item => {
               const {artists, external_urls, id, name, popularity, album } = item.track;
               return {artists, external_urls, id, name, popularity, album } // This step seems redundant unless there's additional information in the track details that we're filtering out
          })
          .map(v => [v.id, v]);
          setSongProps(() => [...new Map(songs).values()].sort((a, b) => b.popularity - a.popularity).splice(0,100))
      } else {
        return 1
      }
    } 
    getSongsWithNoDuplicatesAndSortedToTop100();
  }, [songList])

  useEffect(() => {
    setReadyToRender(() => Array.isArray(songProps))
  }, [songProps])
  

  // console.log(getSongsWithNoDuplicatesAndSortedToTop100())
  // }, [readyToRender])
  

  // useEffect(() => {

  // const getSongs = () => {
  //   const _fullSongList = []
  //   console.log(songList, "checking songList prop")
  //   if (songList.length > 10) {
  //   for (let i = 0; i < songList.length; i++) {
  //     _fullSongList.push(songList[i].data.items);
  //   }
  //     console.log(_fullSongList, "full song list")
  //     setFullSongList(_fullSongList);
  //     return _fullSongList
  //   } else {
  //     return
  //   }
  // }

  // const getSongs2 = () => {
  //   let _songArray = []
  //   for(let j = 0; j < fullSongList.length; j++) {
  //   fullSongList[j].forEach(songs => _songArray.push(songs));
  //   console.log(_songArray, "song array")
  //   setSongArray(_songArray)
  //   return _songArray
  //   }
  // }

  // const getSongs3 = () => {
  //   let _songFineDetails = []
  //   for (let k = 0; k < songArray.length; k++) {
  //     const {artists, external_urls, id, name, popularity } = songArray[k].track;
  //     _songFineDetails.push({"artists": artists,
  //                         "external_urls": external_urls, 
  //                         "id": id, 
  //                         "name": name, 
  //                         "popularity": popularity
  //                         });
  //     }
  //     console.log(_songFineDetails, "fine details")
  //     setSongFineDetails(_songFineDetails)
  //     return _songFineDetails
  //   }
  
  // const getSongs4 = () => {
  //   const _removedSongDetailsDuplicates = [...new Map(songFineDetails.map(v => [v.id, v])).values()];
  //   _removedSongDetailsDuplicates.sort((a, b) => b.popularity - a.popularity);
  //   const _top100Songs = _removedSongDetailsDuplicates.splice(0, 100);
  //   console.log(_top100Songs, "top 100")
  //   setTop100Songs(_top100Songs)
  //   return _top100Songs
  // }
  // console.log(getSongs());
  // console.log(getSongs2());
  // console.log(getSongs3());
  // console.log(getSongs4());

  // // const finishedSongs = async () => {
  // //   const a = await getSongs(); 
  // //   const b = await getSongs2(); 
  // //   const c = await getSongs3(); 
  // //   const d = await getSongs4();
  // //   setSongProps(d);
  // // }

  // }, [songList])


// useEffect(() => {
//   if (Array.isArray(songProps) && songProps.length > 0)
//   setReadyToRender(1)
//   console.log("song props is done")
// }, [songProps])


  const listRender = () => {
    if (readyToRender === false) {
      return <h1>Loading Top Songs...</h1>
    } else {
      return <h1><TopSongsList songProps={songProps}/></h1>
    }
  }

  return (
    <div>
      {listRender()}
    </div>
  )
}

export default TopSongs