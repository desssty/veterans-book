import { useState } from "react";
import DateRangeSlider from "./DateRangeSlider";
import PanelButton from "../common/PanelButton";
import backgroundFilters from "../../assets/backgroundFilters.jpg";
import crossIcon from "../../assets/crossIcon.svg";

const alphabet = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Э",
  "Ю",
  "Я",
];

export default function Filters() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const btnSize = { width: "40px", height: "40px" };

  function handleClick(letter: string) {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div
        className="relative w-[508px] h-full max-h-full flex flex-col items-center p-[2.5rem] bg-cover bg-center justify-between overflow-y-auto"
        style={{ backgroundImage: `url(${backgroundFilters})` }}
      >
        <div className="h-[64px] flex flex-row gap-[7rem] border-b border-[#8B8785] pb-[1rem]">
          <h2 className="text-[#51504D] text-[2.5rem] font-light ">ФИЛЬТРЫ</h2>
          <button
            onClick={() => {
              console.log(1);
            }}
            className="cursor-pointer"
          >
            <img src={crossIcon} alt="Закрыть" className="w-[3rem] h-[3rem]" />
          </button>
        </div>
        <DateRangeSlider />
        <div className="flex flex-col items-start gap-[1.5rem]">
          <h3 className="text-[#51504D] text-2xl font-light ">ПО БУКВАМ</h3>
          <div className="grid grid-cols-7 gap-4">
            {alphabet.map((letter) => {
              const active = selectedLetter === letter;
              return (
                <PanelButton
                  key={letter}
                  type="button"
                  label={letter}
                  active={active}
                  onClick={() => handleClick(letter)}
                  {...btnSize}
                />
              );
            })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-[1.25rem]">
          <PanelButton
            type="button"
            active={true}
            label="ПРИМЕНИТЬ"
            width="388px"
          />
          <PanelButton
            type="button"
            label="ОЧИСТИТЬ"
            bordered={true}
            active={false}
            width="388px"
          />
        </div>
      </div>
    </div>
  );
}
