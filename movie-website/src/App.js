import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  
  // Danh sách các trang không hiển thị header
  const hideHeaderPaths = ['/login', '/register'];
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div>
      {/* Chỉ hiển thị Header nếu không phải trang login/register */}
      {shouldShowHeader && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dien-vien" element={<div style={{color: 'white', padding: '20px'}}>Trang Diễn viên</div>} />
          <Route path="/quoc-gia" element={<div style={{color: 'white', padding: '20px'}}>Trang Quốc gia</div>} />
          <Route path="/the-loai" element={<div style={{color: 'white', padding: '20px'}}>Trang Thể loại</div>} />
          <Route path="/phim-moi" element={<div style={{color: 'white', padding: '20px'}}>Trang Phim mới</div>} />
          <Route path="/top-trending" element={<div style={{color: 'white', padding: '20px'}}>Trang Top Trending</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;