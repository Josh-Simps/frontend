import { useState } from 'react'
import parchment from '../assets/parchment.jpg'
import OnboardingPage, { OnboardingPageProps } from './OnboardingPage'
import { useNavigate } from 'react-router-dom'

const onboardingPageProps: Omit<OnboardingPageProps, 'onClickMethod'>[] = [
  {
    image:
      'https://i0.wp.com/www.printmag.com/wp-content/uploads/2017/01/2a34d8_7d647af009db499f9d0bb7c18a2c7c7cmv2.jpg?resize=795%2C1200&ssl=1',
    imageColour: 'rgba(255, 109, 50, 1)',
    textBackgroundColor: 'white',
    modernEnglishText: 'Do you struggle with the',
    oldEnglishText: 'perusal of text?',
    currentStage: 33,
  },
  {
    image: 'https://cdn.kobo.com/book-images/e354f3eb-d7f8-4339-9c95-f6b1885bad7d/1200/1200/False/naruto-vol-1.jpg',
    imageColour: 'orange',
    textBackgroundColor: 'rgba(240, 200, 159, 1)',
    modernEnglishText: 'ReWriter is here to',
    oldEnglishText: 'render thy life more facile.',
    currentStage: 66,
  },
  {
    image:
      'https://cdn.kobo.com/book-images/44b94a99-8987-47b3-b2f0-71b0ed9d4d5f/353/569/90/False/king-james-bible-original-translation-5.jpg',
    imageColour: 'brown',
    textBackgroundColor: '',
    modernEnglishText: 'shall we,',
    oldEnglishText: 'perchance, embark on this endeavour?',
    currentStage: 100,
    className: 'parchment-background-image',
  },
]
const BookOnboarding = () => {
  const [currentStage, setCurrentStage] = useState(0)
  const navigate = useNavigate()
  const onClickHandler = () => {
    if (currentStage < 2) {
      setCurrentStage((currentStage) => currentStage + 1)
    } else {
      navigate('/browser')
    }
  }
  return (
    <>
      <OnboardingPage {...onboardingPageProps[currentStage]} onClickMethod={() => onClickHandler()} />
    </>
  )
}

export default BookOnboarding
