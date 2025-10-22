import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <div className="home-page">
            {/* Logo trên cùng */}
            <header className="header">
                <div className="logo">🎬 <span>WebPhim</span></div>
            </header>

            {/* Thanh menu nằm dưới logo */}
            <nav className="menu-bar">
                <ul>
                    <li><a href="/">Trang chủ</a></li>
                    <li><a href="#">Diễn viên</a></li>
                    <li><a href="#">Quốc gia</a></li>
                    <li><a href="#">Thể loại</a></li>
                    <li><a href="#">Phim mới</a></li>
                    <li><a href="#">Top Trending</a></li>
                </ul>
            </nav>

            {/* Nội dung chính */}
            <main className="content">
                <h1>Chào mừng đến với WebPhim 🎥</h1>
                <p>Xem phim chất lượng cao, tốc độ cực nhanh, giao diện hiện đại!</p>
            </main>
        </div>
    );
}
