import React, { useState } from "react";
import "../styles/auth.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registering:", formData);
        // TODO: Gọi API backend tại đây
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Đăng Ký</h2>
                <p className="subtitle">
                    Tạo tài khoản để trải nghiệm đầy đủ tính năng
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <label>Tên người dùng</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Tên người dùng"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Nhập email của bạn"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="auth-btn">
                        Đăng ký
                    </button>
                </form>

                <p className="auth-footer">
                    Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
