import { Link } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <div className="logo">
                    🎬 <span>WebPhim</span>
                </div>
                <nav className="menu-bar">
                    <ul>
                        <li><Link to="/">Trang chủ</Link></li>
                        <li><Link to="/dien-vien">Diễn viên</Link></li>
                        <li><Link to="/quoc-gia">Quốc gia</Link></li>
                        <li><Link to="/the-loai">Thể loại</Link></li>
                        <li><Link to="/phim-moi">Phim mới</Link></li>
                        <li><Link to="/top-trending">Top Trending</Link></li>
                    </ul>
                </nav>
                <div className="floating-auth">
                    <Link to="/login" className="btn-login">Đăng nhập</Link>
                    <Link to="/register" className="btn-register">Đăng ký</Link>
                </div>
            </div>
        </header>
    );
}