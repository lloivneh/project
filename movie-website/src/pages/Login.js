import React, { useState } from "react";
import "../styles/auth.css";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in:", formData);
        // TODO: Gọi API backend tại đây
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Đăng Nhập</h2>
                <p className="subtitle">
                    Chào mừng trở lại! Đăng nhập để tiếp tục xem phim 🎬
                </p>

                <form onSubmit={handleSubmit} className="auth-form">
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

                    <div className="auth-options">
                        <label className="checkbox">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            Ghi nhớ đăng nhập
                        </label>
                        <a href="/forgot-password" className="forgot-link">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <button type="submit" className="auth-btn">
                        Đăng Nhập
                    </button>
                </form>

                <p className="auth-footer">
                    Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
                </p>

                <div className="divider">
                    <span>Hoặc đăng nhập bằng</span>
                </div>

                <div className="social-login">
                    <button className="social-btn facebook">Facebook</button>
                    <button className="social-btn google">Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
