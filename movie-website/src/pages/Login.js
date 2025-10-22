import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

export default function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/login", form);

            if (res.status === 200) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert("Đăng nhập thành công!");
                navigate("/");
                window.location.reload();
            }
        } catch (err) {
            alert(err.response?.data?.message || "Sai tên đăng nhập hoặc mật khẩu!");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <label>Tên đăng nhập</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Nhập tên đăng nhập..."
                        value={form.username}
                        onChange={handleChange}
                        required
                    />

                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Nhập mật khẩu..."
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Đăng nhập</button>
                </form>
                <p className="switch-text">
                    Chưa có tài khoản?{" "}
                    <span onClick={() => navigate("/register")}>Đăng ký ngay</span>
                </p>
            </div>
        </div>
    );
}
