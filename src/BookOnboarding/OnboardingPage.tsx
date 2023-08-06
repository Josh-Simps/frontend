import OnboardingProgress from './OnboardingProgress'
import './index.css'

export interface OnboardingPageProps {
  image: string
  imageColour: string
  textBackgroundColor: string
  modernEnglishText: string
  oldEnglishText: string
  currentStage: number
  onClickMethod: () => void
  className?: string
}

const OnboardingPage = ({
  image,
  imageColour,
  textBackgroundColor,
  modernEnglishText,
  oldEnglishText,
  currentStage,
  onClickMethod,
  className,
}: OnboardingPageProps) => {
  return (
    <div className="OnboardingPageLayout">
      <div className="imageContainer" style={{ backgroundColor: imageColour }}>
        <img src={image} alt="lol what is accessibility anyway" className="image" />
      </div>
      <div className={`textContainer ${className ?? ''}`} style={{ backgroundColor: textBackgroundColor }}>
        <div className="text">
          <div className="modernEnglishText">{modernEnglishText}</div>
          <div className="oldEnglishText">{oldEnglishText}</div>
        </div>
        <div className="progressIndicator" onClick={onClickMethod}>
          <OnboardingProgress progressValue={currentStage} />
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
