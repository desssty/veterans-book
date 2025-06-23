import { useState } from "react";
import { Helmet } from "react-helmet";
import VirtualKeyboard from "../components/common/VirtualKeyboard";
import PanelButton from "../components/common/PanelButton";
import searchWhiteIcon from "../assets/searchWhiteIcon.svg";

function isDesktop() {
  if (typeof navigator === "undefined") return true;
  const userAgent = navigator.userAgent;
  console.log("UserAgent:", navigator.userAgent);

  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

export default function SearchPage() {
  const [value, setValue] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const btnSize = { width: "576px", height: "69px" };

  const handleFocus = () => {
    if (isDesktop()) {
      setShowKeyboard(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Поиск</title>
      </Helmet>

      <div className="flex flex-col items-center max-w-[33rem] mx-auto gap-[27vh]">
        <div className={`flex flex-col gap-[4rem] items-center `}>
          <h1 className="flex flex-col items-center text-white text-[2.5rem] text-light mb-4">
            ПОИСК ПО БАЗЕ ГЕРОЕВ
          </h1>
          <div className="w-[45vw] h-[5rem] flex flex-row items-center border-0 border-b-2 border-[#C1A886] bg-transparent focus:outline-none">
            <input
              placeholder="Кого вы ищите?"
              value={value}
              className="flex-1 h-full text-[2rem] text-white italic p-3 bg-transparent placeholder-white focus:outline-none"
              onFocus={handleFocus}
              onChange={handleChange}
            />
            <button
              onClick={() => console.log("Поиск по запросу:", value)}
              className="h-full flex items-center justify-center pr-[2rem] cursor-pointer"
            >
              <img
                src={searchWhiteIcon}
                alt="Поиск"
                className="w-[48px] h-[48px]"
              />
            </button>
          </div>
          {showKeyboard && (
            <VirtualKeyboard
              onKeyPress={(key) => setValue((prev) => prev + key)}
              onBackspace={() => setValue((prev) => prev.slice(0, -1))}
              onEnter={() => console.log("Submit")}
              onNext={() => console.log("Next field")}
              onPrev={() => console.log("Prev field")}
              onClose={() => setShowKeyboard(false)}
            />
          )}
        </div>

        {!showKeyboard && (
          <PanelButton
            type="link"
            href="/"
            label="НА ГЛАВНУЮ"
            active={false}
            transparentWhite={true}
            {...btnSize}
          />
        )}
      </div>
    </>
  );
}
