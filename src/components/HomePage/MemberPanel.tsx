import PanelButton from "../common/PanelButton";
import filterIcon from "./../../assets/filterIcon.svg";
import searchWhiteIcon from "./../../assets/searchWhiteIcon.svg";
import filterActiveIcon from "./../../assets/filterActiveIcon.svg";

interface MemberPanelProps {
  filterActive: boolean;
  setFilterActive: (active: boolean) => void;
  clearFilters: () => void;
  filtersAreActive: boolean;
}

export default function MemberPanel({
  filterActive,
  setFilterActive,
  clearFilters,
  filtersAreActive,
}: MemberPanelProps) {
  const btnSize = { width: "17.5rem" };

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

      {!filterActive && (
        <PanelButton
          type="button"
          icon={filterIcon}
          label="ФИЛЬТР"
          active={false}
          onClick={() => setFilterActive(true)}
          {...btnSize}
        />
      )}

      {filterActive && filtersAreActive && (
        <PanelButton
          type="button"
          icon={filterActiveIcon}
          label="ФИЛЬТР АКТИВЕН"
          active={true}
          onClick={() => setFilterActive(false)}
          {...btnSize}
        />
      )}

      {filterActive && filtersAreActive && (
        <PanelButton
          type="button"
          label="ОЧИСТИТЬ ВСЁ"
          bordered={true}
          active={false}
          onClick={() => {
            clearFilters();
            setFilterActive(false);
          }}
          {...btnSize}
        />
      )}

      <p className="text-5xl text-[#514F4D]">СТЕНА ПАМЯТИ</p>
    </div>
  );
}
