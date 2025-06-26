import { useState } from "react";

interface RankFilterProps {
  ranks: string[];
  selectedRank: string | null;
  onSelectRank: (rank: string | null) => void;
}

export default function RankFilter({
  ranks,
  selectedRank,
  onSelectRank,
}: RankFilterProps) {
  const [showAllRanks, setShowAllRanks] = useState(false);

  function handleRankClick(rank: string) {
    onSelectRank(selectedRank === rank ? null : rank);
  }

  return (
    <div className="w-full flex flex-col items-start gap-2">
      <h3 className="text-[#51504D] text-2xl font-light ">ЗВАНИЕ</h3>
      <div className="flex flex-col gap-4 w-full">
        {(showAllRanks ? ranks : ranks.slice(0, 3)).map((r) => {
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
                className="w-6 h-6 appearance-none bg-transparent border border-[#8B8785] cursor-pointer checked:bg-[#CF3337] checked:border-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTkgMTYuMTdMNC44MyAxMmwtMS40MiAxLjQxTDkgMTkgMjEgN2wtMS40MS0xLjQxeiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]"
              />
              <span
                className="text-[#514F4D] text-[1.125rem]"
                onClick={(e) => e.stopPropagation()}
              >
                {r}
              </span>
            </label>
          );
        })}
        {ranks.length === 0 && (
          <div className="text-[#514F4D]">Нет доступных званий</div>
        )}
      </div>

      {ranks.length > 3 && (
        <button
          className="bg-transparent text-[#CF3337] text-[1.125rem] hover:text-[#792426] active:text-[#792426] transition"
          onClick={() => setShowAllRanks(!showAllRanks)}
        >
          {showAllRanks ? "Скрыть" : "Посмотреть все"}
        </button>
      )}
    </div>
  );
}
