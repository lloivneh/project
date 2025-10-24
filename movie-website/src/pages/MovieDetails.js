import React from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies"; // file bạn đã tạo trong src/data/movies.js
import "../styles/movie.css"; // nếu có CSS cho phim

function MovieDetails() {
    const { id } = useParams();
    const movieId = parseInt(id, 10);

    const movie = movies.find((m) => m.id === movieId);

    // Nếu không tìm thấy phim, hiển thị thông báo
    if (!movie) {
        return (
            <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
                <h2>Không tìm thấy phim</h2>
                <p>ID phim: {id}</p>
            </div>
        );
    }

    return (
        <div className="movie-details" style={{ padding: "40px", color: "#fff" }}>
            <h1 style={{ marginBottom: "20px" }}>{movie.title}</h1>
            <video
                controls
                width="800"
                style={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(255,255,255,0.2)" }}
            >
                <source src={movie.video} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
            </video>
            <p style={{ marginTop: "20px", fontSize: "18px" }}>{movie.description}</p>
            <p><strong>Thể loại:</strong> {movie.genre}</p>
        </div>
    );
}

export default MovieDetails;
