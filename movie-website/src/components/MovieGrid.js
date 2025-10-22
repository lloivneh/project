import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
    if (!movies || movies.length === 0) {
        return <p>Không có phim nào để hiển thị.</p>;
    }

    return (
        <div className="movie-grid">
            {movies.map((m) => (
                <MovieCard key={m.id} movie={m} />
            ))}
        </div>
    );
}

