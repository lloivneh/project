import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            {/* LOGO */}
            <div className="header-left">
                <span role="img" aria-label="movie" style={{ fontSize: "22px" }}>🎬</span>
                <h1>MovieZone</h1>
            </div>

            {/* NAVIGATION */}
            <nav className="nav">
                <Link to="/">Trang chủ</Link>
                <Link to="/category">Thể loại</Link>
                <Link to="/nation">Quốc gia</Link>
                <Link to="/actors">Diễn viên</Link>
            </nav>

            {/* BUTTONS */}
            <div className="header-buttons">
                <Link className="btn" to="/login">Đăng nhập</Link>
                <Link className="btn" to="/register">Đăng ký</Link>
            </div>
        </header>
    );
};

export default Header;
