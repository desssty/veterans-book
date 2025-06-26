import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

interface DateRangeSliderProps {
  yearStart: number;
  yearEnd: number;
}

export default function DateRangeSlider({
  yearStart,
  yearEnd,
}: DateRangeSliderProps) {
  const [values, setValues] = useState<[number, number]>([yearStart, yearEnd]);

  return (
    <div className="w-full flex flex-col items-start">
      <h3 className="text-[#514F4D] text-2xl font-light mb-4">ДАТА РОЖДЕНИЯ</h3>

      <Range
        values={values}
        step={1}
        min={yearStart}
        max={yearEnd}
        onChange={(vals) => setValues([vals[0], vals[1]])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="relative w-full h-2 rounded bg-[#514F4D]"
            style={{
              background: getTrackBackground({
                values,
                colors: ["#514F4D", "#CF3337", "#514F4D"],
                min: yearStart,
                max: yearEnd,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              {...restProps}
              className="w-5 h-5 rounded-full bg-[#CF3337] border-none cursor-pointer relative"
            />
          );
        }}
      />

      <div className="flex w-full justify-between gap-5 mt-8 text-[1.125rem] ">
        <input
          type="number"
          min={yearStart}
          max={values[1] - 1}
          value={values[0]}
          onChange={(e) => {
            const val = Math.min(
              Math.max(Number(e.target.value) || yearStart, yearStart),
              values[1] - 1
            );
            setValues([val, values[1]]);
          }}
          className="flex-1 bg-transparent border-2 border-[#514F4D] text-[#514F4D] p-4 pl-4 rounded focus:outline-none"
        />
        <input
          type="number"
          min={values[0] + 1}
          max={yearEnd}
          value={values[1]}
          onChange={(e) => {
            const val = Math.max(
              Math.min(Number(e.target.value) || yearEnd, yearEnd),
              values[0] + 1
            );
            setValues([values[0], val]);
          }}
          className="flex-1 bg-transparent border-2 border-[#514F4D] text-[#514F4D] p-4 pl-4 rounded focus:outline-none"
        />
      </div>
    </div>
  );
}
