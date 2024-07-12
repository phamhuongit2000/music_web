import './registerVip.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import config from "../config";

function RegisterVip() {
    const userData = [];
    const navigate = useNavigate();
    const [vipcode, setVipcode] = useState('');

    const registerVipFunction = () => {
        const dataLocal = localStorage.getItem('user');
        const userLocal  = JSON.parse(dataLocal);
        userLocal[0].level = 'vip';
		if(vipcode == 'vip123') {
			axios.put(`${config.serverDomain}/users/${userLocal[0].id}`, userLocal[0])
			.then(res => {
				if(userData) {userData.shift();}
				userData.push(res.data);
			})
			setTimeout(isRegisterVip, 1000);
		}
	}

    const isRegisterVip = () => {
		if(userData[0].status == "Error") {alert("Thông tin đăng nhập không chính xác");} else {
			const setJsonData=JSON.stringify(userData[0]);
			localStorage.setItem('user', setJsonData);
			checkRegisterVip();
        }
	}

    const checkRegisterVip = () => {
        const dataLocal = localStorage.getItem('user');
        const userLocal  = JSON.parse(dataLocal);
        alert('Đăng kí thành viên vip thành công, vui lòng đăng nhập để tiếp tục')
        navigate("/login", { replace: true });
    }
    
    return (
        <div className='register-vip-wrapper'>
            <div className='register-vip-contanier'>
                <div className='register-vip-title'>Đăng kí thành viên Vip</div>
                <div className='register-vip-content'>Trở thành vip để nghe thêm nhiều bài hát chất lượng. Vui lòng liên hệ quản trị viên qua số điện thoại 0398494251 để lấy mã kích hoạt.</div>
                <div className="form-group">
                    <label htmlFor="vipcode" className="form-label">Mã kích hoạt</label>
                    <input id="vipcode" name="vipcode" type="text" className="form-control" placeholder="Nhập mã kích hoạt"  onChange={(event) => setVipcode(event.target.value)} required/>
                    <span className="form-message"></span>
                </div>
                <div className='register-vip-button' onClick={() => registerVipFunction()}>Đăng kí</div>
            </div>
        </div>
    )
}

export default RegisterVip;