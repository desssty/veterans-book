import Logo from "../../assets/logo80.svg";

type HeaderProps = {
  isInverse: boolean;
};

export default function Header({ isInverse }: HeaderProps) {
  const titleColor = isInverse ? "text-white" : "text-black";
  const subtitleColor = isInverse ? "text-[#D3D3D3]" : "text-[#514F4D]";

  return (
    <div
      className={`
        flex flex-row items-center gap-[2.5rem]
        px-[2rem] pt-[2rem] pb-[1.5rem]
        sm:px-[3rem] sm:pt-[3rem] sm:pb-[2rem]
        md:px-[5rem] md:pt-[5rem] md:pb-[3.25rem]
      `}
    >
      <img
        src={Logo}
        alt="Иконка"
        className="
          w-[3rem] h-[6rem]
          sm:w-[4rem] sm:h-[8rem]
          md:w-[4.9375rem] md:h-[10.25rem]
        "
      />
      <h1
        className={`
          font-semibold leading-none mt-[0.1rem]
          text-[2rem]
          md:text-[3.5rem]
          ${titleColor}
        `}
      >
        Музей Боевой и Трудовой Славы
        <span
          className={`
            block
            text-[2rem]
            md:text-[3.5rem]
            ${subtitleColor}
          `}
        >
          город Александров
        </span>
      </h1>
    </div>
  );
}
