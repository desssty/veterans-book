import { useEffect, useState } from "react";
import PanelButton from "../common/PanelButton";

interface AlphabetFilterProps {
  alphabet: string[];
  selectedLetter: string | null;
  onSelectLetter: (letter: string | null) => void;
}

export default function AlphabetFilter({
  alphabet,
  selectedLetter,
  onSelectLetter,
}: AlphabetFilterProps) {
  const [localSelectedLetter, setLocalSelectedLetter] = useState<string | null>(
    selectedLetter
  );

  useEffect(() => {
    setLocalSelectedLetter(selectedLetter);
  }, [selectedLetter]);

  function handleClick(letter: string) {
    const newLetter = localSelectedLetter === letter ? null : letter;
    setLocalSelectedLetter(newLetter);
    onSelectLetter(newLetter);
  }

  return (
    <div className="w-full flex flex-col items-start gap-[1.5rem]">
      <h3 className="text-[#51504D] text-2xl font-light ">ПО БУКВАМ</h3>
      <div className="grid grid-cols-7 gap-4">
        {alphabet.map((letter) => {
          const active = localSelectedLetter === letter;
          return (
            <PanelButton
              key={letter}
              type="button"
              label={letter}
              active={active}
              onClick={() => handleClick(letter)}
              width="2.5rem"
              height="2.5rem"
            />
          );
        })}
      </div>
    </div>
  );
}
