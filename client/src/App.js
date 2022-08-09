import './App.css';
import Loading from './components/Loading';
import PlaylistLibrary from './components/PlaylistLibrary';
import TopSongs from './components/TopSongs';
import {useEffect, useState} from 'react';
import {Link, Switch, Routes, Route} from 'react-router-dom';
import { accessToken, logout, getCurrentUserProfile, getAfrobeatsPlaylists } from './spotify';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [playlistIds, setPlaylistIds] = useState([]);
  const [songList, setSongList] = useState([]);
  const [songListLength, setSongListLength] = useState()

  useEffect(() => {
      setToken(accessToken);

      const fetchData = async () => {
      try { 
          const userProfile = await getCurrentUserProfile();
          setProfile(userProfile.data);
          const afrobeatsPlaylists = await getAfrobeatsPlaylists();
          await setPlaylists(afrobeatsPlaylists);
          let idList = await Promise.all(afrobeatsPlaylists.data.playlists.items.map(playlist => playlist.id));
          setPlaylistIds(idList);
    
        }
         catch(e) {
          console.log(e);
        }}

      fetchData();
          
      } ,[]);

      let songArray = []; 

      useEffect(() => {
        axios.defaults.baseURL = 'https://api.spotify.com/v1';
        axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
        axios.defaults.headers['Content-Type'] = 'application/json';
        const getAllSongs = async ()  => {
          try {
          for(let i = 0; i < playlistIds.length; i++) {
          const allSongs = await axios.get(`/playlists/${playlistIds[i]}/tracks`);
          songArray.push(allSongs);
          if (songArray.length > 0) {
            setSongListLength(songArray.length);
          }
          }
        } catch (err) {
          console.log(err)
        }
      }
      getAllSongs();
      setSongList(songArray);
      setSongListLength(songArray.length);  
    },
      [playlistIds])
      
  function topSongsRenderCheck() {
    if (songListLength == 20) {
      return <Route path="/top-100-afro-songs" element={<TopSongs songList={songList} />} />
    } else {
      return <Route path="/top-100-afro-songs" element={<button disabled type="button" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 inline-flex items-center">
      <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
      </svg>
        Loading...
      </button>} />
    }
  }
      
  return (
    <div className="App">
      <header className="App-header">
        <div className='flex'>
        <Link className='text-black border-green-500 border-solid border rounded-full px-8 py-1 my-4 mr-2 bg-green-500' to="/">Playlist Library</Link>
        <Link className='text-black border-green-500 border-solid border rounded-full px-8 py-1 my-4 bg-green-500' to="/top-100-afro-songs">Top 100</Link>
        </div>
        <Routes>
          {topSongsRenderCheck()}
          {playlists.data && (<Route path="/" element={<PlaylistLibrary playlists={playlists} playlistId={playlistIds}/>}/>)}
        </Routes>
        {!token ? (
        <button className="border-solid border rounded-full"
          href="http://localhost:8888/login"
        >
          Login To spotify
        </button>) : (<h1 className="border-green-500 border-solid border rounded-full px-8 py-1 my-4 bg-green-500">Logged in!</h1>)
        }    
        <button onClick={logout}>Log Out</button>
        {profile && (
          <div>
            <h1>{profile.display_name}</h1>
            <p>{profile.followers.total} Followers</p>
            {profile.images.length && profile.images[0].url &&(
              <img src={profile.images[0].url} alt='Avatar' />
            )}
          </div>
        )} 
      </header>
    </div>
  );
}

export default App;
