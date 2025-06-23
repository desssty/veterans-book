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
  transparentWhite?: boolean;
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
  transparentWhite = false,
}: PanelButtonProps) {
  const baseClasses = `flex justify-center items-center text-[1.125rem] text-light no-underline select-none transition-colors duration-300 ease-in-out`;
  const activeClasses = "bg-[#CF3337] text-white";

  const transparentWhiteClasses =
    "bg-transparent border-2 border-white text-white";

  const transparentGrayClasses =
    "bg-transparent border-2 border-[#514F4D] text-[#514F4D]";

  const inactiveClasses = bordered
    ? transparentWhite
      ? transparentWhiteClasses
      : transparentGrayClasses
    : transparentWhite
    ? "bg-transparent border border-white text-white"
    : "bg-transparent border border-[#514F4D] text-[#514F4D]";

  const hoverActiveClasses = active
    ? "hover:bg-[#b82f32] active:bg-[#a1282a]"
    : bordered
    ? transparentWhite
      ? "hover:text-[#CF3337] hover:border-[#CF3337] active:text-[#9e292b] active:border-[#9e292b]"
      : "hover:text-[#CF3337] hover:border-[#CF3337] active:text-[#9e292b] active:border-[#9e292b]"
    : "hover:bg-[#514F4D] hover:text-white active:bg-[#423f3c]";

  const cursorClass = type === "button" ? "cursor-pointer" : "";

  const classNames = `${baseClasses} ${
    active ? activeClasses : inactiveClasses
  } ${hoverActiveClasses} ${cursorClass}`;

  const content = (
    <div className="flex flex-row gap-[15.5px] justify-center items-center">
      {icon && <img src={icon} alt={label} width="32px" height="32px" />}
      <p className="m-0">{label}</p>
    </div>
  );

  const style: React.CSSProperties = { width, height };

  if (type === "link") {
    return (
      <Link to={href} className={classNames} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      onClick={onClick}
      style={style}
      type="button"
    >
      {content}
    </button>
  );
}
