import "./home.css"
import "./userInfo.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faClipboardUser, faCompass, faStar, faArrowLeft, faArrowRight, faMagnifyingGlass, faUser, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import config from "../config";

function UserInfo() {
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

    const [songs, setSongs] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isplaying, setIsplaying] = useState(false);

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
                            <i><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></i>
                            <div className="search-content">
                                <input className="search-input" type="text" placeholder="Nhập tên bài hát cần tìm kiếm..."/>
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
                            <li className="nav-bar-item">
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
                            <li className="nav-bar-item active">
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
                            {userLocal[0].level == 'vip'? 'Thành viên':'Nghe kho nhạc'}
                            <br/>
                            vip
                            <div 
                                className={`vip-register-btn ${userLocal[0].level == 'vip'? 'none':''}`}
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

                {/* Main */}
                <div className="main">
                    <div className="song-main">
                        <div className="info-group">
                            <div className="info-group-item">
                                <div className="info-title">Tên người dùng:</div>
                                <div className="info-content">{userLocal?.name || ""}</div>
                            </div>
                            <div className="info-group-item">
                                <div className="info-title">Địa chỉ email:</div>
                                <div className="info-content">{userLocal?.email || ""}</div>
                            </div>
                            <div className="info-group-item">
                                <div className="info-title">Số điện thoại:</div>
                                <div className="info-content">{userLocal?.phoneNumber || ""}</div>
                            </div>
                            <div className="info-group-item">
                                <div className="info-title">Mật khẩu:</div>
                                <div className="info-content">{userLocal?.password || ""}</div>
                            </div>
                            {/* <div className="info-group-item">
                                <div className="info-title">Loại tài khoản:</div>
                                <div className="info-content">{userLocal[0].level}</div>
                            </div> */}
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

export default UserInfo;