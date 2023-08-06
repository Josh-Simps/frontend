import React, { ChangeEvent } from 'react';
import Slider from '@mui/material/Slider';
import "./HistorySlider.css";
import { Typography } from '@mui/material';

interface HistorySliderProps {
    defaultValue?: number;
    onSliderChange: (newValue: number) => void;
}

const marks = [
    {
      value: 0,
      label: 'Symbols',
    },
    {
      value: 50,
      label: '15th Century English',
    },
    {
      value: 100,
      label: 'English',
    },
  ];

const HistorySlider: React.FC<HistorySliderProps> = ({ defaultValue = 0, onSliderChange }) => {
  const [sliderValue, setSliderValue] = React.useState<number>(defaultValue);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
        setSliderValue(newValue);
        onSliderChange(newValue);
    }
  };

  return (
    <div className="sliderBody">
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        aria-label="Slider"
        valueLabelDisplay="off"
        step={null}
        min={0}
        max={100}
        marks={marks}
        color="primary"
      />
    </div>
  );
};

export default HistorySlider;