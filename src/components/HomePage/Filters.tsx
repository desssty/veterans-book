import { useState } from "react";
import DateRangeSlider from "./DateRangeSlider";
import PanelButton from "../common/PanelButton";
import backgroundFilters from "../../assets/backgroundFilters.jpg";
import crossIcon from "../../assets/crossIcon.svg";

interface FiltersData {
  rank: string[];
}

interface FiltersProps {
  filters: FiltersData | null;
  loading: boolean;
  onClose: () => void;
}

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

export default function Filters({ filters, loading, onClose }: FiltersProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedRank, setSelectedRank] = useState<string | null>(null);
  const [showAllRanks, setShowAllRanks] = useState(false);

  const btnSize = { width: "2.5rem", height: "2.5rem" };

  function handleClick(letter: string) {
    if (selectedLetter === letter) {
      setSelectedLetter(null);
    } else {
      setSelectedLetter(letter);
    }
  }

  function handleRankClick(rank: string) {
    if (selectedRank === rank) {
      setSelectedRank(null);
    } else {
      setSelectedRank(rank);
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 text-white">
        Загрузка фильтров...
      </div>
    );
  }

  if (!filters) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 text-white">
        Фильтры недоступны.
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div
        className="relative w-[31.75rem] h-full max-h-full flex flex-col py-10 pr-10 pl-20 bg-cover bg-center gap-11 overflow-y-auto"
        style={{ backgroundImage: `url(${backgroundFilters})` }}
      >
        <style>{`
          div::-webkit-scrollbar {
            width: 8px;
          }
          div::-webkit-scrollbar-track {
            background: rgba(139, 135, 133, 0.2);
            border-radius: 3px;
          }
          div::-webkit-scrollbar-thumb {
            background-color: #8B8785;
            border-radius: 3px;
          }
        `}</style>

        <div className="w-full h-[4rem] flex flex-row justify-between items-center border-b border-[#8B8785] pb-[1rem]">
          <h2 className="text-[#51504D] text-[2.5rem] font-light">ФИЛЬТРЫ</h2>
          <button onClick={onClose} className="cursor-pointer">
            <img src={crossIcon} alt="Закрыть" className="w-[3rem] h-[3rem]" />
          </button>
        </div>

        <DateRangeSlider />

        <div className="w-full flex flex-col items-start gap-2">
          <h3 className="text-[#51504D] text-2xl font-light ">ЗВАНИЕ</h3>
          <div className="flex flex-col gap-4 w-full">
            {filters.rank.length > 0 ? (
              (showAllRanks ? filters.rank : filters.rank.slice(0, 3)).map(
                (r) => {
                  const checked = selectedRank === r;
                  return (
                    <label
                      key={r}
                      className="flex flex-row items-center gap-[1rem] w-full rounded cursor-pointer"
                      onClick={() => handleRankClick(r)}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleRankClick(r)}
                        className="
                          w-6 h-6
                          appearance-none
                          bg-transparent
                          border border-[#8B8785]
                          rounded-none
                          cursor-pointer
                          bg-no-repeat bg-center
                          bg-[length:70%]

                          checked:bg-[#CF3337]
                          checked:border-0
                          checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTkgMTYuMTdMNC44MyAxMmwtMS40MiAxLjQxTDkgMTkgMjEgN2wtMS40MS0xLjQxeiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]
                        "
                      />

                      <span className="text-[#514F4D] text-[1.125rem]">
                        {r}
                      </span>
                    </label>
                  );
                }
              )
            ) : (
              <div className="text-[#514F4D]">Нет доступных званий</div>
            )}
          </div>

          {filters.rank.length > 3 && (
            <button
              className="bg-transparent text-[#CF3337] text-[1.125rem] hover:text-[#792426] active:text-[#792426] transition"
              onClick={() => setShowAllRanks(!showAllRanks)}
            >
              {showAllRanks ? "Скрыть" : "Посмотреть все"}
            </button>
          )}
        </div>

        <div className="w-full flex flex-col items-start gap-[1.5rem]">
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

        <div className="w-full flex flex-col items-center gap-[1.25rem]">
          <PanelButton
            type="button"
            active={true}
            label="ПРИМЕНИТЬ"
            width="24.25rem"
          />
          <PanelButton
            type="button"
            label="ОЧИСТИТЬ"
            bordered={true}
            active={false}
            width="24.25rem"
            onClick={() => setSelectedRank(null)}
          />
        </div>
      </div>
    </div>
  );
}
