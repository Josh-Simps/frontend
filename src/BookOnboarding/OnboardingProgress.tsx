import { CircularProgress, Box, CircularProgressProps } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface OnboardingProgressProps {
  progressValue: number
}

function CircularProgressWithLabel(props: CircularProgressProps) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ArrowForwardIosIcon
          style={{ color: 'white', backgroundColor: 'black', borderRadius: '100%', padding: '14px' }}
        />
      </Box>
    </Box>
  )
}
const OnboardingProgress = ({ progressValue }: OnboardingProgressProps) => {
  return (
    <>
      <CircularProgressWithLabel
        variant="determinate"
        value={progressValue}
        style={{ color: 'black', width: '74px', height: '74px' }}
      />
    </>
  )
}

export default OnboardingProgress
