import { Outlet } from "react-router-dom";
import Header from "./Header";
import backgroundBattle from "../../assets/backgroundBattle.png";

export default function Layout() {
  return (
    <div className="bg-[#F2E5CC] font-['Times_New_Roman']">
      <div
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundBattle})` }}
      >
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
