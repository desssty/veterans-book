import { Link } from "react-router-dom";
import React from "react";

interface PanelButtonProps {
  type?: "button" | "link";
  href?: string;
  active?: boolean;
  icon?: string;
  label: string;
  onClick?: () => void;
  bordered?: boolean;
  width?: string;
  height?: string;
}

export default function PanelButton({
  type = "button",
  href = "#",
  active = false,
  icon,
  label,
  onClick,
  bordered = true,
  width = "280px",
  height = "69px",
}: PanelButtonProps) {
  const baseClasses = `flex justify-center items-center text-[1.125rem] no-underline`;
  const activeClasses = "bg-[#CF3337] text-white";
  const inactiveClasses = bordered
    ? "bg-transparent border-2 border-[#514F4D] text-[#514F4D]"
    : "bg-transparent border border-[#514F4D] text-[#514F4D]";

  const classNames = `${baseClasses} ${
    active ? activeClasses : inactiveClasses
  }`;

  const content = (
    <div className="flex flex-row gap-[15.5px] justify-center items-center">
      {icon && <img src={icon} alt={label} width="32px" height="32px" />}
      <p className="m-0">{label}</p>
    </div>
  );

  const style: React.CSSProperties = {
    width,
    height,
  };

  if (type === "link") {
    return (
      <Link to={href} className={classNames} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classNames} onClick={onClick} style={style}>
      {content}
    </button>
  );
}
