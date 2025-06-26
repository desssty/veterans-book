import { useState, useEffect } from "react";
import DateRangeSlider from "./DateRangeSlider";
import RankFilter from "./RankFilter";
import AlphabetFilter from "./AlphabetFilter";
import PanelButton from "../common/PanelButton";
import backgroundFilters from "../../assets/backgroundFilters.jpg";
import crossIcon from "../../assets/crossIcon.svg";
import type { FiltersData } from "../../types/filters";
import { useMembers } from "../../context/MembersContext";

interface FiltersProps {
  filters: FiltersData | null;
  loading: boolean;
  onClose: () => void;
}

export default function Filters({ filters, loading, onClose }: FiltersProps) {
  const { state, dispatch } = useMembers();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedRank, setSelectedRank] = useState<string | null>(null);
  const [selectedYears, setSelectedYears] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (state.activeFilters) {
      setSelectedLetter(
        state.activeFilters.word.length > 0 ? state.activeFilters.word[0] : null
      );
      setSelectedRank(
        state.activeFilters.rank.length > 0 ? state.activeFilters.rank[0] : null
      );
      setSelectedYears([
        state.activeFilters.yearStart,
        state.activeFilters.yearEnd,
      ]);
    }
  }, [state.activeFilters]);

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
  const alphabet = filters.word;
  const ranks = filters.rank;
  const yearStart = filters.yearStart;
  const yearEnd = filters.yearEnd;

  function handleApplyFilters() {
    const newFilters: FiltersData = {
      word: selectedLetter ? [selectedLetter] : [],
      rank: selectedRank ? [selectedRank] : [],
      yearStart: selectedYears ? selectedYears[0] : yearStart,
      yearEnd: selectedYears ? selectedYears[1] : yearEnd,
    };

    dispatch({ type: "SET_FILTERS", payload: newFilters });
    onClose();
  }

  function handleClearFilters() {
    setSelectedRank(null);
    setSelectedLetter(null);
    setSelectedYears([filters?.yearStart ?? 0, filters?.yearEnd ?? 1946]);
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div
        className="relative w-[31.75rem] h-full max-h-full flex flex-col py-10 pr-10 pl-20 bg-cover bg-center gap-11 overflow-y-auto"
        style={{ backgroundImage: `url(${backgroundFilters})` }}
      >
        <style>{`div::-webkit-scrollbar {
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

        <DateRangeSlider
          yearStart={yearStart}
          yearEnd={yearEnd}
          selectedYears={selectedYears}
          onChangeYears={setSelectedYears}
        />

        <RankFilter
          ranks={ranks}
          selectedRank={selectedRank}
          onSelectRank={setSelectedRank}
        />

        <AlphabetFilter
          alphabet={alphabet}
          selectedLetter={selectedLetter}
          onSelectLetter={setSelectedLetter}
        />

        <div className="w-full flex flex-col items-center gap-[1.25rem]">
          <PanelButton
            type="button"
            active={true}
            label="ПРИМЕНИТЬ"
            width="24.25rem"
            onClick={handleApplyFilters}
          />
          <PanelButton
            type="button"
            label="ОЧИСТИТЬ"
            bordered={true}
            active={false}
            width="24.25rem"
            onClick={handleClearFilters}
          />
        </div>
      </div>
    </div>
  );
}
