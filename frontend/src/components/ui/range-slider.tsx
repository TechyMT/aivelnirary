import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
    <div className="flex justify-between text-sm text-gray-700">
      <span>{min}</span>
      <span>{value}</span>
      <span>{max}</span>
    </div>
  </div>
);

export default RangeSlider;
