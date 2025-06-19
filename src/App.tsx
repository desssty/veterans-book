import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import HeroDetailPage from "./pages/HeroDetailPage";
import SearchPage from "./pages/SearchPage";
import Layout from "./components/common/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hero/:id" element={<HeroDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
