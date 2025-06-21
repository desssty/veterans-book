import filterLogo from "./../../assets/filterLogo.svg";
import searchWhiteLogo from "./../../assets/searchWhiteLogo.svg";
import filterActiveLogo from "./../../assets/filterActiveLogo.svg";

export default function MemberPanel() {
  return (
    <div className="flex flex-row min-h-[4.3125rem] pl-[5rem] mb-[2.5rem] items-center gap-[2rem]">
      <a
        href="/search"
        className="w-[280px] h-[69px] bg-[#CF3337] flex justify-center items-center no-underline text-white"
      >
        <div className="flex flex-row gap-[15.5px] justify-center items-center">
          <img
            src={searchWhiteLogo}
            alt="ПОИСК ГЕРОЯ"
            width={"32px"}
            height={"32px"}
          />
          <p className="text-[1.125rem]">ПОИСК ГЕРОЯ</p>
        </div>
      </a>

      <button className="w-[280px] h-[69px] bg-transparent border-2 border-[#514F4D] text-[#514F4D]">
        <div className="flex flex-row gap-[15.5px] justify-center items-center">
          <img src={filterLogo} alt="ФИЛЬТР" width={"32px"} height={"32px"} />
          <p className="text-[1.125rem]">ФИЛЬТР</p>
        </div>
      </button>

      <button className="w-[280px] h-[69px] bg-[#CF3337]">
        <div className="flex flex-row gap-[15.5px] justify-center items-center">
          <img
            src={filterActiveLogo}
            alt="ФИЛЬТР АКТИВЕН"
            width={"32px"}
            height={"32px"}
          />
          <p className="text-[1.125rem]">ФИЛЬТР АКТИВЕН</p>
        </div>
      </button>

      <button className="w-[280px] h-[69px] bg-transparent border border-[#514F4D] text-[#514F4D] flex items-center justify-center">
        <p className="text-[1.125rem] m-0">ОЧИСТИТЬ ВСЁ</p>
      </button>

      <p className="text-5xl text-[#514F4D]">СТЕНА ПАМЯТИ</p>
    </div>
  );
}
