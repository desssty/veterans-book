import { useState, useRef } from "react";
import backspaceIcon from "../../../assets/backspaceIcon.svg";
import shiftIcon from "../../../assets/shiftIcon.svg";
import globeIcon from "../../../assets/globeIcon.svg";
import crossIcon from "../../../assets/crossIcon.svg";
import previousIcon from "../../../assets/previousIcon.svg";
import nextIcon from "../../../assets/nextIcon.svg";

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  onBackspace?: () => void;
  onEnter?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onClose?: () => void;
};

const enKeys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["shift", "z", "x", "c", "v", "b", "n", "m", "backspace"],
  ["&123", "🌐", "space", "Enter"],
];

const ruKeys = [
  ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з"],
  ["ф", "ы", "в", "а", "п", "р", "о", "л", "д"],
  ["shift", "я", "ч", "с", "м", "и", "т", "ь", "backspace"],
  ["&123", "🌐", "space", "Enter"],
];

const symbolKeys = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["@", "#", "$", "_", "&", "-", "+", "(", ")"],
  ["*", '"', "'", ":", ";", "!", "?", "/", "backspace"],
  ["ABC", "🌐", "space", "Enter"],
];

export default function VirtualKeyboard({
  onKeyPress,
  onBackspace,
  onEnter,
  onNext,
  onPrev,
  onClose,
}: KeyboardProps) {
  const [keyboardType, setKeyboardType] = useState<"en" | "ru" | "symbols">(
    "en"
  );

  const [shiftActive, setShiftActive] = useState(false);

  const backspaceIntervalRef = useRef<number | null>(null);

  const keys =
    keyboardType === "en"
      ? enKeys
      : keyboardType === "ru"
      ? ruKeys
      : symbolKeys;

  const handleKeyClick = (key: string) => {
    if (key === "backspace") {
      onBackspace?.();
    } else if (key.toLowerCase() === "enter") {
      onEnter?.();
    } else if (key === "space") {
      onKeyPress(" ");
    } else if (key === "🌐") {
      setKeyboardType((prev) => {
        if (prev === "en") return "ru";
        if (prev === "ru") return "en";
        return prev;
      });
      setShiftActive(false);
    } else if (key === "&123") {
      setKeyboardType("symbols");
      setShiftActive(false);
    } else if (key === "ABC") {
      setKeyboardType("en");
      setShiftActive(false);
    } else if (key === "shift") {
      setShiftActive((prev) => !prev);
    } else {
      const isLetter =
        keyboardType !== "symbols" &&
        key.length === 1 &&
        key.match(/[a-zа-яё]/i);

      if (shiftActive && isLetter) {
        onKeyPress(key.toUpperCase());
      } else {
        onKeyPress(key);
      }
    }
  };

  const startBackspaceAutoRepeat = () => {
    onBackspace?.();
    if (backspaceIntervalRef.current) return;

    backspaceIntervalRef.current = window.setInterval(() => {
      onBackspace?.();
    }, 100);
  };

  const stopBackspaceAutoRepeat = () => {
    if (backspaceIntervalRef.current) {
      clearInterval(backspaceIntervalRef.current);
      backspaceIntervalRef.current = null;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="virtual-keyboard bg-[#FAFAFA] rounded-[36px] p-4 shadow-lg mx-auto w-[920px] h-[320px] font-sans">
        <div className="w-[872px] h-[32px] flex justify-between mb-2 mx-auto text-[1.125rem] mt-[5px] font-normal text-[#514F4D]">
          <button
            className="flex flex-row gap-[8px] items-center cursor-pointer"
            onClick={onPrev}
          >
            <img
              src={previousIcon}
              alt="Предыдущее поле"
              className="w-[32px] h-[32px]"
            />
            <p>Предыдущее поле</p>
          </button>
          <button
            className="flex flex-row gap-[8px] items-center cursor-pointer"
            onClick={onNext}
          >
            <p>Следующее поле</p>
            <img
              src={nextIcon}
              alt="Следующее поле"
              className="w-[32px] h-[32px]"
            />
          </button>
        </div>
        <div className="w-[726px] h-[216px] mx-auto mt-[24px]">
          {keys.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex justify-center gap-[8px] mb-[8px]"
            >
              {row.map((key) => {
                const displayKey =
                  shiftActive &&
                  keyboardType !== "symbols" &&
                  key.length === 1 &&
                  key.match(/[a-zа-яё]/i)
                    ? key.toUpperCase()
                    : key;

                const backspaceHandlers =
                  key === "backspace"
                    ? {
                        onMouseDown: startBackspaceAutoRepeat,
                        onMouseUp: stopBackspaceAutoRepeat,
                        onMouseLeave: stopBackspaceAutoRepeat,
                        onTouchStart: startBackspaceAutoRepeat,
                        onTouchEnd: stopBackspaceAutoRepeat,
                      }
                    : {};

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleKeyClick(key)}
                    {...backspaceHandlers}
                    className={`
                    rounded-[8px]
                    font-medium
                    text-[1.125rem]
                    select-none
                    focus:outline-none
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    ${
                      key === "Enter"
                        ? "bg-red-500 text-white w-[152px] h-[48px] hover:bg-[#792426] active:bg-[#792426] transition-colors duration-200 ease-in-out"
                        : key === "space"
                        ? "bg-white w-[406px] h-[48px] text-[#2B2A29] hover:bg-[#EBEBEB] active:bg-[#EBEBEB] transition-colors duration-200 ease-in-out"
                        : key === "shift" || key === "backspace"
                        ? `bg-[#EBEBEB] w-[103px] h-[48px] text-[#2B2A29] hover:bg-[#514F4D] active:bg-[#514F4D] transition-colors duration-200 ease-in-out ${
                            key === "shift" && shiftActive
                              ? "bg-[#514F4D] text-white"
                              : ""
                          }`
                        : key === "&123" || key === "ABC" || key === "🌐"
                        ? "bg-[#EBEBEB] w-[72px] h-[48px] text-[#2B2A29] hover:bg-[#514F4D] active:bg-[#514F4D] transition-colors duration-200 ease-in-out"
                        : "bg-white w-[65px] h-[48px] text-[#2B2A29] hover:bg-[#EBEBEB] active:bg-[#EBEBEB] transition-colors duration-200 ease-in-out"
                    }
                  `}
                    style={{ boxShadow: "0 1px 0 #2B2A29" }}
                  >
                    {key === "space" ? (
                      keyboardType === "ru" ? (
                        "Пробел"
                      ) : (
                        "Space"
                      )
                    ) : key === "backspace" ? (
                      <img
                        src={backspaceIcon}
                        alt="Backspace"
                        width={32}
                        height={32}
                      />
                    ) : key === "shift" ? (
                      <img src={shiftIcon} alt="Shift" width={32} height={32} />
                    ) : key === "🌐" ? (
                      <img src={globeIcon} alt="Globe" width={24} height={24} />
                    ) : (
                      displayKey
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="bg-[#FAFAFA] w-[88px] h-[56px] mt-[20px] flex justify-center items-center rounded-[24px] hover:bg-[#EBEBEB] active:bg-[#EBEBEB]"
      >
        <img src={crossIcon} alt="Закрыть" />
      </button>
    </div>
  );
}
