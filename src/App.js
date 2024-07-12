import './App.css';
import { Route, Routes, Link } from 'react-router-dom'
import Login from './screen/Login';
import Home from './screen/Home';
import HomeUser from './screen/HomeUser';
import Register from './screen/Register';
import RegisterVip from './screen/RegisterVip';
import UserInfo from './screen/UserInfo';
import Search from './screen/Search';
import Songs from './screen/Songs';
import Singer from './screen/Singer';
import Top100 from './screen/Top100';
import Albums from './screen/Albums';
import SingerInfo from './screen/SingerInfo';
import AlbumInfo from './screen/AlbumInfo';
import AdminSong from './screen/AdminSong';
import AdminSinger from './screen/AdminSinger';
import AdminAlbum from './screen/AdminAlbum';
import AdminUser from './screen/AdminUser';
import AdminAlbumInfo from './screen/AdminAlbumInfo';
import History from './screen/History';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/music_web/login' element={<Login />} />
        <Route path='/music_web/register' element={<Register />} />
        <Route path='/music_web/registerVip' element={<RegisterVip />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/music_web/songs' element={<Songs />} />
        <Route path='/music_web/singer' element={<Singer />} />
        <Route path='/music_web/albums' element={<Albums />} />
        <Route path='/music_web/homeUser' element={<HomeUser />} />
        <Route path='/music_web/top100' element={<Top100 />} />
        <Route path='/music_web/userInfo' element={<UserInfo />} />
        <Route path='/music_web/singerInfo' element={<SingerInfo />} />
        <Route path='/music_web/albumInfo' element={<AlbumInfo />} />
        <Route path='/music_web/search' element={<Search />} />
        <Route path='/music_web/history' element={<History />} />
        <Route path='/music_web' element={<Home />} />

        <Route path='/music_web/adminSongs' element={<AdminSong />} />
        <Route path='/music_web/adminSinger' element={<AdminSinger />} />
        <Route path='/music_web/adminAlbum' element={<AdminAlbum />} />
        <Route path='/music_web/adminAlbumInfo' element={<AdminAlbumInfo />} />
      </Routes>
    </div>
  );
}

export default App;
