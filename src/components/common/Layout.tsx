import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import backgroundBattle from "../../assets/backgroundBattle.png";
import { INVERSEPATHS } from "../../constants/paths";

export default function Layout() {
  const location = useLocation();
  const isInverse = INVERSEPATHS.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="bg-[#F2E5CC]">
      {isInverse && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#323232] to-[#000000] opacity-75 z-0 pointer-events-none" />
      )}

      <div
        className="min-h-screen bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: `url(${backgroundBattle})` }}
      >
        <Header isInverse={isInverse} />
        <main className="relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
