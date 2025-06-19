import { Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const HeroDetailPage = lazy(() => import("./pages/HeroDetailPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

export default function App() {
  return (
    <Suspense
      fallback={<div className="text-center mt-10">Загрузка страницы...</div>}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/hero/:id" element={<HeroDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
