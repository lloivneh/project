import React from "react";
import "../styles/movie.css";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.thumbnail} alt={movie.title} className="movie-thumbnail" />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <a href={movie.videoUrl} target="_blank" rel="noopener noreferrer">
                    ▶ Xem ngay
                </a>
            </div>
        </div>
    );
};

export default MovieCard;
