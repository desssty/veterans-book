import { useState } from "react";
import { Helmet } from "react-helmet";
import VirtualKeyboard from "../components/common/VirtualKeyboard";
import PanelButton from "../components/common/PanelButton";

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

      <div className="search-container p-4 max-w-[800px] mx-auto">
        {/* Контейнер для заголовка и инпута */}
        <div className="header-input-container mb-6">
          <h1 className="text-white text-[2.5rem] text-light mb-4">
            ПОИСК ПО БАЗЕ ГЕРОЕВ
          </h1>
          <input
            placeholder="Кого вы ищите?"
            value={value}
            className="w-[45vw] h-[5rem] text-[2rem] text-white italic p-3 rounded border border-gray-400 bg-transparent placeholder-white"
            onFocus={handleFocus}
            onChange={handleChange}
          />
        </div>

        <PanelButton
          type="link"
          href="/"
          label="НА ГЛАВНУЮ"
          active={false}
          transparentWhite={true}
          {...btnSize}
        />
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
    </>
  );
}
