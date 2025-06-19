import Logo from "../../assets/logo80.svg";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const inversePaths = ["/search"];
  const isInverse = inversePaths.includes(location.pathname);

  const titleColor = isInverse ? "text-white" : "text-black";
  const subtitleColor = isInverse ? "text-[#D3D3D3]" : "text-[#514F4D]";

  return (
    <div className="flex flex-row items-center px-[5rem] pt-[5rem] pb-[3.25rem] gap-[2.5rem]">
      <img src={Logo} alt="Иконка" className="w-[4.9375rem] h-[10.25rem]" />
      <h1
        className={`font-semibold text-[3.5rem] leading-none mt-[0.1rem] ${titleColor}`}
      >
        Музей Боевой и Трудовой Славы
        <span className={`block ${subtitleColor}`}>город Александров</span>
      </h1>
    </div>
  );
}
