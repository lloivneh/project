import "../styles/home.css";

export default function Home() {
    return (
        <div className="home-page">
            <div className="hero-section">
                <h1>Chào mừng đến với WebPhim 🎥</h1>
                <p>Xem phim chất lượng cao, tốc độ cực nhanh, giao diện hiện đại!</p>
            </div>

            <section className="movies-section">
                <h2>Phim đề xuất</h2>
                <div className="movie-grid">
                    {/* Thêm danh sách phim ở đây */}
                    <p style={{color: '#888'}}>Danh sách phim sẽ hiển thị ở đây...</p>
                </div>
            </section>
        </div>
    );
}