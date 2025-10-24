import React, { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import "../styles/home.css";

const Home = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // 🔹 Giả lập dữ liệu phim (sau này bạn thay bằng API thật)
        const sampleMovies = [
            {
                id: 1,
                title: "Parasite",
                thumbnail: "/assets/images/parasite.jpg",
                videoUrl: "/assets/videos/parasite-full.mp4",
            },
            {
                id: 2,
                title: "House on Wheels",
                thumbnail: "/assets/images/house-on-wheels.jpg",
                videoUrl: "/assets/videos/house-ep1.mp4",
            },
        ];
        setMovies(sampleMovies);
    }, []);

    return (
        <div className="home-container">
            <div className="banner">
                <h1>🎥 Phim mới nhất hôm nay</h1>
            </div>
            <MovieGrid movies={movies} />
        </div>
    );
};

export default Home;
