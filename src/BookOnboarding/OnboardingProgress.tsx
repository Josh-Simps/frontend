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
      <ArrowForwardIosIcon style={{ color: 'black' }}/>
      </Box>
    </Box>
  )
}
const OnboardingProgress = ({ progressValue }: OnboardingProgressProps) => {
  return (
    <>
      <CircularProgressWithLabel variant="determinate" value={progressValue} />
    </>
  )
}

export default OnboardingProgress
