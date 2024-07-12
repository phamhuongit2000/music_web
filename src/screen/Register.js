import "./login.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import config from "../config";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

    const userData = [];
    const navigate = useNavigate();

    const registerFunction = () => {
		let isCheck = true;

		if (email) {
			if ( (email == "") && (email != "admin")) {
				alert("Email không được để trống");
				isCheck = false;
			} else if (!isEmail(email) && (email != "admin")) {
				alert("Email không đúng định dạng");
				isCheck = false;
			}
			if (password == '') {
				alert("Password không được để trống");
				isCheck = false;
			}
            if (password != checkPassword) {
				alert("Mật khẩu xác nhận không khớp");
				isCheck = false;
			}
            if (phoneNumber == '') {
				alert("Phone number không được để trống");
				isCheck = false;
			}
            if (name == '') {
				alert("Name không được để trống");
				isCheck = false;
			}
		}
		
		if(isCheck == true) {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('passWord', password);
            formData.append('phoneNumber', phoneNumber);
            formData.append('email', email);

			axios.post(`${config.serverDomain}/User/Register`, formData)
			.then(res => {
				if (res.data.message === "Wrong email or password") {
					alert("Thông tin đăng nhập không chính xác");
				} else {
					checkRegister();
				}
			})
			.catch(err => {
				alert("Có lỗi xảy ra. Vui lòng thử lại.");
				console.error(err);
			});
		}
	}

    const isRegister = () => {
		if(userData[0].status == "Error") {alert("Thông tin đăng nhập không chính xác");} else {
			const setJsonData=JSON.stringify(userData[0]);
			localStorage.setItem('user', setJsonData);
			checkRegister();
        }
	}

	function isEmail(email) {
		return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);
	}

	const checkRegister = () => {
        const dataLocal = localStorage.getItem('user');
        const userLocal  = JSON.parse(dataLocal);
        alert('Đăng kí thành công, vui lòng đăng nhập để tiếp tục')
        navigate("/login", { replace: true });
    }

    return (
        <div className="mainLogin">
        <form action="" method="post" id="form1" className="form">
            <h3 className="heading">Đăng kí tài khoản</h3>
            <p className="desc">Hãy đăng kí tài khoản để nghe nhạc ❤️</p>

            <div className="tabs">
                <div className="tab">Đăng kí</div>
                <a href="/login" className="tab hide">Đăng nhập</a>
            </div>

            <div className="spacer"></div>

            <div className="form-group">
                <label htmlFor="fullName" className="form-label">Tên đầy đủ</label>
                <input id="fullName" name="fullName" type="text" className="form-control" placeholder="VD: Phạm Văn Hưởng" onChange={(event) => {setName(event.target.value)}} required/>
                <span className="form-message"></span>
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input id="email" name="email" type="text" className="form-control" placeholder="VD: email@domain.com" onChange={(event) => {setEmail(event.target.value)}} required/>
                    <span className="form-message"></span>
                </div>
            </div>

            <div>
                <div className="form-group">
                    <label htmlFor="phone" className="form-label">Số điện thoại</label>
                    <input id="phone" name="phone" type="text" className="form-control" placeholder="VD: 0398494251" onChange={(event) => {setPhoneNumber(event.target.value)}} required/>
                    <span className="form-message"></span>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <input id="password" name="password" type="password" className="form-control" placeholder="Nhập mật khẩu" onChange={(event) => {setPassword(event.target.value)}} required/>
                <span className="form-message"></span>
            </div>
            
            <div className="form-group">
                <label htmlFor="password_confirmation" className="form-label">Nhập lại mật khẩu</label>
                <input id="password_confirmation" name="password_confirmation" type="password" className="form-control" placeholder="Nhập lại mật khẩu" onChange={(event) => {setCheckPassword(event.target.value)}} required/>
                <span className="form-message"></span>
            </div>

            <div className="form-submit" onClick={registerFunction}>Đăng kí</div>
        </form>
    </div>
    )
}

export default Register;