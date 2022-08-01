import './App.css';
import PlaylistLibrary from './components/PlaylistLibrary';
import {useEffect, useState} from 'react';
import { accessToken, logout, getCurrentUserProfile, getAfrobeatsPlaylists } from './spotify';
import axios from 'axios';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
      setToken(accessToken);

      const fetchData = async () => {
        try { 
          const userProfile = await getCurrentUserProfile();
          setProfile(userProfile.data);
          const afrobeatsPlaylists = await getAfrobeatsPlaylists();
          await setPlaylists(afrobeatsPlaylists);
        } catch(e) {
          console.log(e);
        }
      };
      fetchData();
          
      } ,[]);

      useEffect(() => {
      
        console.log(playlists)
  
      }, [playlists])
      
  return (
    <div className="App">
      <header className="App-header">
        <PlaylistLibrary playlists={playlists} />
        {!token ? (
        <a
          className="App-link"
          href="http://localhost:8888/login"
        >
          Login To spotify
        </a>) : (<h1>Logged in!</h1>)
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
