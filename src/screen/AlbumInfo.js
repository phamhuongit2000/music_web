import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faClipboardUser, faCompass, faStar, faArrowLeft, faArrowRight, faMagnifyingGlass, faUser, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import config from "../config";
import axios from 'axios';

function AlbumInfo() {
    const dataLocal = localStorage.getItem('user');
    const userLocal  = JSON.parse(dataLocal);
    const navigate = useNavigate();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const playlist = $('.list-song');
    const cdThumb = $('.current-song .cd-thumb')
    const songName = $('.current-song .song-name')
    const btnNext = $('.current-song .btn-next')
    const btnPrev = $('.current-song .btn-prev')
    const btnRepeat = $('.current-song .btn-repeat')
    const btnRandom = $('.current-song .btn-random')
    const singgerName = $('.current-song .singger-name')
    const progress = $('.current-song .progress')
    const playBtn = $('.btn-toggle-play')
    const currentSong = $('.current-song')
    const volume = $('.current-song-volume .volume-icon')
    const audio = $('#audio')
    const progressVolume = $('#progress-volume')

    let isRandom = false;
    let isRepeat = false;

    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState({});
    const [singers, setSingers] = useState([]);
    const [top100, setTop100] = useState([]);
    const [albumInfo, setAlbumInfo] = useState([]);

    const [searchKey, setSearchKey] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isplaying, setIsplaying] = useState(false);

    function handelSearch() {
        const setJsonData=JSON.stringify(searchKey);
		localStorage.setItem('search', setJsonData);
        navigate("/search", { replace: true });
    }

    const albumChooseLocal = localStorage.getItem('albumChoose');
    const albumChooseID  = JSON.parse(albumChooseLocal);

    useEffect(() => {
        fetch(`${config.serverDomain}/Album/GetById/${albumChooseID}`)
        .then(res => res.json())
        .then(data =>{
            setAlbumInfo(data);
            setSongs(data.listSongsInfo)
            console.log(data)
        })
    },[])

    useEffect(() => {
        fetch(`${config.serverDomain}/songs`)
        .then(res => res.json())
        .then(data =>{
            setSongs(data);
        })
    },[])

    useEffect(() => {
        fetch(`${config.serverDomain}/albums`)
        .then(res => res.json())
        .then(data =>{
            setAlbums(data);
        })
    },[])

    useEffect(() => {
        fetch(`${config.serverDomain}/singers`)
        .then(res => res.json())
        .then(data =>{
            setSingers(data);
        })
    },[])

    useEffect(() => {
        fetch(`${config.serverDomain}/top100`)
        .then(res => res.json())
        .then(data =>{
            setTop100(data);
        })
    },[])

    // Xử lí khi bấm play
    function playSong() {
        if(isplaying) {
            audio.pause();
        } else {
            audio.play();
        }
    }

    // Xử lí next bài
    function nextSong() {
        setCurrentIndex(currentIndex + 1)
    }

    // Xử lí prev bài
    function prevSong() {
        setCurrentIndex(currentIndex - 1)
    }
    
    // Xử lí khi đang play
    function audioPlay() {
        setIsplaying(true);
        currentSong.classList.add('playing');
    }

    // Xử lí khi tiến độ bài hát thay đổi
    function onTimeUpdate() {
        if(audio.duration) {
           const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
           progress.value = progressPercent;
        }
    }

    // Xử lí khi tua
    function onChangeCurentTime(e) {
        const seekTime = Math.floor(e.target.value * audio.duration / 100);
        audio.currentTime = seekTime;
    }

    // Xử lí khi đang pause
    function audioPause() {
        setIsplaying(false);
        currentSong.classList.remove('playing');
    }

    // Chọn bài hát
    function choeseSong(index) {
        setCurrentIndex(index)
    }

    function listenSong(songId) {
        const formData = new FormData();
        formData.append("SongId", songId);
        formData.append("UserId", userLocal.userId);

        axios.post(`${config.serverDomain}/Song/ListenSong`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res))
    }

    // Handle logout
    function handleLogout() {
        localStorage.removeItem('user');
        navigate("/Home", { replace: true });
    }

    return (
        <div className="root">
            <div className="container">
                {/* Header */}
                <div className="header">
                    <div className="flex-left">
                        {/* Back and next button */}
                        <div className="header-control">
                            <div className="btn btn-back">
                                <i><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></i>
                            </div>
                            <div className="btn btn-next">
                                <i><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></i>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="search">
                            <i onClick={() => handelSearch()}><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></i>
                            <div className="search-content">
                                <input className="search-input" type="text" placeholder="Nhập tên bài hát cần tìm kiếm..."
                                    onChange={(e) => setSearchKey(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Login Register */}
                    <div className="header-user_name">
                        {userLocal?.name || ""}
                    </div>
                </div>
                {/* End header */}
                {/* Side bar */}
                <div className="side-bar">
                <div className="side-bar-wrapper">
                    {/* Logo */}
                    <div className="logo-wrapper">
                        <div className="logo">
                            <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                        </div>
                        MP3
                    </div>

                    {/* Guest nav bar */}
                    <div className="side-bar-main">
                        {/* Nav bar main */}
                        <div className="nav-bar nar-bar-main">
                            <li className="nav-bar-item">
                                <a href="/homeUser" className="title">
                                    <i><FontAwesomeIcon icon={faCompass}></FontAwesomeIcon></i>
                                    <span>khám phá</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/songs" className="title">
                                    <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                                    <span>Bài hát</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/singer" className="title">
                                    <i><FontAwesomeIcon icon={faClipboardUser}></FontAwesomeIcon></i>
                                    <span>Ca sĩ</span>
                                </a>
                            </li>
                            <li className="nav-bar-item active">
                                <a href="/albums" className="title">
                                    <i><FontAwesomeIcon icon={faCompactDisc}></FontAwesomeIcon></i>
                                    <span>Album</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/top100" className="title">
                                    <i><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></i>
                                    <span>Top 100</span>
                                </a>
                            </li>
                        </div>
                    </div>

                    {/* Div line */}
                    <div className="side-line-wrapper">
                        <div className="side-line"></div>
                    </div>

                    {/* User nav bar */}
                    <div className="side-bar-user">
                        <div className="nav-bar nar-bar-user">
                            <li className="nav-bar-item">
                                <a href="/userInfo" className="title">
                                    <i><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></i>
                                    <span>Cá nhân</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/history" className="title">
                                    <i><FontAwesomeIcon icon={faHistory} /></i>
                                    <span>Lịch sử</span>
                                </a>
                            </li>
                        </div>
                    </div>

                    {/* Register vip*/}
                    {/* <div className="side-bar__vip">
                        <div className="vip-container">
                            {userLocal?.type == 'Vip'? 'Thành viên':'Nghe kho nhạc'}
                            <br/>
                            vip
                            <div 
                                className={`vip-register-btn ${userLocal?.type == 'vip'? 'none':''}`}
                                onClick={() => navigate("/registerVip", { replace: true })}
                            >Đăng kí</div>
                        </div>
                    </div> */}

                    {/* Log out */}
                    <div className="log-out">
                        <div className="nav-bar nar-bar-user">
                            <li className="nav-bar-item">
                                <Link to="/" className="title">
                                    <i><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon></i>
                                    <span>Đăng xuất</span>
                                </Link>
                            </li>
                        </div>
                    </div>
                </div>
                </div>
                {/* End side bar */}

                {/* Current song */}
                <div className="current-song">
                    <div className="current-song-flex">
                        {/* Song info */}
                        <div className="current-song-info w-3">
                            <div className="cd">
                                <div className="cd-thumb" style={{backgroundImage: `url(${songs[currentIndex]?.imgUrl || ""})`}}>
                                </div>
                            </div>
                            <div className="song-info">
                                <div className="song-name">
                                    {songs[currentIndex]?.name || ""}
                                </div>
                                <div className="singger-name">
                                    {songs[currentIndex]?.singerName || ""}
                                </div>
                            </div>
                        </div>

                        {/* Song control */}
                        <div className="current-song-control w-3">
                            <div className="control">
                                <div className="btn btn-repeat">
                                    <i><FontAwesomeIcon icon={faRedo}></FontAwesomeIcon></i>
                                </div>
                                <div className="btn btn-prev" onClick={() => prevSong()}>
                                    <i><FontAwesomeIcon icon={faStepBackward}></FontAwesomeIcon></i>
                                </div>
                                <div className="btn btn-toggle-play" onClick={() => playSong()}>
                                    <i className="icon-pause"><FontAwesomeIcon icon={faPause}></FontAwesomeIcon></i>
                                    <i className="icon-play"><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></i>
                                </div>
                                <div className="btn btn-next" onClick={() => nextSong()}>
                                    <i><FontAwesomeIcon icon={faStepForward}></FontAwesomeIcon></i>
                                </div>
                                <div className="btn btn-random">
                                    <i><FontAwesomeIcon icon={faRandom}></FontAwesomeIcon></i>
                                </div>
                            </div>
                            
                            {/* Song progress */}
                            <input id="progress" 
                                className="progress" type="range" defaultValue="0" step="1" min="0" max="100"
                                onChange={(e) => onChangeCurentTime(e)}
                            />
                        
                            <audio id="audio" 
                                onPlay={(e) => audioPlay()}
                                onPause={(e) => audioPause()}
                                onTimeUpdateCapture={() => onTimeUpdate()}
                                src={songs[currentIndex]?.audioUrl || ""}></audio>
                        </div>

                        {/* Song setting */}
                        <div className="current-song-setting w-3">
                            <div className="current-song-volume">
                                <div className="volume-icon low">
                                    <i className="volume-mute"><FontAwesomeIcon icon={faVolumeXmark}></FontAwesomeIcon></i>
                                    <i className="volume-low"><FontAwesomeIcon icon={faVolumeLow}></FontAwesomeIcon></i>
                                    <i className="volume-hight"><FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon></i>
                                </div>
                                <input id="progress-volume" className="progress" type="range" defaultValue="50" step="1" min="0" max="100"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End current song */}

                {/* Main */}
                <div className="main">
                    <div className="home-main">
                        <div className="ablum-info-wrap">
                            <div className="album-info-header">
                                <div className="album-info-image-wrap">
                                    <div className="album-info-image"
                                        style={{backgroundImage: `url(${albumInfo?.imgUrl || ""})`}}>
                                    </div>
                                </div>
                                <div className="album-info-introduce">
                                    <div className="album-name">{albumInfo?.name || ""}</div>
                                </div>
                            </div>
                            <div className="list-song">
                                {songs.map((song, index) => {
                                    return (
                                        <div className={`song-info-container ${currentIndex == index ? 'active': ''} w-1`} key={index} data-index = {index}>
                                            <div className="current-song-info w-3">
                                                <div className="cd" onClick={() => {
                                                        // if(userLocal[0].level != 'vip' && song.vip == 'Vip') {
                                                        //     alert('Bài này cần mất phí để nghe bấm oke để chuyển sang trang đăng kí thành viên vip')
                                                        //     navigate("/registerVip", { replace: true });
                                                        // }
                                                        // else {
                                                        //     choeseSong(index)
                                                        // }

                                                        choeseSong(index)
                                                    }}>
                                                    <div className="cd-thumb"
                                                        style={{backgroundImage: `url(${song?.imgUrl || ""})`}}>
                                                    </div>
                                                </div>
                                                <div className="song-info">
                                                    <div className="song-name">
                                                        {song.name}
                                                        {/* <span className={`card ${song.vip == "Vip"?'vip-member':'normal-member'}`}>
                                                            {`${song.vip == "Vip"? 'Vip': ''}`}
                                                        </span> */}
                                                    </div>
                                                    <div className="singger-name">
                                                        {song?.singerName || ""}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="song-title w-3">
                                                {song.description}
                                            </div>

                                            <div className="song-time w-3">
                                                {`0${Math.floor(Math.random()*2) + 3}:${Math.floor(Math.random()*50) + 10}`}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                {/* End content */}

                {/* Footer */}
                <div className="footer">

                </div>
            </div>
        </div> 
    )
}

export default AlbumInfo;