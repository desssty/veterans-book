import { useState } from "react";
import { Helmet } from "react-helmet";
import VirtualKeyboard from "../components/common/VirtualKeyboard";
import PanelButton from "../components/common/PanelButton";
import searchWhiteIcon from "../assets/searchWhiteIcon.svg";
import { useNavigate } from "react-router-dom";
import { useMembers } from "../context/MembersContext";

function isDesktop() {
  if (typeof navigator === "undefined") return true;
  const userAgent = navigator.userAgent;

  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

export default function SearchPage() {
  const { dispatch } = useMembers();
  const [value, setValue] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const btnSize = { width: "36rem", height: "4.3rem" };
  const navigate = useNavigate();

  const handleFocus = () => {
    if (isDesktop()) {
      setShowKeyboard(true);
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch({ type: "RESET_PAGE_AND_MEMBERS" });

      dispatch({
        type: "SET_FILTERS",
        payload: { name: value },
      });

      navigate("/");
    } catch (error) {
      console.error("Ошибка при поиске участника:", error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Поиск</title>
      </Helmet>

      <div
        className={`flex flex-col items-center max-w-[33rem] mx-auto gap-[27vh] transition-padding ${
          showKeyboard ? "pt-[6vh]" : "pt-[13vh]"
        }`}
      >
        <div className="flex flex-col gap-[4rem] items-center">
          <h1 className="flex flex-col items-center text-white text-[2.5rem] font-light mb-4">
            ПОИСК ПО БАЗЕ ГЕРОЕВ
          </h1>
          <div className="w-[45vw] h-[5rem] flex flex-row items-center border-0 border-b-[0.125rem] border-[#C1A886] bg-transparent focus:outline-none">
            <input
              placeholder="Кого вы ищите?"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onFocus={() => {
                handleFocus();
              }}
              className="flex-1 h-full text-[2rem] text-white italic p-3 bg-transparent placeholder-white focus:outline-none"
            />

            <button
              onClick={handleSubmit}
              className="h-full flex items-center justify-center pr-[2rem] cursor-pointer"
            >
              <img
                src={searchWhiteIcon}
                alt="Поиск"
                className="w-[3rem] h-[3rem]"
              />
            </button>
          </div>
          {showKeyboard && (
            <VirtualKeyboard
              onKeyPress={(key) => setValue((prev) => prev + key)}
              onBackspace={() => setValue((prev) => prev.slice(0, -1))}
              onEnter={() => handleSubmit()}
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
