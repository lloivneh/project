import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

export default function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Kiểm tra mật khẩu khớp
        if (form.password !== form.confirmPassword) {
            setMessage("❌ Mật khẩu xác nhận không khớp!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/register", {
                fullname: form.fullname,
                email: form.email,
                username: form.username,
                password: form.password,
            });

            if (res.status === 200) {
                setMessage("✅ Đăng ký thành công!");
                setTimeout(() => navigate("/login"), 1500);
            }
        } catch (err) {
            console.error(err);
            setMessage("❌ Đăng ký thất bại. Vui lòng thử lại!");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Đăng ký tài khoản</h2>

                {message && <p className="message">{message}</p>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div>
                        <label>Họ và tên</label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Nhập họ và tên..."
                            value={form.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email..."
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Tên đăng nhập</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Tạo tên đăng nhập..."
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Tạo mật khẩu..."
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Xác nhận mật khẩu..."
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit">Đăng ký</button>
                </form>

                <p className="switch-text">
                    Đã có tài khoản? <Link to="/login"><span>Đăng nhập</span></Link>
                </p>
            </div>
        </div>
    );
}