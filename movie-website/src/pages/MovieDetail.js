import { useParams } from "react-router-dom";
import { movies } from "../data/movies";

export default function MovieDetail() {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));

    if (!movie) return <h2>Không tìm thấy phim</h2>;

    return (
        <div className="movie-detail">
            <img src={movie.image} alt={movie.title} style={{ width: "200px" }} />
            <h2>{movie.title}</h2>
            <p>Năm phát hành: {movie.year}</p>
            <p>{movie.description || "Mô tả đang cập nhật..."}</p>
        </div>
    );
}
