import React from "react";
import MovieCard from "./MovieCard";
import "../styles/home.css";

const MovieGrid = ({ movies }) => {
    return (
        <div className="movie-grid">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieGrid;
