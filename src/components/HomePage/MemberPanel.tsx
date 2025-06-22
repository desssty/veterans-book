import { useState } from "react";
import PanelButton from "../common/PanelButton";
import filterLogo from "./../../assets/filterLogo.svg";
import searchWhiteLogo from "./../../assets/searchWhiteLogo.svg";
import filterActiveLogo from "./../../assets/filterActiveLogo.svg";

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
        icon={searchWhiteLogo}
        label="ПОИСК ГЕРОЯ"
        {...btnSize}
      />

      {/* Фильтр обычный */}
      {!filterActive && (
        <PanelButton
          type="button"
          icon={filterLogo}
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
          icon={filterActiveLogo}
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
