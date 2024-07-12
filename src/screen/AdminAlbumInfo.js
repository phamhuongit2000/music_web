import "./home.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardUser, faCompass, faStar, faArrowLeft, faArrowRight, faMagnifyingGlass, faUser, faMusic, faAnglesRight, faCompactDisc, faRecordVinyl, faMicrophoneLines, faGripVertical, faClockRotateLeft, faUpload, faRightFromBracket, faRedo, faStepBackward, faPause, faPlay, faStepForward, faRandom, faVolumeXmark, faVolumeLow, faVolumeHigh, faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import config from "../config";
import axios from 'axios';

function AdminAlbumInfo() {
    const dataLocal = localStorage.getItem('user');
    const userLocal  = JSON.parse(dataLocal);
    const navigate = useNavigate();
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const [songs, setSongs] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [albumInfo, setAlbumInfo] = useState([]);

    const [searchKey, setSearchKey] = useState([]);

    const [albumName, setAlbumName] = useState("");
    const [image, setImage] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [songAddId, setsongAdd] = useState(null);

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
            setSongs(data.listSongsInfo);
            setAlbumName(data.name);
            setIntroduce(data.description);
            console.log(data)
        })
    },[])

    useEffect(() => {
        fetch(`${config.serverDomain}/Song/GetAll?limit=20&offset=0`)
          .then((res) => res.json())
          .then((data) => {
            setAllSongs(data);
            console.log(data);
          });
      }, []);

    function editAlbum() {
        const formData = new FormData();
        formData.append("Name", albumName);
        formData.append("Description", introduce);
        formData.append("ImgFile", image);

        axios.post(`${config.serverDomain}/Album/Update/${albumChooseID}`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then(() => window.location.reload());
    }

    function editAlbumModal() {
        const modal = $(".modal");
        modal.classList.add("active");
    }

    function addSongToAlbum() {
        const formData = new FormData();
        formData.append("SongId", songAddId);
        formData.append("AlbumId", albumChooseID);

        axios.post(`${config.serverDomain}/Album/AddSongToAlbum`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res))
            .then(() => window.location.reload());
    }

    function addSongToAlbumModal() {
        const modal = $(".model__add-song");
        modal.classList.add("active");
    }

    function deleteAlbum(albumId) {
        const formData = new FormData();

        axios.post(`${config.serverDomain}/Album/Delete/${albumId}`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res))
            .then(() => navigate("/adminalbum", { replace: true }));
    }

    function deleteSongFromAlbum(songId) {
        const formData = new FormData();
        formData.append("SongId", songId);
        formData.append("AlbumId", albumChooseID);

        axios.post(`${config.serverDomain}/Album/DeleteSongFromAlbum`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res))
            .then(() => window.location.reload());
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
                        <div className="title-wrap">
                            <div
                                className="song-main__add-song"
                                onClick={() => {
                                    
                                }}
                            >
                                <div
                                    class="button_add"
                                    onClick={() => addSongToAlbumModal()
                                }>
                                    Thêm bài hát vào album
                                </div>
                            </div>
                            <div
                                className="song-main__add-song"
                            >
                                <div
                                    class="button_edit"
                                    onClick={() => editAlbumModal()
                                }>
                                    Sửa album
                                </div>
                            </div>
                            <div
                                className="song-main__add-song"
                                onClick={() => {
                                    
                                }}
                            >
                                <div 
                                    class="button_delete"
                                    onClick={() => deleteAlbum(albumChooseID)
                                }>
                                    Xóa album
                                </div>
                            </div>
                        </div>
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
                                        <div className={`song-info-container w-1`} key={index} data-index = {index}>
                                            <div className="current-song-info w-3">
                                                <div className="cd">
                                                    <div className="cd-thumb"
                                                        style={{backgroundImage: `url(${song?.imgUrl || ""})`}}>
                                                    </div>
                                                </div>
                                                <div className="song-info">
                                                    <div className="song-name">
                                                        {song.name}
                                                    </div>
                                                    <div className="singger-name">
                                                        {song?.singerName || ""}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="song-title w-3">
                                                {song.description}
                                            </div>

                                            <div className="song-admin__control-group">
                                                <div
                                                    className="song-admin__delete"
                                                    onClick={() => deleteSongFromAlbum(song.id)}
                                                >
                                                    Xóa
                                                </div>
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
                    <h3 className="add-song-heading">Sửa album ❤️</h3>

                    <div className="form-group">
                        <label htmlFor="album" className="form-label">Tên Album</label>
                        <input id="album" name="album" type="text" className="form-control" placeholder="Nhập tên album"
                            value={albumName}
                            onChange={(event) => {setAlbumName(event.target.value)}} required
                        />
                        <span className="form-message"></span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="introduce" className="form-label">Thông tin giới thiệu</label>
                        <input id="introduce" name="introduce" type="text" className="form-control" placeholder="Nhập thông tin giới thiệu"
                            value={introduce}
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
                        editAlbum()
                    }}>Edit album</div>
                </div>
            </div>

            {/* Modal add song to album*/}
            <div className="modal model__add-song">
                <div className="modal__overlay" onClick={() => {
                    const modal = $('.model__add-song');
                    modal.classList.remove('active')
                }}></div>
                <div className="modal__body">
                    <h3 className="add-song-heading">Thêm bài hát vào album ❤️</h3>

                    <div className="form-group">
                        <label htmlFor="category" className="form-label">
                            Ca sĩ
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="form-control"
                            onChange={(event) => {
                                setsongAdd(event.target.value)
                        }}
                        required
                        >
                        <option value="">-- Bài hát --</option>
                        {allSongs.map((song, index) => {
                            return (
                            <option key={index} value={song.id}>
                                {song.name}
                            </option>
                            );
                        })}
                        </select>
                        <span className="form-message"></span>
                    </div>

                    <div className="form-submit" onClick={() => {
                        addSongToAlbum()
                    }}>Add song to album</div>
                </div>
            </div>
        </div> 
    )
}

export default AdminAlbumInfo;