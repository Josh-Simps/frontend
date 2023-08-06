import React from 'react'
import Slider, { sliderClasses } from '@mui/material/Slider'
import './HistorySlider.css'
import { styled } from '@mui/material'

interface HistorySliderProps {
  defaultValue?: number
  onSliderChange: (newValue: number) => void
}

const StyledSlider = styled(Slider)({
  color: '#ece3c2',
  height: 4,
  [`& .${sliderClasses.mark}`]: {
    width: 5,
    height: 5,
    backgroundColor: 'black',
    borderRadius: '50%',
  },
  [`& .${sliderClasses.track}`]: {
    height: 2,
  },
  [`& .${sliderClasses.rail}`]: {
    opacity: 1,
  },
  [`& .${sliderClasses.markLabel}`]: {
    color: 'white',
    fontWeight: 'inherit',
    fontFamily: 'chillax'
  },
})

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
]

const HistorySlider: React.FC<HistorySliderProps> = ({ defaultValue = 0, onSliderChange }) => {
  const [sliderValue, setSliderValue] = React.useState<number>(defaultValue)

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue)
      onSliderChange(newValue)
    }
  }

  return (
    <div className="sliderBody">
      <StyledSlider
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
  )
}

export default HistorySlider
