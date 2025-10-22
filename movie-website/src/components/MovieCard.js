import "./../styles/movie.css";

export default function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
            </div>
        </div>
    );
}
