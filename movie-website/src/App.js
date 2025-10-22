import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/header.css"; // thêm dòng này

function App() {
  return (
    <div>
      <header className="site-header">
        <nav className="main-nav">
          <div className="nav-left">
            <Link to="/">Trang chủ</Link>
            <Link to="/actors">Diễn viên</Link>
            <Link to="/country">Quốc gia</Link>
            <Link to="/genre">Thể loại</Link>
          </div>

          <div className="nav-right">
            <Link to="/login" className="auth-link">Đăng nhập</Link>
            <Link to="/register" className="auth-link">Đăng ký</Link>
          </div>
        </nav>
      </header>

      <main style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
