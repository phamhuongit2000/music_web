import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faMagnifyingGlass, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from "../config";

function HomeAdmin() {
    const dataLocal = localStorage.getItem('user');
    const userLocal  = JSON.parse(dataLocal);
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const modalOverlay = $('.modal__overlay')

    const [songs, setSongs] = useState("");
    const [songName, setSongName] = useState("");
    const [singger, setSingger] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [path, setPath] = useState("");
    const [vip, setVip] = useState("");

    useEffect(() => {
        fetch(`${config.serverDomain}/songs`)
        .then(res => res.json())
        .then(data =>{
            setSongs(data);
        })
    },[])

    function addSong() {
        var postSong = {
            "name": songName,
            "singger": singger,
            "path": path,
            "image": image,
            "category": category,
            "vip": vip
        }
        console.log(postSong)
    }

    function handleLogout() {
        localStorage.removeItem('user');
        navigate("/Home", { replace: true });
    }

    if(songs.length != 0) return (
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
                            <i><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></i>
                            <div className="search-content">
                                <input className="search-input" type="text" placeholder="Nhập tên bài hát cần tìm kiếm..."/>
                            </div>
                        </div>
                    </div>

                    {/* Login Register */}
                    <div className="header-user_name">
                        {userLocal[0].name}
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
                            <li className="nav-bar-item active">
                                <a href="#" className="title">
                                    <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                                    <span>Bài hát</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="#" className="title">
                                    <i><FontAwesomeIcon icon={faCompactDisc}></FontAwesomeIcon></i>
                                    <span>Ablum</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="#" className="title">
                                    <i><FontAwesomeIcon icon={faMicrophoneLines}></FontAwesomeIcon></i>
                                    <span>Nghệ sĩ</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="#" className="title">
                                    <i><FontAwesomeIcon icon={faGripVertical}></FontAwesomeIcon></i>
                                    <span>Thể loại</span>
                                </a>
                            </li>
                        </div>
                    </div>

                    {/* Log out */}
                    <div className="log-out">
                        <div className="nav-bar nar-bar-user">
                            <li className="nav-bar-item">
                                <Link to="/" className="title" onClick={handleLogout}>
                                    <i><FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon></i>
                                    <span>Đăng xuất</span>
                                </Link>
                            </li>
                        </div>
                    </div>
                </div>
                </div>
                {/* End side bar */}

                {/* Main */}
                <div className="main">
                    <div className="song-main">
                        <div className="title">
                            <div className="song-sum">
                                {songs.length} Bài hát
                                <i><FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon></i>
                            </div>
                            
                        </div>
                        
                        {/* List song */}
                        <div className="list-song">
                            {songs.map((song, index) => {
                                return (
                                    <div className={`song-info-container`} key={index} data-index = {index}>
                                        <div className="current-song-info">
                                            <div className="cd">
                                                <div className="cd-thumb"
                                                    style={{backgroundImage: `url(${require(`${song.image}`)})`}}>
                                                </div>
                                            </div>
                                            <div className="song-info">
                                                <div className="song-name">
                                                    {song.name}
                                                </div>
                                                <div className="singger-name">
                                                    {song.singger}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="time">
                                            03:04
                                        </div>
                                        <div className="vip">
                                            <div className="card vip-member">
                                                Vip
                                            </div>
                                        </div>
                                        <div className="play-icon">
                                            <i><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon></i>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/* End content */}

                {/* Footer */}
                <div className="footer">

                </div>
            </div>

            {/* Modal add song */}
            <div className="modal">
                <div className="modal__overlay" onClick={() => {console.log(modalOverlay)}}></div>
                <div className="modal__body">
                    <h3 className="add-song-heading">Tạo bài hát ❤️</h3>

                    <div className="form-group">
                        <label htmlFor="songName" className="form-label">Tên bài hát</label>
                        <input id="songName" name="songName" type="text" className="form-control" placeholder="Nhập tên bài hát"
                            onChange={(event) => {setSongName(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="songSingger" className="form-label">Tên nghệ sĩ</label>
                        <input id="songSingger" name="songSingger" type="text" className="form-control" placeholder="Nhập tên nghệ sĩ"
                            onChange={(event) => {setSingger(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Thể loại</label>
                        <select id="category" name="category" className="form-control"
                            onChange={(event) => {setCategory(event.target.value)}} required
                        >
                            <option value="">-- Chọn thể loại --</option>
                            <option value="Hà Nội">Nhạc cách mạng</option>
                            <option value="Thừa Thiên Huế">Nhạc thiếu nhi</option>
                            <option value="Hồ Chí Minh">Nhạc nước ngoài</option>
                        </select>
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="path" className="form-label">File bài hát</label>
                        <input id="path" name="path" type="file" className="custom-file-input"
                            onChange={(event) => {setPath(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="img" className="form-label">Hình ảnh</label>
                        <input id="img" name="img" type="file" accept="image/png, image/gif, image/jpeg" className="custom-file-input"
                            onChange={(event) => {setImage(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="vip" className="form-label">Vip</label>
                        <div className="radioBox">
                            <div className="radioBox-child">
                                <input id="vip" name="vip" type="radio" value="Vip" className="form-control"/>
                                Vip
                            </div>
                            <div className="radioBox-child">
                                <input id="vip" name="vip" type="radio" value="Normal" className="form-control"/>
                                Normal
                            </div>
                        </div>
                        <span className="form-message"></span>
                    </div>

                    <div className="form-submit" onClick={() => addSong()}>Add song</div>
                </div>
            </div>
        </div> 
    )
}

export default HomeAdmin;