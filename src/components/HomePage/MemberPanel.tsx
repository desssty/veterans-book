import PanelButton from "../common/PanelButton";
import filterIcon from "./../../assets/filterIcon.svg";
import searchWhiteIcon from "./../../assets/searchWhiteIcon.svg";
import filterActiveIcon from "./../../assets/filterActiveIcon.svg";

interface MemberPanelProps {
  filterActive: boolean;
  setFilterActive: (active: boolean) => void;
}

export default function MemberPanel({
  filterActive,
  setFilterActive,
}: MemberPanelProps) {
  const btnSize = { width: "17.5rem" };

  return (
    <div className="flex flex-row pl-[5rem] mb-[2.5rem] items-center gap-[2rem]">
      {/* Поиск */}
      <PanelButton
        type="link"
        href="/search"
        active={true}
        icon={searchWhiteIcon}
        label="ПОИСК ГЕРОЯ"
        {...btnSize}
      />

      {/* Фильтр обычный */}
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

      {/* Фильтр активен */}
      {filterActive && (
        <PanelButton
          type="button"
          icon={filterActiveIcon}
          label="ФИЛЬТР АКТИВЕН"
          active={true}
          onClick={() => setFilterActive(false)}
          {...btnSize}
        />
      )}

      {/* Очистить всё */}
      {filterActive && (
        <PanelButton
          type="button"
          label="ОЧИСТИТЬ ВСЁ"
          bordered={true}
          active={false}
          onClick={() => setFilterActive(false)}
          {...btnSize}
        />
      )}

      <p className="text-5xl text-[#514F4D]">СТЕНА ПАМЯТИ</p>
    </div>
  );
}
