import { useState } from "react";
import { Helmet } from "react-helmet";
import VirtualKeyboard from "../components/common/Keyboard/VirtualKeyboard";

function isDesktop() {
  if (typeof navigator === "undefined") return true;
  const userAgent = navigator.userAgent;
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

export default function SearchPage() {
  const [value, setValue] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleFocus = () => {
    if (isDesktop()) {
      setShowKeyboard(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Поиск</title>
      </Helmet>
      <div>SEARCH</div>
      <div>
        <input
          value={value}
          className="mb-4"
          onFocus={handleFocus}
          onChange={handleChange}
        />
        {showKeyboard && (
          <VirtualKeyboard
            onKeyPress={(key) => setValue((prev) => prev + key)}
            onBackspace={() => setValue((prev) => prev.slice(0, -1))}
            onEnter={() => console.log("Submit")}
            onNext={() => console.log("Next field")}
            onPrev={() => console.log("Prev field")}
            onClose={() => setShowKeyboard(false)}
          />
        )}
      </div>
    </>
  );
}
