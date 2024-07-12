import "./home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardUser,
  faCompass,
  faStar,
  faArrowLeft,
  faArrowRight,
  faMagnifyingGlass,
  faUser,
  faMusic,
  faAnglesRight,
  faCompactDisc,
  faRecordVinyl,
  faMicrophoneLines,
  faGripVertical,
  faClockRotateLeft,
  faUpload,
  faRightFromBracket,
  faRedo,
  faStepBackward,
  faPause,
  faPlay,
  faStepForward,
  faRandom,
  faVolumeXmark,
  faVolumeLow,
  faVolumeHigh,
  faHouseMedicalCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";

function AdminSongs() {
  const dataLocal = localStorage.getItem("user");
  const userLocal = JSON.parse(dataLocal);
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  const modalOverlay = $(".modal__overlay");

  const [songName, setSongName] = useState("");
  const [songDescription, setSongDescription] = useState("");
  const [singerId, setSingerId] = useState("");
  const [image, setImage] = useState(null);
  const [path, setPath] = useState(null);
  const [vip, setVip] = useState("Normal");

  const [songs, setSongs] = useState([]);
  const [singers, setSingers] = useState([]);
  const [editingSongId, setEditingSongId] = useState(null);
  const [editSongName, setEditSongName] = useState("");
  const [editSongDescription, setEditSongDescription] = useState("");
  const [editSingerId, setEditSingerId] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editPath, setEditPath] = useState(null);
  const [editVip, setEditVip] = useState("Normal");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`${config.serverDomain}/Song/GetAll?limit=20&offset=0`)
      .then((res) => res.json())
      .then((data) => {
        setSongs(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${config.serverDomain}/Singer/GetAll?limit=20&offset=0`)
      .then((res) => res.json())
      .then((data) => {
        setSingers(data);
        console.log(data);
      });
  }, []);

  function addSong() {
    const formData = new FormData();
    formData.append("Name", songName);
    formData.append("Description", songDescription);
    formData.append("SingerId", singerId);
    formData.append("ImgFile", image);
    formData.append("AudioFile", path);
    formData.append("Vip", vip);

    axios
      .post(`${config.serverDomain}/Song/Add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res))
      .then(() => window.location.reload());
  }

  function deleteSong(id) {
    axios
      .post(`${config.serverDomain}/Song/Delete/${id}`)
      .then((res) => console.log(res))
      .then(() => window.location.reload());
  }

  function editSongModal(song) {
    setEditingSongId(song.id);
    setEditSongName(song.name);
    setEditSongDescription(song.description);
    setEditSingerId(song.singerId);
    setEditImage(null);
    setEditPath(null);
    setEditVip(song.vip);
    setIsEditing(true);

    const modal = $(".modal");
    modal.classList.add("active");
  }

  function addSongModal(song) {
    setIsEditing(false);
    const modal = $(".modal");
    modal.classList.add("active");
  }

  function updateSong() {
    const formData = new FormData();
    formData.append("Name", editSongName);
    formData.append("Description", editSongDescription);
    formData.append("SingerId", editSingerId);
    if (editImage) {
      formData.append("ImgFile", editImage);
    }
    if (editPath) {
      formData.append("AudioFile", editPath);
    }
    formData.append("Vip", editVip);

    axios
      .post(`${config.serverDomain}/Song/Update/${editingSongId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setIsEditing(false);
        window.location.reload();
      });
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
                <i>
                  <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                </i>
              </div>
              <div className="btn btn-next">
                <i>
                  <FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
                </i>
              </div>
            </div>

            {/* Search */}
            <div className="search">
              <i>
                <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
              </i>
              <div className="search-content">
                <input
                  className="search-input"
                  type="text"
                  placeholder="Nhập tên bài hát cần tìm kiếm..."
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
                <i>
                  <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
                </i>
              </div>
              MP3
            </div>

            {/* Guest nav bar */}
            <div className="side-bar-main">
              {/* Nav bar main */}
              <div className="nav-bar nar-bar-main">
                <li className="nav-bar-item active">
                  <a href="/adminsongs" className="title">
                    <i>
                      <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
                    </i>
                    <span>QL bài hát</span>
                  </a>
                </li>
                <li className="nav-bar-item">
                  <a href="/adminsinger" className="title">
                    <i>
                      <FontAwesomeIcon
                        icon={faClipboardUser}
                      ></FontAwesomeIcon>
                    </i>
                    <span>QL ca sĩ</span>
                  </a>
                </li>
                <li className="nav-bar-item">
                  <a href="/adminalbum" className="title">
                    <i>
                      <FontAwesomeIcon
                        icon={faCompactDisc}
                      ></FontAwesomeIcon>
                    </i>
                    <span>QL album</span>
                  </a>
                </li>
                {/* <li className="nav-bar-item">
                  <a href="/adminuser" className="title">
                    <i>
                      <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    </i>
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
                    <i>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                      ></FontAwesomeIcon>
                    </i>
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
                <div className="title">{`${songs.length} Bài hát`}</div>
                <div
                  className="song-main__add-song"
                  onClick={() => {
                    addSongModal()
                  }}
                >
                  <div class="button_add">
                    Thêm bài hát
                  </div>
                </div>
              </div>

              <div className="list-song">
                {songs.map((song, index) => {
                  return (
                    <div
                      className={`song-info-container w-1`}
                      key={index}
                      data-index={index}
                    >
                      <div className="current-song-info w-3">
                        <div className="cd">
                          <div
                            className="cd-thumb"
                            style={{
                              backgroundImage: `url(${song?.imgUrl || ""})`,
                            }}
                          ></div>
                        </div>
                        <div className="song-info">
                          <div className="song-name">
                            {song?.name || ""}
                            <span
                              className={`card ${
                                song.vip == "Vip"
                                  ? "vip-member"
                                  : "normal-member"
                              }`}
                            >
                              {`${song?.vip == "Vip" ? "Vip" : ""}`}
                            </span>
                          </div>
                          <div className="singger-name">
                            {song?.singerName || ""}
                          </div>
                        </div>
                      </div>

                      <div className="song-title w-3">
                        {song?.description || ""}
                      </div>

                      <div className="song-admin__control-group">
                        <div
                          className="song-admin__edit"
                          onClick={() => editSongModal(song)}
                        >
                          Sửa
                        </div>
                        <div
                          className="song-admin__delete"
                          onClick={() => deleteSong(song.id)}
                        >
                          Xóa
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* End content */}

        {/* Footer */}
        <div className="footer"></div>
      </div>

      {/* Modal add/edit song */}
      <div className="modal">
        <div
          className="modal__overlay"
          onClick={() => {
            const modal = $(".modal");
            modal.classList.remove("active");
          }}
        ></div>
        <div className="modal__body">
          <h3 className="add-song-heading">
            {isEditing ? "Sửa bài hát ❤️" : "Tạo bài hát ❤️"}
          </h3>

          <div className="form-group">
            <label htmlFor="songName" className="form-label">
              Tên bài hát
            </label>
            <input
              id="songName"
              name="songName"
              type="text"
              className="form-control"
              placeholder="Nhập tên bài hát"
              value={isEditing ? editSongName : songName}
              onChange={(event) => {
                if (isEditing) {
                  setEditSongName(event.target.value);
                } else {
                  setSongName(event.target.value);
                }
              }}
              required
            />
            <span className="form-message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="songDescription" className="form-label">
              Giới thiệu
            </label>
            <input
              id="songDescription"
              name="songDescription"
              type="text"
              className="form-control"
              placeholder="Nhập thông tin giới thiệu"
              value={isEditing ? editSongDescription : songDescription}
              onChange={(event) => {
                if (isEditing) {
                  setEditSongDescription(event.target.value);
                } else {
                  setSongDescription(event.target.value);
                }
              }}
              required
            />
            <span className="form-message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Ca sĩ
            </label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={isEditing ? editSingerId : singerId}
              onChange={(event) => {
                if (isEditing) {
                  setEditSingerId(event.target.value);
                } else {
                  setSingerId(event.target.value);
                }
              }}
              required
            >
              <option value="">-- Ca sĩ --</option>
              {singers.map((singer, index) => {
                return (
                  <option key={index} value={singer.id}>
                    {singer.name}
                  </option>
                );
              })}
            </select>
            <span className="form-message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="path" className="form-label">
              File bài hát
            </label>
            <input
              id="path"
              name="path"
              type="file"
              accept="video/mp3"
              className="custom-file-input"
              onChange={(event) => {
                if (isEditing) {
                  setEditPath(event.target.files[0]);
                } else {
                  setPath(event.target.files[0]);
                }
              }}
            />
            <span className="form-message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="img" className="form-label">
              Hình ảnh
            </label>
            <input
              id="img"
              name="img"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              className="custom-file-input"
              onChange={(event) => {
                if (isEditing) {
                  setEditImage(event.target.files[0]);
                } else {
                  setImage(event.target.files[0]);
                }
              }}
            />
            <span className="form-message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="vip" className="form-label">
              Vip
            </label>
            <div className="radioBox">
              <div className="radioBox-child">
                <input
                  id="vip"
                  name="vip"
                  type="checkbox"
                  value="Vip"
                  className="form-control"
                  checked={isEditing ? editVip === "Vip" : vip === "Vip"}
                  onChange={(event) => {
                    const value = event.target.checked ? "Vip" : "Normal";
                    if (isEditing) {
                      setEditVip(value);
                    } else {
                      setVip(value);
                    }
                  }}
                  required
                />
                Vip
              </div>
            </div>
            <span className="form-message"></span>
          </div>

          <div
            className="form-submit"
            onClick={() => {
              const modal = $(".modal");
              modal.classList.remove("active");
              if (isEditing) {
                updateSong();
              } else {
                addSong();
              }
            }}
          >
            {isEditing ? "Update song" : "Add song"}
          </div>
        </div>
      </div>
      {/* End modal */}
    </div>
  );
}

export default AdminSongs;
