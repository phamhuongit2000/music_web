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

function AdminSinger() {
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

    const [singerName, setSingerName] = useState("");
    const [singerDescription, setSingerDescription] = useState("");
    const [avatar, setAvatar] = useState(null);

    const [editingSingerId, setEditingSingerId] = useState(null);
    const [editSingerName, setEditSingerName] = useState("");
    const [editSingerDescription, setEditSingerDescription] = useState("");
    const [editAvatar, setEditAvatar] = useState(null);

    const [songs, setSongs] = useState([]);
    const [singers, setSingers] = useState([]);

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetch(`${config.serverDomain}/Song/GetAll`)
        .then((res) => res.json())
        .then((data) => {
            setSongs(data);
            console.log(data);
        });
    }, []);

    useEffect(() => {
        fetch(`${config.serverDomain}/Singer/GetAll`)
        .then((res) => res.json())
        .then((data) => {
            setSingers(data);
            console.log(data);
        });
    }, []);

    function addSinger() {
        const formData = new FormData();
        formData.append("Name", singerName);
        formData.append("Description", singerDescription);
        formData.append("AvatarFile", avatar);

        axios.post(`${config.serverDomain}/Singer/Add`, formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => console.log(res))
            .then(() => window.location.reload());
    }

    function deleteSinger(id) {
        axios.post(`${config.serverDomain}/Singer/Delete/${id}`)
            .then((res) => console.log(res))
            .then(() => window.location.reload());
    }

    function editSingerModal(singer) {
        setEditingSingerId(singer.id);
        setEditSingerName(singer.name);
        setEditSingerDescription(singer.description);
        setEditAvatar(null);
        setIsEditing(true);

        const modal = $(".modal");
        modal.classList.add("active");
    }

    function addSingerModal(singer) {
      setIsEditing(false);

      const modal = $(".modal");
      modal.classList.add("active");
  }

    function updateSinger() {
        const formData = new FormData();
        formData.append("Name", editSingerName);
        formData.append("Description", editSingerDescription);
        if (editAvatar) {
            formData.append("AvatarFile", editAvatar);
        }

        axios
        .post(`${config.serverDomain}/Singer/Update/${editingSingerId}`, formData, {
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
                <li className="nav-bar-item">
                  <a href="/adminsongs" className="title">
                    <i>
                      <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
                    </i>
                    <span>QL bài hát</span>
                  </a>
                </li>
                <li className="nav-bar-item active">
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
                <div className="title">{`${songs.length} Ca sĩ`}</div>
                <div
                  className="song-main__add-song"
                  onClick={() => {
                    addSingerModal()
                  }}
                >
                  <div class="button_add">
                    Thêm ca sĩ
                  </div>
                </div>
              </div>

              <div className="list-song">
                {singers.map((singer, index) => {
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
                              backgroundImage: `url(${singer?.avatarUrl || ""})`,
                            }}
                          ></div>
                        </div>
                        <div className="song-info">
                          <div className="song-name">
                            {singer?.name || ""}
                          </div>
                        </div>
                      </div>

                      <div className="song-title w-3">
                        {singer?.description || ""}
                      </div>

                      <div className="song-admin__control-group">
                        <div
                          className="song-admin__edit"
                          onClick={() => editSingerModal(singer)}
                        >
                          Sửa
                        </div>
                        <div
                          className="song-admin__delete"
                          onClick={() => deleteSinger(singer.id)}
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
            {isEditing ? "Sửa ca sĩ ❤️" : "Tạo ca sĩ ❤️"}
          </h3>

          <div className="form-group">
            <label htmlFor="songName" className="form-label">
              Tên ca sĩ
            </label>
            <input
              id="songName"
              name="songName"
              type="text"
              className="form-control"
              placeholder="Nhập tên ca sĩ"
              value={isEditing ? editSingerName : singerName}
              onChange={(event) => {
                if (isEditing) {
                  setEditSingerName(event.target.value);
                } else {
                  setSingerName(event.target.value);
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
              value={isEditing ? editSingerDescription : singerDescription}
              onChange={(event) => {
                if (isEditing) {
                  setEditSingerDescription(event.target.value);
                } else {
                  setSingerDescription(event.target.value);
                }
              }}
              required
            />
            <span className="form-message"></span>
          </div>

          <div className="form-group">
            <label htmlFor="img" className="form-label">
              Ảnh đại diện
            </label>
            <input
              id="img"
              name="img"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              className="custom-file-input"
              onChange={(event) => {
                if (isEditing) {
                  setEditAvatar(event.target.files[0]);
                } else {
                  setAvatar(event.target.files[0]);
                }
              }}
            />
            <span className="form-message"></span>
          </div>

          <div
            className="form-submit"
            onClick={() => {
              const modal = $(".modal");
              modal.classList.remove("active");
              if (isEditing) {
                updateSinger();
              } else {
                addSinger();
              }
            }}
          >
            {isEditing ? "Update singer" : "Add singer"}
          </div>
        </div>
      </div>
      {/* End modal */}
    </div>
  );
}

export default AdminSinger;