import './index.css'

interface OnboardingPageProps {
  image: string
  imageColour: string
  modernEnglishText: string
  oldEnglishText: string
  currentStage: number
}

const OnboardingPage = ({
  image,
  imageColour,
  modernEnglishText,
  oldEnglishText,
  currentStage,
}: OnboardingPageProps) => {
  return (
    <div className="OnboardingPageLayout">
      <div className="imageContainer" style={{ backgroundColor: imageColour }}>
        <img src={image} alt="lol what is accessibility anyway" className="image" />
      </div>
      <div className="textContainer">
        <span>{modernEnglishText}</span>
        <span>{oldEnglishText}</span>
        <div>{currentStage}</div>
      </div>
    </div>
  )
}

export default OnboardingPage
