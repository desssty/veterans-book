import { useMembers } from "../../context/MembersContext";
import PanelButton from "../common/PanelButton";
import filterIcon from "./../../assets/filterIcon.svg";
import searchWhiteIcon from "./../../assets/searchWhiteIcon.svg";
import filterActiveIcon from "./../../assets/filterActiveIcon.svg";

interface MemberPanelProps {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
  clearFilters: () => void;
  filtersAreActive: boolean;
  onScrollChange: (value: number) => void;
  scrollPosition: number;
  maxScroll: number;
}

export default function MemberPanel({
  filtersOpen,
  setFiltersOpen,
  clearFilters,
  filtersAreActive,
  onScrollChange,
  scrollPosition,
  maxScroll,
}: MemberPanelProps) {
  const btnSize = { width: "17.5rem" };
  const { state } = useMembers();
  const { members, activeFilters } = state;
  const isNameSearch = activeFilters.name.trim() !== "";

  return (
    <div className="flex flex-row pl-[5rem] mb-[2.5rem] items-center gap-[2rem]">
      <PanelButton
        type="link"
        href="/search"
        active={true}
        icon={searchWhiteIcon}
        label="ПОИСК ГЕРОЯ"
        {...btnSize}
      />

      {!filtersOpen && !filtersAreActive && !isNameSearch && (
        <PanelButton
          type="button"
          icon={filterIcon}
          label="ФИЛЬТР"
          active={false}
          onClick={() => setFiltersOpen(true)}
          {...btnSize}
        />
      )}

      {/* Если активны другие фильтры (но нет имени) */}
      {filtersAreActive && !isNameSearch && (
        <PanelButton
          type="button"
          icon={filterActiveIcon}
          label="ФИЛЬТР АКТИВЕН"
          active={true}
          onClick={() => setFiltersOpen(!filtersOpen)}
          {...btnSize}
        />
      )}

      {/* Если есть имя или есть любые активные фильтры */}
      {(isNameSearch || filtersAreActive) && (
        <PanelButton
          type="button"
          label="ОЧИСТИТЬ ВСЁ"
          bordered={true}
          active={false}
          onClick={() => {
            clearFilters();
            setFiltersOpen(false);
          }}
          {...btnSize}
        />
      )}

      <p className="text-5xl text-[#514F4D] flex items-center gap-4">
        {isNameSearch ? "РЕЗУЛЬТАТЫ ПОИСКА" : "СТЕНА ПАМЯТИ"}
        {isNameSearch && (
          <span className="text-4xl text-gray-500">{members.length}</span>
        )}
      </p>
      <input
        type="range"
        min={0}
        max={maxScroll}
        value={scrollPosition}
        onChange={(e) => onScrollChange(Number(e.target.value))}
        style={{ width: "300px" }}
      />
    </div>
  );
}
