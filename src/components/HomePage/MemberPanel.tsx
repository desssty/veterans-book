import { useState } from "react";
import PanelButton from "../common/PanelButton";
import filterIcon from "./../../assets/filterIcon.svg";
import searchWhiteIcon from "./../../assets/searchWhiteIcon.svg";
import filterActiveIcon from "./../../assets/filterActiveIcon.svg";

export default function MemberPanel() {
  const [filterActive, setFilterActive] = useState(false);
  const btnSize = { width: "280px", height: "69px" };

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
      <PanelButton
        type="button"
        label="ОЧИСТИТЬ ВСЁ"
        bordered={true}
        active={false}
        onClick={() => setFilterActive(false)}
        {...btnSize}
      />

      <p className="text-5xl text-[#514F4D]">СТЕНА ПАМЯТИ</p>
    </div>
  );
}
