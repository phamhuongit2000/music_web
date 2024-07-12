import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCompass, faStar, faArrowLeft, faArrowRight, faMagnifyingGlass, faUser, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from "../config";

function Songs() {
    const navigate = useNavigate();
    const dataLocal = localStorage.getItem('user');
    const userLocal  = JSON.parse(dataLocal);
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const modalOverlay = $('.modal__overlay')

    const [albums, setAlbums] = useState([]);

    const [albumName, setAlbumName] = useState("");
    const [image, setImage] = useState("");
    const [introduce, setIntroduce] = useState("");

    useEffect(() => {
        fetch(`${config.serverDomain}/Album/GetAll?limit=30&offset=0`)
        .then(res => res.json())
        .then(data =>{
            setAlbums(data);
            console.log(data);
        })
    },[])

    function addAlbum() {
        const formData = new FormData();
        formData.append("Name", albumName);
        formData.append("Description", introduce);
        formData.append("ImgFile", image);

        axios.post(`${config.serverDomain}/Album/Add`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res))
            .then(() => window.location.reload());
    }

    function deleteAlbum(index) {
        axios.delete(`${config.serverDomain}/albums/${index}`)
            .then(res => console.log(res))

        window.location.reload();
    }

    function handelAlbum(albumId) {
        const setJsonData=JSON.stringify(albumId);
		localStorage.setItem('albumChoose', setJsonData);

        navigate("/adminAlbumInfo", { replace: true });
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
                                <input className="search-input" type="text" placeholder="Nhập tên bài hát cần tìm kiếm..." />
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
                            <li className="nav-bar-item active">
                                <a href="/adminalbum" className="title">
                                    <i><FontAwesomeIcon icon={faCompactDisc}></FontAwesomeIcon></i>
                                    <span>QL album</span>
                                </a>
                            </li>
                            {/* <li className="nav-bar-item">
                                <a href="/adminuser" className="title">
                                    <i><FontAwesomeIcon icon={faUser}></FontAwesomeIcon></i>
                                    <span>QL User</span>
                                </a>
                            </li> */}
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
                        {/* List album */}
                        <div className="home-album">
                            <div className="title-wrap">
                                <div className="title">
                                    Danh sách albums nhạc
                                </div>
                                <div
                                className="song-main__add-song"
                                onClick={() => {
                                    const modal = $(".modal");
                                    modal.classList.add("active");
                                }}
                                >
                                    <div class="button_add">
                                        Thêm album
                                    </div>
                                </div>
                            </div>

                            <div className="list-album">
                                {albums.map((album, index) => {
                                    return (
                                        <div key={index} className="album-container w-5">
                                            <a href="#" className="home-album-image"
                                                style={{backgroundImage: `url(${album?.imgUrl || ""})`}}
                                                onClick={() => handelAlbum(album.id)}
                                            >
                                            </a>
                                            <div className="home-album-name">
                                                {album?.name || ""}
                                            </div>
                                            <div className="home-album-introduce">
                                                {album?.introduce || ""}
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

            {/* Modal add song */}
            <div className="modal">
                <div className="modal__overlay" onClick={() => {
                    const modal = $('.modal');
                    modal.classList.remove('active')
                }}></div>
                <div className="modal__body">
                    <h3 className="add-song-heading">Tạo album ❤️</h3>

                    <div className="form-group">
                        <label htmlFor="album" className="form-label">Tên Album</label>
                        <input id="album" name="album" type="text" className="form-control" placeholder="Nhập tên album"
                            onChange={(event) => {setAlbumName(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="introduce" className="form-label">Thông tin giới thiệu</label>
                        <input id="introduce" name="introduce" type="text" className="form-control" placeholder="Nhập thông tin giới thiệu"
                            onChange={(event) => {setIntroduce(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="img" className="form-label">Hình ảnh</label>
                        <input id="img" name="img" type="file" accept="image/png, image/gif, image/jpeg" className="custom-file-input"
                            onChange={(event) => setImage(event.target.files[0])}
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-submit" onClick={() => {
                        addAlbum()
                    }}>Add album</div>
                </div>
            </div>
        </div> 
    )
}

export default Songs;