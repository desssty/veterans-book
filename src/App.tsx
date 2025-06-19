import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HeroDetailPage from "./pages/HeroDetailPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hero/:id" element={<HeroDetailPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
