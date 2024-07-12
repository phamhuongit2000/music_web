import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCompass, faStar, faArrowLeft, faArrowRight, faMagnifyingGlass, faUser, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from "../config";

function Songs() {
    const dataLocal = localStorage.getItem('user');
    const userLocal  = JSON.parse(dataLocal);
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const modalOverlay = $('.modal__overlay')

    const [songs, setSongs] = useState("");
    const [singers, setSingers] = useState("");
    const [users, setUsers] = useState("");

    const [songName, setSongName] = useState("");
    const [singgerId, setSinggerId] = useState("");
    const [image, setImage] = useState("");
    const [path, setPath] = useState("");
    const [vip, setVip] = useState("Normal");

    useEffect(() => {
        fetch(`${config.serverDomain}/users`)
        .then(res => res.json())
        .then(data =>{
            setUsers(data);
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
        fetch(`${config.serverDomain}/singers`)
        .then(res => res.json())
        .then(data =>{
            setSingers(data);
        })
    },[])

    const dataUrl = [];
    const dataUrl2 = [];

    function uploadFile() {
        const formData = new FormData();
        formData.append("file", path);
        formData.append("upload_preset", "project2");
        // Tải ảnh lên cloudinary
        // API: https://api.cloudinary.com/v1_1/{Cloudinary-Name}/image/upload
        axios
            .post("https://api.cloudinary.com/v1_1/huong-pham-van/video/upload", formData)
            .then((response) => {
                dataUrl.push(response.data.url)
                console.log(dataUrl)
                addSong()
            })
            .catch((err) => console.error(err));
        
        const formData2 = new FormData();
        formData2.append("file", image);
        formData2.append("upload_preset", "project2");
        // Tải ảnh lên cloudinary
        // API: https://api.cloudinary.com/v1_1/{Cloudinary-Name}/image/upload
        axios
            .post("https://api.cloudinary.com/v1_1/huong-pham-van/image/upload", formData2)
            .then((response) => {
                dataUrl2.push(response.data.url)
                console.log(dataUrl2)
            })
            .catch((err) => console.error(err));
    }

    function addSong() {
        var postSong = {
            "name": songName,
            "singgerId": singgerId,
            "path": dataUrl[0],
            "image": dataUrl2[0],
            "vip": vip
        }

        axios.post(`${config.serverDomain}/songs`, postSong)
            .then(res => console.log(res))
            .then(() =>  window.location.reload())
    }

    function deleteSong(index) {
        axios.delete(`${config.serverDomain}/songs/${index}`)
            .then(res => console.log(res))

        window.location.reload();
    }

    if(users) return (
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
                                <input className="search-input" type="text" placeholder="Nhập tên bài hát cần tìm kiếm..." />
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
                            <li className="nav-bar-item">
                                <a href="/adminsongs" className="title">
                                    <i><FontAwesomeIcon icon={faMusic}></FontAwesomeIcon></i>
                                    <span>QL bài hát</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/adminsinger" className="title">
                                    <i><FontAwesomeIcon icon={faClipboardUser}></FontAwesomeIcon></i>
                                    <span>QL ca sĩ</span>
                                </a>
                            </li>
                            <li className="nav-bar-item">
                                <a href="/adminalbum" className="title">
                                    <i><FontAwesomeIcon icon={faCompactDisc}></FontAwesomeIcon></i>
                                    <span>QL album</span>
                                </a>
                            </li>
                            <li className="nav-bar-item active">
                                <a href="/adminuser" className="title">
                                    <i><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></i>
                                    <span>QL User</span>
                                </a>
                            </li>
                        </div>
                    </div>

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
                    <div className="home-main">
                        {/* List song */}
                        <div className="home-song">
                            <div className="title-wrap">
                                <div className="title">
                                    {`${users.length} Người dùng`}
                                </div>
                            </div>
                            
                            <div className="list-song">
                                <div className={`admin-user-wrap-title w-1`}>
                                    <div className="admin-user-name w-6">Name</div>
                                    <div className="admin-user-email w-6">Email</div>
                                    <div className="admin-user-phoneNumber w-6">Phone Number</div>
                                    <div className="admin-user-password w-6">Password</div>
                                    <div className="admin-user-role w-6">Vai trò</div>
                                    <div className="admin-user-level w-6">Vip</div>
                                </div>
                                {users.map((user, index) => {
                                    return (
                                        <div className={`admin-user-wrap w-1`} key={index} data-index = {index}>
                                            <div className="admin-user-name w-6">{user.name}</div>
                                            <div className="admin-user-email w-6">{user.email}</div>
                                            <div className="admin-user-phoneNumber w-6">{user.phoneNumber}</div>
                                            <div className="admin-user-password w-6">{user.password}</div>
                                            <div className="admin-user-role w-6">{user.role}</div>
                                            <div className="admin-user-level w-6">{user.level}</div>
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

export default Songs;